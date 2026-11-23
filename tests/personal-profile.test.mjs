import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../components/portfolio.tsx', import.meta.url), 'utf8');
const content = await readFile(new URL('../lib/content.ts', import.meta.url), 'utf8');
const css = await readFile(new URL('../components/portfolio.module.css', import.meta.url), 'utf8');

test('language choices are named, pressed-state buttons using existing locale persistence', () => {
  assert.doesNotMatch(page, /<select/);
  assert.match(page, /role="group" aria-label=\{text.locale\}/);
  assert.match(page, /aria-pressed=\{locale === option.value\}/);
  assert.match(page, /onClick=\{\(\) => changeLocale\(option.value\)\}/);
  assert.match(page, /persistLocale\(selected\)/);
});

test('personal introduction has a replaceable portrait and capabilities precede products', async () => {
  assert.match(page, /src="\/mauricio-portrait.svg"/);
  assert.match(page, /alt=\{text.portraitAlt\}/);
  assert.ok(page.indexOf('id="servicios"') < page.indexOf('id="productos"'));
  assert.match(await readFile(new URL('../public/mauricio-portrait.svg', import.meta.url), 'utf8'), /<svg/);
  for (const phrase of ['Tu próximo paso', 'Seu próximo passo', 'Your next step', 'Software para tu negocio']) {
    assert.ok(!content.includes(phrase) && !page.includes(phrase));
  }
});

test('Lymbo has its real public destination and selling experience in each locale', () => {
  assert.match(page, /href="https:\/\/lymbo.app"/);
  for (const phrase of ['Desarrollo y vendo Lymbo', 'Desenvolvo e vendo o Lymbo', 'I build and sell Lymbo']) assert.ok(content.includes(phrase));
  assert.match(css, /React Bits GradientText/);
  assert.match(css, /@keyframes lymbo-gradient/);
});

test('own work is a general section with Lymbo as one project in every locale', () => {
  for (const label of ['Lo que construyo', 'O que construo', 'What I build']) assert.ok(content.includes(label));
  const titles = [...content.matchAll(/productsTitle: "([^"]+)"/g)];
  assert.equal(titles.length, 3);
  for (const [, title] of titles) assert.ok(!title.includes('Lymbo'));
  assert.doesNotMatch(content, /navProducts: "Lymbo"/);
  assert.match(page, /products\.map\(product/);
});

test('experience offers a real downloadable PDF with localized labels', async () => {
  assert.match(page, /href="\/cv-mauricio-molina.pdf" download[^>]*>\{text.downloadCv\}/);
  assert.ok(page.indexOf('id="experiencia"') < page.indexOf('href="/cv-mauricio-molina.pdf"'));
  assert.ok(page.indexOf('href="/cv-mauricio-molina.pdf"') < page.indexOf('id="contacto"'));
  for (const label of ['Descargar CV', 'Baixar currículo', 'Download CV']) assert.ok(content.includes(label));
  const pdf = await readFile(new URL('../public/cv-mauricio-molina.pdf', import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
});
