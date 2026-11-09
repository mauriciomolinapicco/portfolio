import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../components/portfolio.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/portfolio.tsx', import.meta.url), 'utf8');

test('parallax is an optional CSS scroll-timeline enhancement on decorative layers only', () => {
  assert.match(css, /@supports \(animation-timeline:\s*view\(\)\)/);
  assert.match(css, /prefers-reduced-motion:\s*no-preference/);
  assert.match(css, /\.hero:after\{animation:hero-drift[^}]*animation-timeline:view\(\)/);
  assert.match(css, /\.productArt:before,\.productArt:after\{animation:art-drift[^}]*animation-timeline:view\(\)/);
  assert.match(css, /@keyframes hero-drift/);
  assert.match(css, /@keyframes art-drift/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{[^}]*animation:none!important/s);
  assert.doesNotMatch(component, /addEventListener\(['"]scroll|onscroll/i);
});

test('parallax travel is reduced on small screens and decorative product layers remain clipped', () => {
  assert.match(css, /@media\(max-width:650px\) and \(prefers-reduced-motion:no-preference\)/);
  assert.match(css, /\.productArt\{[^}]*overflow:hidden/);
  assert.match(css, /\.hero:after\{[^}]*pointer-events:none/);
});
