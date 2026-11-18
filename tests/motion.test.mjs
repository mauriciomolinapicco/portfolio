import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { splitWords, revealDelay } from '../lib/motion.mjs';

const css = await readFile(new URL('../components/portfolio.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/portfolio.tsx', import.meta.url), 'utf8');

test('splitWords keeps every word in order with a running stagger index', () => {
  assert.deepEqual(splitWords('Tu próximo paso,'), [
    { word: 'Tu', index: 0 }, { word: 'próximo', index: 1 }, { word: 'paso,', index: 2 },
  ]);
  assert.deepEqual(splitWords('con buen software.', 3).map(part => part.index), [3, 4, 5]);
  assert.equal(splitWords('  spaced   out  ').map(part => part.word).join(' '), 'spaced out');
  assert.deepEqual(splitWords(''), []);
});

test('revealDelay staggers but caps long lists so late items never lag behind', () => {
  assert.equal(revealDelay(0), '0ms');
  assert.equal(revealDelay(2), '140ms');
  assert.equal(revealDelay(50), '700ms');
});

test('split text keeps the full sentence available to assistive technology', () => {
  assert.match(component, /className=\{styles\.srOnly\}>\{text\}<\/span>/);
  assert.match(component, /<span aria-hidden="true" className=\{styles\.split\}/);
});

test('reveal content stays visible without JS and is only hidden once motion is ready', () => {
  assert.match(css, /\.motionReady \[data-reveal\]:not\(\[data-in\]\)\{[^}]*opacity:0/);
  assert.doesNotMatch(css, /(^|\}|\s)\.page \[data-reveal\]:not\(\[data-in\]\)\{[^}]*opacity:0/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /setMotionReady\(true\)/);
  assert.match(component, /motionReady \? ` \$\{styles\.motionReady\}`/);
});

test('observed reveal targets never remount on locale change (key and data-reveal never share an element)', () => {
  assert.doesNotMatch(component, /<[a-z0-9]+[^>]*\bkey=\{[^}]*locale[^}]*\}[^>]*data-reveal/);
  assert.doesNotMatch(component, /<[a-z0-9]+[^>]*data-reveal[^>]*\bkey=\{[^}]*locale/);
});

test('scroll progress, marquee and outlined signature use CSS motion', () => {
  assert.match(css, /\.progress\{[^}]*animation:progress linear[^}]*animation-timeline:scroll\(root\)/);
  assert.match(css, /@keyframes marquee/);
  assert.match(component, /className=\{styles\.marqueeTrack\} aria-hidden="true"/);
  assert.match(css, /-webkit-text-stroke/);
});

test('reduced motion disables every animation and reveals all content', () => {
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{[^}]*animation:none!important/s);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{[\s\S]*\[data-reveal\][^}]*opacity:1!important/);
  assert.match(component, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
});

test('split words keep a real space between masked word boxes', () => {
  assert.match(component, /<span className=\{styles\.w\}>[\s\S]*?<\/span><\/span>\{' '\}/);
});
