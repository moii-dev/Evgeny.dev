# Повторный технический аудит Evgeny.dev

Дата: 16 октября 2026 года. База сравнения: `PROJECT_AUDIT.md`, исходная ревизия `c80c3cbbb2d32db23ea87ca9b8d499b2dba3bfc5`. Нового commit нет: проверено рабочее дерево после исправлений.

Это отдельный повторный проход по текущей реализации и её пользовательским цепочкам. Он выполнен тем же агентом, без независимого внешнего аудитора; слово «повторный» не означает внешнюю сертификацию. Первоначальная оценка автоматически не переносилась.

Проверена текущая прикладная область из 43 файлов src, новые тесты/скрипты, конфигурации/lockfile и изменённые display assets; все 34 исходных идентификатора сопоставлены с отчётом исправлений, пропусков нет.

## Вывод

**Оценка текущего состояния: 88/100.** Основные воспроизведённые runtime-дефекты устранены. Storage больше не обрушивает приложение, просмотр подробностей работает через доступную modal stack, данные изображений согласованы, GitHub сохраняет last-good при отказе, HUD переживает resize/layout changes и динамическую reduced-motion preference.

Из исходных 34 задач **33 закрыты, 1 частично закрыта**. Остаётся **1 подтверждённое Low-условие конфигурации BUG-034**: без фактического `VITE_SITE_URL` локальная сборка генерирует относительный image URL для соцсетей. Сам PNG, абсолютный URL generator и subpath-работа реализованы и проверены на тестовом адресе. Реальный публичный URL у владельца запрошен; он не подменён вымышленным доменом.

| Уровень | Исходный аудит | Осталось подтверждённых |
|---|---:|---:|
| Critical | 0 | 0 |
| High | 4 | 0 |
| Medium | 19 | 0 |
| Low | 11 | 1 — deployment URL для BUG-034 |

Новых подтверждённых неустранённых runtime-ошибок в выполненных сценариях не обнаружено. Отсутствие обнаружения не является гарантией отсутствия ошибок в непроверенных окружениях.

## Повторно проверенные границы модулей

### Запуск и storage

Все прямые обращения к localStorage прикладного кода сосредоточены в guarded adapter. Начальные настройки и JSON-schema проверяются до использования. Портрет и monochrome записываются одной операцией. Legacy records читаются без удаления. Ошибка квоты отражается как session-only состояние, а не маскируется под постоянное сохранение.

Повторены: SecurityError при доступе к storage до первого render, invalid JSON/Project[], setItem QuotaExceededError, сохранение и reload портрета, reset и новая сессия редактирования. Белого экрана и необработанных исключений не получено.

### Dialog stack и прокрутка

Native dialog обеспечивает top layer, семантику и inert background; собственный keyboard handler замыкает Tab/Shift+Tab. Page scroll lock учитывает количество открытых окон и жизненный цикл Lenis. Details открываются над существующим каталогом, не уничтожая поиск/фильтр/DOM списка.

Проверены: клавиатурное открытие, прямой/обратный Tab, Escape верхнего окна, focus restoration к Details-кнопке, повторные открытия, wheel и touch-scroll, portrait landscape, About note. Скрытые фоновые элементы не получают фокус в проверенном Chrome.

При первом lazy import каталог не размонтируется: у features раздельные Suspense-границы. Ошибка details chunk отдельно воспроизведена: доступный recovery-dialog появляется выше каталога, Dismiss возвращает рабочий список. Это защищает от нового типа отказа, введённого code splitting.

### Изображения и асинхронное состояние

Карта covers принадлежит App, UI не читает storage независимо. Новая картинка сначала проходит MIME/size/decode/pixel validation, затем commit. Для async selection используются отмена и generation token. Pending work отменяется при закрытии/смене проекта. Object URL и listeners очищаются. Сброс оставляет tombstone, исключающий возврат ошибочного Gamma legacy alias.

Повторены: WorldBox/FreeChat/Figmint upload → card → reload → details → reset; damaged → valid; photo Cancel/Reset/reopen; намеренно поздний FileReader; файл >5 МБ; unsafe URL. Состояния карточек/деталей/сохранения не расходятся.

Преднамеренный компромисс: при quota failure работа продолжается в памяти; старые реально сохранённые значения могут вернуться после reload, о чём пользователь предупреждён. Новые SVG-файлы не принимаются; legacy SVG data URLs остаются читаемыми.

### GitHub и сетевые операции

Canonical identity строится по owner/repository URL, а не presentation title. Curated metadata имеет явный приоритет; live statistics обогащают ту же запись. Итоговая нумерация выполняется после дедупликации. Кеш привязан к username и содержит timestamp/validated snapshot; старые v4 записи используются совместимо только для исходного владельца.

Проверены: featured stats, Gamma mapping, duplicate records, account isolation, 100+1 repositories, page cap, malformed JSON structure, offline/403/429/500/503, never-settling request, отмена и last-known-good. В browser проверен live-only проект, остающийся в каталоге после offline refresh с правильным сообщением об источнике.

Contact endpoint проверен в отдельной тестовой сборке: HTTP 500 сохраняет текст; pending request ограничен дедлайном и освобождает поля; retry success очищает форму только после успеха. Default mailto fallback не заявляет отправку и сохраняет черновик при Edit message.

### HUD и lifecycle

Заголовок имеет одного владельца — React/Motion. GSAP управляет только transit letters; normalized timeline соответствует всему документу. ResizeObserver следит за размерами секций/body; fonts readiness также инициирует пересчёт. Lenis живёт отдельно от перестроений SVG/ranges. Cleanup удаляет ticker/subscription/observer и делает context.revert для timelines/ScrollTrigger.

Проверены все пять секций вперёд/назад, resize с проверкой фактических координат, фильтр Stack, быстрые переходы, letter motion в середине SVG transit, смена reduced motion без reload, mobile NEXT и доступный progress value. Невидимых active-header кнопок больше нет. Длительный heap soak не проводился, поэтому абсолютное отсутствие утечек не утверждается.

### Инфраструктура и безопасность

Используется единственный npm lock с точными direct versions. Чистая изолированная установка и последующие тесты/build выполнены; рабочие native modules Windows не разблокировались убийством пользовательских процессов. Ненужный server/AI-template удалён, сайт не требует секретного Gemini key. Playwright — dev-only dependency.

Финальный `npm audit --json` завершился успешно: `vulnerabilities={}`, total 0, lock metadata описывает 153 зависимости с учётом optional/platform records. Это проверка опубликованных advisories, не security guarantee и не анализ хостинга.

HTTP(S) URL проверяются, executable schemes не становятся demo links. React продолжает рендерить внешний текст без HTML injection. Серверных SQL/filesystem/auth-операций в проекте нет. `.vs` удалена только из Git index; локальные IDE-файлы существуют. Git history не переписывалась.

Paths проверены в `/preview/`: localhost-origin не предоставляет корневой `/assets`, и ни одного непредвиденного локального 404 не зарегистрировано. Legacy asset paths также нормализуются. Подготовлены OG image и build-time canonical/image URL. Production origin всё ещё должен быть задан владельцем.

## Сборка, тесты и визуальные доказательства

| Проверка | Результат и практический предел |
|---|---|
| Unit/integration | 15/15 pass, Node test runner + tsx |
| Typecheck/lint | strict/noUnused pass, без any/ts-ignore или отключения проверок |
| Clean | Реальный запуск на Windows, удаляет только dist |
| Production build | Pass, без chunk-size warning; typecheck включён |
| Frozen install | npm ci --ignore-scripts в отдельной чистой папке; затем 15 tests и build pass |
| Advisory audit | npm audit exit 0, vulnerabilities total 0 |
| Root browser regression | 116 assertions pass, production JS/CSS, весь сценарий tests/browser.cjs |
| Subpath browser regression | 118 assertions pass, `/preview/`, абсолютные OG fixture URL, configured mocked contact endpoint |
| Viewports | 320×568, 390×844, 844×390, 1440×900, 1920×1080 |
| Console | Нет необработанных app pageerrors/JS warnings в обычных сценариях; намеренные network/image/chunk failures проверяются отдельно |
| Local assets | Нет непредвиденных missing assets/неправильного base path |
| Git | Только ожидаемые изменения; staged removals только для .vs; коммитов нет |
| Remote CI | Workflow создан; фактического GitHub Actions run не было |

Browser plugin в сессии отсутствует. Playwright 1.62.1 использует установленный Chrome. Неизменённый bundle обслуживается через route.fulfill под тестовым origin; API/сеть контролируются fixture. Это не заменяет проверку реальной сети и сервера. Intentional aborted Google Fonts/Unsplash не считаются скрытыми app exceptions. Screen reader и другие browser engines отдельно не проверены.

Скриншоты desktop/mobile сравнивались с исходными audit artifacts в одинаковом fallback-font окружении: существенной смены палитры, типографики, отступов, композиции или default FreeChat/Figmint visual не обнаружено. Overlay/focus/error состояния изменены по необходимости; normal SVG letter animation видна на отдельном `hud-motion.png`. Reduced motion намеренно отличается.

## Производительность

| Показатель | До | После |
|---|---:|---:|
| Главный JS chunk | 628,32 КБ | около 451,92 КБ |
| Главный JS gzip | 203,35 КБ | около 139,68 КБ |
| Отдельный HUD chunk | Внутри главного | 162,59 КБ / gzip 62,61 КБ |
| Общий CSS | 71,45 КБ | 71,40 КБ main + 1,06 КБ HUD |
| Портрет | 1 921 571 байт PNG | 118 618 байт WebP; 640w — 51 738 байт |
| WorldBox display image | 2 588 680 байт | 480w — 199 198; 960w — 749 188 байт |

Entry chunk уменьшен примерно на 28%, портрет — на 94%; дополнительные изображения отдаются по responsive srcset. Большинство остальных WebP сделаны lossless. Оригиналы PNG не удалялись, поэтому размер всего каталога dist не обязан уменьшиться: оптимизирован именно фактически выбираемый браузером payload, с сохранением старых URL.

HUD нужен на первом экране и загружается сразу после shell. Суммарный compressed JS shell+HUD+shared runtime остаётся примерно сопоставимым с прежним общим JS; нельзя приписывать всем начальным JS-загрузкам уменьшение на 28%. Это разделение загрузки/исполнения и перенос editor code до взаимодействия. LCP/INP/CLS и экономия батареи на реальном устройстве не измерялись.

Tailwind source detection ограничен исходниками и index.html. Это устраняет зависимость CSS от наличия технических отчётов/тестов в checkout; схема настройки соответствует [документации Tailwind](https://tailwindcss.com/docs/detecting-classes-in-source-files). Контрольный CSS hash совпал с изолированной сборкой тех же исходников.

## Дополнительные находки повторного прохода

Все перечисленные ниже риски устранены до финализации; они не увеличивают число оставшихся проблем:

- Установленный Motion hook не обновлял preference после mount: live подписка заменяет snapshot.
- Общая Suspense boundary могла скрыть открытый каталог: boundaries разделены.
- Dynamic-import failure требовал восстановления в native top layer: добавлен FeatureBoundary, отказ воспроизведён.
- Gamma alias мог возвращать сброшенную обложку: tombstone имеет приоритет без удаления старых данных.
- Timeline duration должна быть равна полному normalized progress, а не последней анимации: добавлена явная полная длительность.
- Для ссылки на developer profile нельзя утверждать «source repository»: текст уточнён.
- Автоматический широкий Tailwind scan учитывал не только исходники: заданы явные source roots, отчёты больше не меняют bundle CSS.
- Статичная плашка «4 Stars» Yandex AdBlocker могла противоречить live-данным: число удалено из редакционного badge; динамическая статистика и новый regression test согласованы.

## Обоснование оценки 88/100

| Критерий | Баллы | Причина оставшегося резерва |
|---|---:|---|
| Сборка и воспроизводимость | 14/15 | Чистый Windows install/build проверен, remote Linux CI ещё не запускался |
| Функциональная корректность | 23/25 | Основные цепочки подтверждены, реальная доставка/доступность внешних сервисов не проверены |
| Обработка ошибок и state | 18/20 | Controlled failures покрыты; долгий soak и несколько вкладок требуют отдельной проверки |
| Безопасность/границы данных | 13/15 | Схемы/URL/advisories проверены; TLS/CSP/backend policies вне проверенного deployment |
| UI/accessibility/responsive | 12/15 | Keyboard/touch/viewports подтверждены; VoiceOver/NVDA, Safari и physical keyboard viewport не проверены |
| Производительность/сопровождение | 8/10 | Payload улучшен, но реальные Web Vitals/CPU/heap не измерялись |
| **Итого** | **88/100** | **Существенно стабильнее исходной версии без заявления 100% готовности во всех средах** |

## Риски регрессий и оставшиеся действия

Риск текущих локальных исправлений оценивается как **умеренный**, чувствительнее всего HUD/layout и native dialog/touch на других движках. Регрессии закреплены тестами, а lifecycle-код очищает свои ресурсы. Необходимость дополнительных проверок не выдаётся за подтверждённые новые баги.

Перед публичным запуском:

1. Указать реальный `VITE_SITE_URL` и согласованный путь публикации, пересобрать и проверить OG/canonical на опубликованной странице — завершение BUG-034.
2. Проверить хостинг: HTTPS, cache/compression headers, MIME, CSP/frame policy и доступность assets; при endpoint — CORS/server validation/anti-spam/idempotency.
3. Прогнать основные цепочки на iOS Safari/Android device и с screen reader, включая клавиатуру/zoom/landscape.
4. Измерить реальные Web Vitals и длительную память/CPU на целевых устройствах; выполнить новый CI workflow после review изменений.

Код готов к review и deployment-проверке. Без знания реального публичного origin и поведения внешних сервисов не утверждается, что публичный запуск уже проверен. Коммиты/публикация/сообщения внешним получателям не выполнялись.

Подробная сверка BUG-001…034 и файлы исправлений: `PROJECT_FIX_REPORT.md`. Повторяемые сценарии: `tests/*.test.ts`, `tests/browser.cjs`. Доказательства: папки `final-root-verified`, `final-subpath-verified`, `regression-subpath` и `npm-ci-check` в `C:/Users/moiiu/.codex/visualizations/2026/10/16/01a143ad-60f9-7700-a644-e682ad711680/`.
