import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const content = await readFile(new URL('../lib/content.ts', import.meta.url), 'utf8');
const page = await readFile(new URL('../components/portfolio.tsx', import.meta.url), 'utf8');

test('each supported locale has the copy needed by the rendered experience', () => {
  const sections = [...content.matchAll(/^  (es|pt|en): \{([\s\S]*?)^  \},/gm)];
  assert.deepEqual(sections.map(section => section[1]), ['es', 'pt', 'en']);
  for (const [, locale, dictionary] of sections) {
    for (const key of ['headline', 'intro', 'productBody', 'service1', 'detail3', 'aboutTitle', 'bio', 'contactBody', 'location']) {
      assert.match(dictionary, new RegExp(`\\b${key}:`), `${locale} is missing ${key}`);
    }
  }
});

test('portfolio includes the selected sections, phone, and working professional profile destinations', () => {
  for (const id of ['productos', 'servicios', 'experiencia', 'contacto']) assert.ok(page.includes(`id="${id}"`));
  assert.ok(page.includes('href="tel:+543571690426"'));
  assert.ok(page.includes('https://github.com/mauriciomolinapicco'));
  assert.ok(page.includes('https://www.linkedin.com/in/mauricio-molina-picco/'));
  assert.ok(page.includes('products.map'));
});
