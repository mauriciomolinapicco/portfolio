import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../components/smooth-scroll.tsx', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');

function mount(reducedMotion) {
  const instances = [];
  const listeners = new Set();
  const preference = {
    matches: reducedMotion,
    addEventListener: (_, callback) => listeners.add(callback),
    removeEventListener: (_, callback) => listeners.delete(callback),
  };
  let effect;
  class Lenis {
    constructor(options) { this.options = options; this.destroyed = false; instances.push(this); }
    destroy() { this.destroyed = true; }
  }
  const exports = {};
  runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, {
    exports,
    require: name => name === 'react' ? { useEffect: callback => { effect = callback; } } : { default: Lenis },
    window: { matchMedia: () => preference },
  });
  assert.equal(exports.SmoothScroll(), null);
  const cleanup = effect();
  return { instances, listeners, cleanup, change(matches) {
    preference.matches = matches;
    listeners.forEach(callback => callback());
  } };
}

test('Lenis mounts globally with its stylesheet, frame loop and anchor navigation', () => {
  assert.match(layout, /import 'lenis\/dist\/lenis.css'/);
  assert.match(layout, /<SmoothScroll\s*\/>/);
  const app = mount(false);
  assert.equal(app.instances.length, 1);
  assert.equal(app.instances[0].options.autoRaf, true);
  assert.equal(app.instances[0].options.anchors, true);
  app.cleanup();
  assert.equal(app.instances[0].destroyed, true);
  assert.equal(app.listeners.size, 0);
});

test('reduced motion uses native scrolling and responds to preference changes', () => {
  const app = mount(true);
  assert.equal(app.instances.length, 0);
  app.change(false);
  assert.equal(app.instances.length, 1);
  app.change(true);
  assert.equal(app.instances[0].destroyed, true);
  app.change(false);
  assert.equal(app.instances.length, 2);
  app.cleanup();
  assert.equal(app.instances[1].destroyed, true);
  assert.equal(app.listeners.size, 0);
});
