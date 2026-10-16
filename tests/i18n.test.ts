import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLocale } from '../src/i18n/locale';
import { translate, statLabel } from '../src/i18n';
import en from '../src/i18n/locales/en.json';
import ru from '../src/i18n/locales/ru.json';

test('language preference respects saved selection, supported preference order and fallback', () => {
  assert.equal(resolveLocale('en', ['ru-RU']), 'en');
  assert.equal(resolveLocale('ru', ['en-US']), 'ru');
  assert.equal(resolveLocale(null, ['en-GB', 'ru-RU']), 'en');
  assert.equal(resolveLocale(null, ['ru-RU', 'en-US']), 'ru');
  assert.equal(resolveLocale(null, ['de-DE', 'ru', 'en']), 'ru');
  assert.equal(resolveLocale('invalid', ['de'], 'ru_RU'), 'ru');
  assert.equal(resolveLocale(null, ['fr', 'de']), 'en');
  assert.equal(resolveLocale(null), 'en');
});

test('dictionaries cover identical keys and interpolation parameters', () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(ru).sort());
  for (const key of Object.keys(en) as (keyof typeof en)[]) {
    assert.ok(ru[key].trim(), key);
    assert.deepEqual([...ru[key].matchAll(/\{\w+\}/g)].map(m => m[0]).sort(), [...en[key].matchAll(/\{\w+\}/g)].map(m => m[0]).sort(), key);
  }
});

test('translations preserve names, unknown remote text, status codes and user values', () => {
  assert.equal(translate('View {title} details', 'ru', { title: 'FreeChat' }), 'Подробнее о проекте FreeChat');
  assert.equal(translate('My new GitHub description', 'ru'), 'My new GitHub description');
  assert.equal(translate('__proto__', 'ru'), '__proto__');
  assert.equal(translate('constructor', 'ru'), 'constructor');
  assert.equal(translate('GitHub is unavailable (503). Please try again.', 'ru'), 'GitHub недоступен (503). Попробуйте ещё раз.');
  assert.equal(translate('TypeScript Project', 'ru'), 'Проект на TypeScript');
  assert.equal(translate('Building Digital', 'en'), 'Building Digital');
  assert.equal(translate('Name: {name}\nEmail: {email}\n\nMessage:\n{message}', 'ru', { name: 'A', email: 'a@b.c', message: '<keep me>' }), 'Имя: A\nПочта: a@b.c\n\nСообщение:\n<keep me>');
});

test('Russian project statistics use the correct plural forms', () => {
  for (const [count, expected] of [[1, 'звезда'], [2, 'звезды'], [5, 'звёзд'], [11, 'звёзд'], [21, 'звезда']] as const) {
    assert.equal(statLabel('stars', count, 'ru'), expected);
  }
  assert.equal(statLabel('stars', 1, 'en'), 'stars');
});
