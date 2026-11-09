import test from 'node:test';
import assert from 'node:assert/strict';
import { chooseInitialLocale, persistLocale, supportedLocales } from '../lib/locale.mjs';

const makeStorage = (initial = null) => ({
  value: initial,
  getItem(key) { assert.equal(key, 'mm-portfolio-language'); return this.value; },
  setItem(key, value) { assert.equal(key, 'mm-portfolio-language'); this.value = value; },
});

test('supports exactly Spanish, Portuguese, and English', () => {
  assert.deepEqual(supportedLocales, ['es', 'pt', 'en']);
});

test('a valid saved choice wins over browser preferences', () => {
  assert.equal(chooseInitialLocale(['en-US'], makeStorage('pt')), 'pt');
});

test('browser locale matches regional tags case-insensitively', () => {
  assert.equal(chooseInitialLocale(['fr-FR', 'PT-br'], makeStorage()), 'pt');
});

test('unsupported or unavailable browser locale falls back to Spanish', () => {
  assert.equal(chooseInitialLocale(['fr-FR'], makeStorage()), 'es');
  assert.equal(chooseInitialLocale([], makeStorage()), 'es');
});

test('invalid saved values are ignored in favor of browser preference', () => {
  assert.equal(chooseInitialLocale(['en-GB'], makeStorage('xx')), 'en');
});

test('manual locale selection persists only supported values', () => {
  const storage = makeStorage();
  assert.equal(persistLocale('pt', storage), true);
  assert.equal(storage.value, 'pt');
  assert.equal(persistLocale('xx', storage), false);
  assert.equal(storage.value, 'pt');
});

test('unavailable or throwing storage degrades without throwing', () => {
  const broken = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
  assert.equal(chooseInitialLocale(['en'], broken), 'en');
  assert.equal(chooseInitialLocale(['pt'], null), 'pt');
  assert.equal(persistLocale('es', broken), false);
  assert.equal(persistLocale('es', null), false);
});
