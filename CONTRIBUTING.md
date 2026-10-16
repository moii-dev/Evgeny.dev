# Изменения / Contributing

Для сообщения об ошибке укажите шаги воспроизведения, ожидаемый результат, браузер и размер экрана. Скриншот поможет разобраться в визуальных проблемах.

When reporting a bug, include reproduction steps, the expected result, browser and viewport size. A screenshot helps with visual issues.

## Перед pull request / Before opening a pull request

1. Установите зависимости через `npm ci --ignore-scripts`. / Install dependencies with `npm ci --ignore-scripts`.
2. Опишите проблему и результат изменения. / Describe the problem and the resulting behavior.
3. Выполните `npm test`, `npm run lint` и `npm run build`. / Run `npm test`, `npm run lint` and `npm run build`.
4. Для изменений интерфейса проверьте мобильный и настольный размеры, оба языка, клавиатуру и reduced motion. / For UI changes, check mobile and desktop layouts, both languages, keyboard use and reduced motion.
5. Если затронуты браузерные сценарии или локализация, запустите соответствующий набор из [руководства](docs/DEVELOPMENT.md). / If browser behavior or localization changes, run the relevant suite from the [guide](docs/DEVELOPMENT.md).

Используйте npm и существующий `package-lock.json`. Новые строки интерфейса добавляйте в оба словаря `src/i18n/locales/`. Не добавляйте в коммиты `.env.local`, секреты, `dist/` и `node_modules/`.

Use npm and the existing `package-lock.json`. Add UI text to both dictionaries in `src/i18n/locales/`. Keep `.env.local`, secrets, `dist/` and `node_modules/` out of commits.
