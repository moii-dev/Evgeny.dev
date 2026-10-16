# Исправления Evgeny.dev после технического аудита

Дата: 16 октября 2026 года. Исходная ревизия: `c80c3cbbb2d32db23ea87ca9b8d499b2dba3bfc5`.

Перед работой прочитан `PROJECT_AUDIT.md`, проверены исходники и воспроизведения. На старте Git показывал только ранее созданный, неотслеживаемый `PROJECT_AUDIT.md`. Он сохранён без правок; пользовательских изменений в исходниках не было. Коммиты не создавались.

## Результат

**33 из 34 проблем исправлены; BUG-034 исправлена частично до получения публичного URL.** Неисправленных High/Medium в проверенной области не осталось. Изображение и конфигурация OG готовы, абсолютные URL проверены на явно тестовом origin; реальный домен не придуман и в deployment не записан.

Изменения выполнялись по зависимостям: storage/схемы и воспроизводимость → диалоги/scroll → изображения/черновики → GitHub/timeout → HUD/motion → assets/config/performance. Подтверждённо ненужные пакеты удалены при создании npm-lockfile, чтобы не фиксировать заведомо лишнее серверное дерево. После функциональных этапов выполнялись typecheck/build и соответствующие регрессии.

## Проверки

- `npm test`: 15 unit/integration tests, все проходят. Проверены storage failures, legacy settings/cache, runtime-схема, файлы и URL, merge/statistics/Gamma, пагинация, account isolation, last-good, 403/429/5xx, malformed API и timeout/cancellation.
- `npm run lint`: строгий TypeScript с `strict`, `noUnusedLocals`, `noUnusedParameters`; успешно. Проверки не отключались, ESLint не был настроен и не подменяется утверждением о его запуске.
- `npm run clean` и `npm run build`: успешно. Build включает typecheck. Предупреждение о chunk >500 КБ устранено.
- Чистая установка выполняется с `npm ci --ignore-scripts` в изолированной копии проекта. Основные версии не обновлялись: React/DOM 19.3.1, GSAP 3.15.0, Lenis 1.3.27, Motion 12.43.0, Vite 8.3.4, TypeScript 7.0.2 — версии прежней фактической установки. Playwright 1.62.1 добавлен только в devDependencies для воспроизводимых browser tests.
- `npm install`/`npm ci` сообщили 0 известных уязвимостей; полноценная проверка реального хостинга и внешнего form backend этим не заменяется.
- Browser: Playwright 1.62.1 + установленный headless Chrome; production bundle подаётся неизменённым через route.fulfill. Проверены `/` и `/preview/`, пять требуемых viewport, keyboard/wheel/touch, storage, reload, файлы, GitHub mock, HUD/resize/reverse/rapid navigation/reduced motion, ошибка lazy chunk.
- Итоговые browser assertions: **116 pass** в корневой сборке и **118 pass** в subpath-сборке с endpoint; app errors, warnings и непредвиденных missing assets — **0**. Числа обозначают проверки сценария, а не 234 независимых теста.
- Для `/preview/` отдельно собрана версия с тестовым endpoint: 500 → сохранение draft; незавершённый запрос → timeout/release; повтор → success. Сообщения реальному адресату не отправлялись.
- `git diff --check`: без ошибок whitespace; предупреждения autocrlf относятся к настройке Git в Windows. `.vs` отсутствует в `git ls-files`, но локальные файлы IDE сохранены на диске.
- Финальный `npm audit --json`: exit 0, опубликованных уязвимостей 0; lock metadata включает 153 записи с optional/platform dependencies.

Browser plugin отсутствует в сессии, поэтому применён Playwright, как и при исходном аудите. Это исполнение production JS/CSS, но не проверка настоящих HTTP-заголовков, TLS, CORS или реальной доставки почты. Внешние Google Fonts/Unsplash в тестах блокировались; визуальное сравнение выполнено в одинаковом fallback-окружении.

## BUG-001 — Недоступный localStorage

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** незащищённый getItem в initializer App обрушивал рендер.
- **Изменения:** безопасные get/set/remove/readJson; fallback портрета без storage; единая запись настроек с поддержкой legacy.
- **Файлы:** `src/utils/storage.ts`, `src/utils/portrait.ts`, `src/App.tsx`.
- **Проверка:** unit-тест запрещённого getter; Chrome с SecurityError до загрузки.
- **Результат:** h1 и приложение остаются доступны, необработанных ошибок нет.
- **Ограничения:** без storage изменения живут только в памяти текущей страницы; это явно сообщается при сохранении.

## BUG-002 — Повреждённая структура кеша

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** JSON.parse ошибочно считался runtime-проверкой Project[].
- **Изменения:** валидируются массив, обязательные и используемые optional-поля, вложенная cover-схема и URL; невалидный snapshot не передаётся React.
- **Файлы:** `src/utils/projectValidation.ts`, `src/utils/urls.ts`, `src/services/githubService.ts`.
- **Проверка:** `[{}]`, объект вместо списка, tags=null, executable URL; открытие каталога после инъекции v4 corruption.
- **Результат:** используется допустимый кеш/локальный fallback, каталог не падает.
- **Ограничения:** валидная по схеме информация всё ещё может быть устаревшей; TTL/source показываются отдельно.

## BUG-003 — Детали под каталогом

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** независимые z-50 overlays и порядок DOM.
- **Изменения:** общий native dialog primitive, top-layer stack; каталог остаётся смонтированным под деталями. Suspense-границы разделены, чтобы lazy details не скрывали существующий каталог.
- **Файлы:** `src/components/Modal.tsx`, `AllProjectsModal.tsx`, `ProjectModal.tsx`, `src/App.tsx`.
- **Проверка:** keyboard-open из поиска → details → Escape → тот же каталог, search и trigger focus.
- **Результат:** детали доступны сверху, возврат не теряет состояние списка.
- **Ограничения:** требуется браузер с HTMLDialogElement; старые движки отдельно не поддерживались и не тестировались.

## BUG-004 — Lenis прокручивает фон

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** overflow body не останавливал глобальный Lenis.
- **Изменения:** reference-counted scroll lock для dialog stack, stop/start одного Lenis, восстановление прежнего overflow, data-lenis-prevent и native внутренний scroll/overscroll-contain.
- **Файлы:** `src/utils/scrollController.ts`, `src/components/Modal.tsx`, `src/hooks/useScrollNavigation.ts`, три modal-компонента.
- **Проверка:** wheel и реальные touch events через Chromium CDP, сравнение внутреннего scrollTop и window.scrollY, несколько overlay.
- **Результат:** содержимое движется, фон сохраняет позицию.
- **Ограничения:** gesture physics iOS Safari требуют отдельной проверки на устройстве.

## BUG-005 — Статистика featured не обновляется

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** enriched records отбрасывались дедупликацией после вставки исходного FEATURED_PROJECTS.
- **Изменения:** merge по canonical repository identity с сохранением локального порядка/описаний/обложек и заменой stars/forks/date/homepage.
- **Файлы:** `src/services/githubService.ts`.
- **Проверка:** fixture FreeChat с 99 stars/21 forks/новой датой; сравнение curated description.
- **Результат:** динамические поля обновлены, редакционные сохранены.
- **Ограничения:** актуальность ограничена TTL и доступностью API, отображается источник данных.

## BUG-006 — Gamma Cleaner теряет метаданные

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** title/id не совпадали с именем репозитория.
- **Изменения:** identity извлекается из GitHub owner/repository URL; для Gamma сохраняется id gamma-cleaner и локальное оформление. Старый ошибочный cover alias читается совместимо.
- **Файлы:** `src/services/githubService.ts`, `src/hooks/useProjectCovers.ts`.
- **Проверка:** API fixture GAMMA-PPTX-Watermark-Cleaner, stable id/title/cover/description.
- **Результат:** метаданные не исчезают при sync.
- **Ограничения:** переезд репозитория к другому owner потребует обновления редакционного GitHub URL.

## BUG-007 — Сетевой отказ удаляет live-каталог

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** ошибка заменяла live state на ALL_LOCAL_PROJECTS и ошибочно ставила fromCache=false.
- **Изменения:** last-known-good в памяти и atomic persisted snapshots; source/live/cache/local и error/lastUpdated отображаются в секции/каталоге. Refresh не маскирует отказ.
- **Файлы:** `src/services/githubService.ts`, `src/App.tsx`, `ProjectsSection.tsx`, `AllProjectsModal.tsx`.
- **Проверка:** live-only project → offline refresh; 403/429/500/503 в unit-тестах.
- **Результат:** проект остаётся, показаны saved data и причина сбоя, retry доступен.
- **Ограничения:** при первой загрузке без сети доступны только локальные редакционные проекты.

## BUG-008 — Нет timeout

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** loading зависел от завершения fetch без deadline/cancellation.
- **Изменения:** общий withDeadline (12 секунд), AbortController и отмена при размонтировании; дедлайн охватывает весь GitHub pagination workflow, включая чтение JSON.
- **Файлы:** `src/utils/request.ts`, `githubService.ts`, `ContactSection.tsx`, `App.tsx`.
- **Проверка:** никогда не завершающийся transport, parent abort; браузерная форма с pending response до timeout.
- **Результат:** loading снимается, draft и last-good сохранены, повтор работает.
- **Ограничения:** реальный внешний backend может обработать запрос до клиентского timeout; idempotency/дедупликация на сервере зависит от провайдера.

## BUG-009 — Устаревший portrait draft

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** useState(currentPhoto) использовался в постоянно смонтированном редакторе.
- **Изменения:** editor монтируется на каждое открытие из актуальных props; Cancel не коммитит, Reset атомарно коммитит default/filter.
- **Файлы:** `src/App.tsx`, `PhotoChangeModal.tsx`, `src/utils/portrait.ts`.
- **Проверка:** change → Cancel → reopen; save → reload; Reset → reopen.
- **Результат:** draft, committed value и следующий preview согласованы.
- **Ограничения:** при отказе storage сохранение только на текущий визит с предупреждением.

## BUG-010 — Необработанная ошибка записи портрета

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** два независимых unguarded storage write/remove после обновления state.
- **Изменения:** атомарный JSON портрета, guarded write и явный session-only warning; старые ключи не удаляются.
- **Файлы:** `src/utils/storage.ts`, `portrait.ts`, `App.tsx`.
- **Проверка:** QuotaExceededError на setItem в браузере.
- **Результат:** editor закрывается, изображение применено в памяти, предупреждение видимо; исключение не уходит в render/event loop.
- **Ограничения:** reload восстанавливает последний реально сохранённый record — об этом сообщает предупреждение.

## BUG-011 — Рассогласование обложек

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** ProjectCover, ProjectModal и storage имели независимые копии.
- **Изменения:** единая карта covers в App через useProjectCovers; значения передаются в card/modal. Reset сохраняет tombstone, отменяет pending upload и не позволяет legacy alias вернуться.
- **Файлы:** `useProjectCovers.ts`, `App.tsx`, `ProjectsSection.tsx`, `ProjectCard.tsx`, `ProjectCover.tsx`, `ProjectModal.tsx`.
- **Проверка:** upload → card → reload → modal → Reset → card для WorldBox, FreeChat и Figmint.
- **Результат:** все представления обновляются согласованно.
- **Ограничения:** live-синхронизация настроек между одновременно открытыми вкладками не реализована и не была исходным требованием.

## BUG-012 — Sticky image error

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** один boolean imageError блокировал все последующие src экземпляра.
- **Изменения:** ошибка привязана к конкретному source; новое изображение получает независимую попытку. Повреждённые новые файлы отклоняются до commit.
- **Файлы:** `ProjectCover.tsx`, `src/utils/imageFiles.ts`, `src/hooks/useImageUpload.ts`.
- **Проверка:** damaged PNG → valid PNG в одном editor session.
- **Результат:** корректная обложка отображается после ошибки.
- **Ограничения:** повторная попытка ровно того же нерабочего внешнего URL может потребовать выбора/перезагрузки; скрытого бесконечного retry нет.

## BUG-013 — Upload игнорируется FreeChat/Figmint

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** специальные return-ветки обходили custom override.
- **Изменения:** валидная custom cover имеет приоритет перед индивидуальными default-композициями; Reset возвращает прежнее оформление.
- **Файлы:** `ProjectCover.tsx`, `ProjectModal.tsx`.
- **Проверка:** реальная загрузка PNG и Reset для обоих проектов, карточки и подробности.
- **Результат:** функция работает, default брендовые SVG/композиции сохранены.
- **Ограничения:** custom cover использует нейтральную image-композицию, исходные фирменные ветки включаются без override.

## BUG-014 — Фокус и Escape диалогов

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** div overlays без общего доступного lifecycle.
- **Изменения:** native dialog semantics/name, initial focus, inert background, явный Tab/Shift+Tab wrap, native restoration, Escape верхнего окна; About использует тот же primitive. Close controls получили имена.
- **Файлы:** `Modal.tsx`, четыре modal-потребителя, `FeatureBoundary.tsx`, `src/index.css`.
- **Проверка:** многократный прямой/обратный Tab, details → catalog restoration, Escape photo/catalog/About, recovery-dialog после chunk failure.
- **Результат:** фон не получает фокус, закрывается верхний слой.
- **Ограничения:** полноценная VoiceOver/NVDA-сессия и старые браузеры не проверены.

## BUG-015 — Каталог без keyboard Details

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** действие было только onClick div.
- **Изменения:** отдельная семантическая кнопка Details с именем проекта; внешняя GitHub-ссылка остаётся независимой.
- **Файлы:** `AllProjectsModal.tsx`.
- **Проверка:** focus → Enter → Project details.
- **Результат:** внутренние подробности доступны без мыши.
- **Ограничения:** click всей карточки сохранён как удобство, клавиатурный control — отдельная кнопка.

## BUG-016 — Обрезание портретного editor

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** центрирование без max-height/scroll.
- **Изменения:** ограничение по dvh, overflow-y-auto и overscroll containment; аналогичные ограничения у остальных окон.
- **Файлы:** `PhotoChangeModal.tsx`, `ProjectModal.tsx`, `AllProjectsModal.tsx`.
- **Проверка:** footer достижим в 844×390 и во всех пяти viewport.
- **Результат:** Save/Cancel/Reset доступны через внутренний scroll.
- **Ограничения:** физическая экранная клавиатура и safe-area отдельных устройств не тестировались.

## BUG-017 — Edit message стирает текст

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** Edit вызывал полный reset.
- **Изменения:** Edit меняет только status/errors; полная очистка остаётся у Send another message после успеха.
- **Файлы:** `ContactSection.tsx`.
- **Проверка:** заполнение name/email/message → fallback → Edit; сравнение всех трёх значений.
- **Результат:** черновик сохранён.
- **Ограничения:** это память страницы, не постоянное хранилище контактных персональных данных.

## BUG-018 — HUD после resize

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** React classes и GSAP одновременно управляли headers; ranges оставались от старого layout.
- **Изменения:** один видимый header принадлежит React/Motion; SVG transit chars — GSAP. Timeline нормализована на полный scroll; observer размеров секций/body и fonts readiness перестраивает ranges; Lenis создаётся отдельно один раз.
- **Файлы:** `useScrollNavigation.ts`, `ScrollNavigationHUD.tsx`, `scrollController.ts`.
- **Проверка:** HOME/PROJECTS/ABOUT/STACK/CONTACT вперёд/назад, resize на каждом, Stack filtering, быстрые последовательные переходы; screenshot движущихся букв.
- **Результат:** header виден и соответствует фактическим координатам, animation сохранена.
- **Ограничения:** длительный heap/CPU soak на реальном мобильном устройстве не выполнялся.

## BUG-019 — Неконтролируемые изображения

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** неограниченный FileReader без decode/error/cancellation и проверки URL.
- **Изменения:** 5 МБ/24MP, MIME/decode validation, timeout image URL, ограничение стороны/сжатие больших статичных изображений, AbortController + generation token, cleanup object URLs/FileReader. Hero имеет fallback при ошибке старого внешнего URL.
- **Файлы:** `imageFiles.ts`, `useImageUpload.ts`, `PhotoChangeModal.tsx`, `ProjectModal.tsx`, `Hero.tsx`.
- **Проверка:** битый/слишком большой файл, executable URL, намеренно задержанный FileReader A и более поздний выбор B.
- **Результат:** ошибки показаны до commit, поздний результат не заменяет актуальный выбор.
- **Ограничения:** возможна квота storage; GIF до лимита сохраняет оригинал/анимацию. SVG не принимается как новая загрузка; legacy SVG data URL остаётся читаемым.

## BUG-020 — Подкаталог и assets

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** абсолютные /assets в runtime-данных игнорировали BASE_URL.
- **Изменения:** assetUrl для cover/logo/legacy overrides; BASE_URL для portrait/srcset; Vite base конфигурируется и согласован с site path.
- **Файлы:** `urls.ts`, `Hero.tsx`, `ProjectCover.tsx`, `App.tsx`, `vite.config.ts`.
- **Проверка:** отдельный production build `/preview/`, browser route запрещает assets вне этого base и фиксирует 404.
- **Результат:** сценарии и локальные ресурсы работают, missingAssets пуст.
- **Ограничения:** реальные правила reverse proxy/CDN отдельно не проверены.

## BUG-021 — Несогласованные зависимости

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** Bun lock отличался от проверенного npm node_modules.
- **Изменения:** npm 11.19.0, Node engines, точные direct versions, единственный package-lock; Bun lock удалён; воспроизводимый install и CI-конфигурация.
- **Файлы:** `package.json`, `package-lock.json`, `README.md`, `.github/workflows/checks.yml`; удалён `bun.lock`.
- **Проверка:** чистая изолированная npm ci, unit tests/typecheck/build. Root npm ci сначала наткнулся на занятый Windows native module; восстановлен npm install из lock, пользовательский процесс не завершался.
- **Результат:** итоговая чистая копия воспроизводит проверки. Esbuild 0.28.2, уже существовавший транзитивно, дедуплицирован после удаления ненужного прямого 0.25-пакета.
- **Ограничения:** GitHub Actions workflow добавлен, но удалённый CI/Linux в этом чате не запускался.

## BUG-022 — Тяжёлая загрузка

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** один 628,32 КБ chunk, большой PNG-портрет и полноразмерные screenshots.
- **Изменения:** lazy модальные компоненты и отдельный HUD chunk; адаптивный portrait WebP, lossless WebP основных картинок и responsive WorldBox. Отдельные Suspense/ErrorBoundary сохраняют работоспособность при chunk failure.
- **Файлы:** `App.tsx`, `Hero.tsx`, `ProjectCover.tsx`, `featuredProjects.ts`, `public/assets/*.webp`, `scripts/optimize_images.py`, `FeatureBoundary.tsx`.
- **Проверка:** build sizes, реальные src/srcset, пять viewport, visual comparison, заблокированный lazy import.
- **Результат:** entry JS около 452 КБ / gzip 140 КБ (было 628/203), нет >500 КБ warning; portrait 118 618 байт вместо 1 921 571, mobile variant 51 738; WorldBox 480/960 варианты 199 198/749 188 вместо 2 588 680 байт.
- **Ограничения:** HUD загружается сразу после shell, поэтому суммарный JS для shell+HUD остаётся примерно сопоставимым (~206 КБ gzip против прежних 203 КБ). Это не заявление об улучшении LCP/INP; реальные Web Vitals не измерялись. Оригинальные PNG остаются в dist для совместимости.

## BUG-023 — Reduced motion

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** часть GSAP/native scroll/scale не учитывала preference; installed Motion hook не подписывался на её дальнейшие изменения.
- **Изменения:** общий live media-query hook, MotionConfig, отключение transit/transform и CSS transitions при preference, мгновенный scroll. Обычный режим сохраняет анимации.
- **Файлы:** `usePrefersReducedMotion.ts`, `main.tsx`, `useScrollNavigation.ts`, `scrollController.ts`, About/Contact/Footer/SphericalVisual, `index.css`.
- **Проверка:** переключение preference в уже открытой странице; transit opacity=0, навигация работает.
- **Результат:** initial и runtime preference учитываются.
- **Ограничения:** естественная инерция/анимации ОС за пределами страницы не контролируются приложением.

## BUG-024 — Только 100 репозиториев

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** отсутствовала pagination.
- **Изменения:** последовательные страницы с Link/length detection, общий deadline, максимум 10 страниц, предупреждение и сохранение старых записей при cap.
- **Файлы:** `githubService.ts`.
- **Проверка:** 100+1 запись на двух страницах; cap=1 с last-good.
- **Результат:** 101-я запись видна, ограничение не скрыто.
- **Ограничения:** 10 страниц — намеренный предел; при его достижении показана неполнота свежего API-набора.

## BUG-025 — Общий кеш username

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** username отсутствовал в cache identity.
- **Изменения:** lowercased username в ключе и envelope; v4 совместимость только для первоначального владельца; для других аккаунтов редакционный каталог владельца не подмешивается.
- **Файлы:** `githubService.ts`.
- **Проверка:** два пользователя, повторный cache-hit только для правильного аккаунта.
- **Результат:** между аккаунтами не возвращаются чужие snapshots.
- **Ограничения:** UI по-прежнему намеренно отображает один настроенный аккаунт владельца.

## BUG-026 — Дублирующиеся номера

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** номера присваивались до merge и затем смешивались с curated.
- **Изменения:** canonical dedup и нумерация после итогового объединения.
- **Файлы:** `githubService.ts`.
- **Проверка:** duplicate API records; уникальность id и number.
- **Результат:** последовательные уникальные display numbers.
- **Ограничения:** это порядок отображения, а не постоянный repository identifier.

## BUG-027 — Mobile NEXT

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** unlayered display:flex перебивал Tailwind hidden.
- **Изменения:** display определяется согласованно с breakpoint 640px в HUD CSS.
- **Файлы:** `scrollNavigation.css`.
- **Проверка:** 390px visibility=false.
- **Результат:** NEXT не накладывается на мобильный контент.
- **Ограничения:** основной rail/header остаётся видимым по исходному дизайну.

## BUG-028 — Невидимые кнопки HUD

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** opacity/pointer-events не убирали controls из Tab/ARIA; progressbar не имел значения.
- **Изменения:** рендерится одна активная кнопка; progressbar отделён от marker buttons, получил numeric aria-valuenow, markers — aria-current; убрано постоянное live-озвучивание процентов.
- **Файлы:** `ScrollNavigationHUD.tsx`, `ScrollProgressRuler.tsx`.
- **Проверка:** count active headers=1, accessible progress value, keyboard traversal.
- **Результат:** скрытых active-header controls нет.
- **Ограничения:** screen reader ergonomics на реальном устройстве дополнительно не измерялась.

## BUG-029 — Windows clean

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** Unix rm -rf в npm script.
- **Изменения:** Node fs.rm с вычислением и проверкой единственного dist-пути; server.js больше не затрагивается.
- **Файлы:** `scripts/clean.mjs`, `package.json`.
- **Проверка:** реальный npm run clean → production build на Windows.
- **Результат:** успешно, исходники/настройки не удалены.
- **Ограничения:** OS-level блокировки dist-файлов при сторонних процессах всё ещё могут запретить удаление, как и любую файловую операцию.

## BUG-030 — Шаблонный остаточный код

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** неиспользуемый server/AI-template и мёртвые helpers/props.
- **Изменения:** удалены @google/genai/express/dotenv/@types/express и неподключённые autoprefixer/direct esbuild; build tools перенесены в devDependencies; удалены SectionTitle/measureWordLayout/HUD_COLORS/mockupType/unused imports и Hero contact prop; реальные env-настройки документированы; ложная Gemini capability убрана.
- **Файлы:** package/lock, metadata/env/README, types/utils/config и соответствующие компоненты.
- **Проверка:** поиск использования, strict/noUnused typecheck и build.
- **Результат:** unused-диагностик нет, сервер/секреты не требуются для запуска сайта.
- **Ограничения:** optional cover metadata сохранена для совместимости старых snapshots; удаление неиспользуемых полей схемы ради косметики не выполнялось.

## BUG-031 — Versioned .vs

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** IDE index/layout отсутствовали в ignore и были отслеживаемыми.
- **Изменения:** .vs добавлена в ignore, выполнен git rm --cached только для .vs.
- **Файлы:** `.gitignore`, индекс Git.
- **Проверка:** git ls-files .vs пуст; .vs/slnx.sqlite на диске существует.
- **Результат:** staged removals относятся только к Git tracking, локальные пользовательские данные не удалены.
- **Ограничения:** история Git не переписывалась, прежние commits могут содержать старые IDE-артефакты.

## BUG-032 — Fake Live Demo

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** demoUrl копировал source URL.
- **Изменения:** два ложных demoUrl удалены; API homepage проверяется как HTTP(S) и не дублирует repository identity.
- **Файлы:** `featuredProjects.ts`, `githubService.ts`.
- **Проверка:** локальные WorldBox/Figmint больше не содержат demo; merge unsafe/equal source URL не создаёт ложного действия.
- **Результат:** отсутствующие demo не заменены выдуманными адресами.
- **Ограничения:** доступность настоящего внешнего homepage определяется владельцем репозитория и сетью.

## BUG-033 — Недоступные ошибки формы

- **Статус:** исправлена.
- **Исходная проблема / первопричина:** визуальные ошибки не были связаны с полями; noValidate отключал native explanation.
- **Изменения:** aria-invalid/describedby, ID ошибок, alert summary/banner, focus первого invalid control, status для результата, корректный retry без потери draft.
- **Файлы:** `ContactSection.tsx`.
- **Проверка:** пустая форма, DOM ARIA-связи; endpoint 500/timeout/retry и fallback Edit.
- **Результат:** ошибки программно доступны и видимы, draft сохраняется.
- **Ограничения:** реальный screen reader и внешний server-side validation не проверялись.

## BUG-034 — Open Graph без изображения

- **Статус:** частично исправлена.
- **Исходная проблема / первопричина:** summary_large_image без image metadata; неизвестен фактический публичный origin.
- **Изменения:** подготовлен PNG 1200×630 в исходном стиле, image/type/dimensions/alt + Twitter image; при VITE_SITE_URL генерируются абсолютные image/canonical/og:url. Нет выдуманного production-домена.
- **Файлы:** `public/assets/social-preview.png`, `scripts/generate-social-preview.cjs`, `vite.config.ts`, `.env.example`, `README.md`.
- **Проверка:** просмотр PNG; отдельная сборка с явно тестовым `https://portfolio.example.test/preview/`, проверка абсолютных metadata и subpath assets.
- **Результат:** код и изображение готовы, тестовая конфигурация работает.
- **Оставшееся условие:** владелец должен предоставить/задать реальный VITE_SITE_URL перед production build и проверить crawler на deployed URL. В локальной сборке без адреса image URL остаётся относительным; эта часть не объявляется полностью завершённой.

## Дополнительные дефекты, выявленные и устранённые при работе

1. **Смена reduced-motion после mount не доходила до потребителей installed Motion hook.** Подтверждено чтением установленного implementation и динамической browser-проверкой. Добавлен live useSyncExternalStore hook; dependency не обновлялась. Относится к первопричине BUG-023.
2. **Общая Suspense-граница скрывала каталог при первой lazy-загрузке details.** Возникло при оптимизации, обнаружено регрессией до завершения. Разделены boundaries; stack/focus/search повторно проверены.
3. **Ошибка lazy chunk могла обрушить страницу или оказаться под native catalog.** Добавлен FeatureBoundary с доступным recovery-dialog в top layer и Dismiss/явным Reload. Искусственно заблокирован ProjectModal chunk; каталог остаётся рабочим.
4. **Сброс мигрированной Gamma-обложки мог прочитать старый alias после reload.** Новый reset сохраняет tombstone, не удаляя пользовательский legacy record.
5. **Неполная нормализация progress timeline масштабировала времена переходов к последней анимации вместо полного документа.** Timeline имеет явную полную длительность; физические section ranges пересчитываются на layout changes.
6. **Custom Вкапибара ссылался на профиль при подписи «Source repository».** Подпись теперь различает repository и developer profile; URL не выдумывался.
7. **Статичная плашка Yandex AdBlocker продолжала показывать «4 Stars» при обновлённой live-статистике.** Число удалено из редакционного badge, динамическая статистика остаётся в своём поле; отдельный regression unit test проходит.
8. **Tailwind учитывал тексты отчётов/тестов при сборке CSS.** Source detection ограничен src и index.html; CSS/JS hashes корневой и изолированной сборок окончательных исходников совпадают.

Новых подтверждённых неустранённых runtime-дефектов по итоговым сценариям не обнаружено. Это не утверждение об исчерпывающем отсутствии ошибок.

## Сохранение дизайна и ограничения

Палитра, serif/sans типографика, размеры/композиция секций, радиусы, bento-карточки, обычные reveal/parallax эффекты и SVG letter-motion сохранены. Изменились только необходимые focus indicators, корректные статусы/ошибки, адаптивное поведение диалогов и overrides. Desktop/mobile screenshots сверены с исходными доказательствами; брендинг FreeChat/Figmint без custom cover сохранён. У reduced-motion намеренно уменьшена анимация.

Safari/Firefox, реальные мобильные устройства, VoiceOver/NVDA, production TLS/CSP/CORS/cache headers, реальная доставка писем, GitHub rate limit на настоящем аккаунте, social crawlers и длительный heap/CPU soak не выдаются за проверенные. Удалённый CI workflow ещё не запускался.

Временные доказательства: `C:/Users/moiiu/.codex/visualizations/2026/10/16/01a143ad-60f9-7700-a644-e682ad711680/`, подпапки `stage2`, `stage3`, `stage5-verified`, `regression-root`, `regression-subpath`, `final-root-verified`, `npm-ci-check`. Основной повторяемый сценарий находится в `tests/browser.cjs`; unit/integration — в `tests/*.test.ts`.

Повторная оценка и оставшиеся условия опубликованы в `PROJECT_AUDIT_AFTER.md`.
