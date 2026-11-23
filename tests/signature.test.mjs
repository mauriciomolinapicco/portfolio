import test from 'node:test';
import assert from 'node:assert/strict';
import { observeSignatureFill } from '../lib/signature.mjs';

function mount() {
  const listeners = new Map();
  const preference = { matches: false };
  const view = { innerHeight: 800, scrollY: 1000,
    matchMedia: () => preference,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name, callback) => { if (listeners.get(name) === callback) listeners.delete(name); },
  };
  const properties = new Map();
  const element = { ownerDocument: { defaultView: view, documentElement: { scrollHeight: 2000 } },
    style: { setProperty: (name, value) => properties.set(name, value), removeProperty: name => properties.delete(name) },
  };
  const cleanup = observeSignatureFill(element);
  return { view, preference, properties, cleanup, listeners,
    emit: (name, event) => listeners.get(name)?.(event),
    fill: () => Number.parseFloat(properties.get('--signature-fill') || '0'),
  };
}

test('signature stays plain before the final approach, then accepts remaining wheel momentum', () => {
  const app = mount();
  app.emit('wheel', { deltaY: 120, deltaMode: 0 });
  assert.equal(app.fill(), 0);
  app.view.scrollY = 1150;
  app.emit('scroll', {});
  assert(app.fill() > 0 && app.fill() < 30);
  app.view.scrollY = 1200;
  app.emit('scroll', {});
  assert.equal(app.fill(), 30);
  app.emit('wheel', { deltaY: -120, deltaMode: 0 });
  app.emit('wheel', { deltaY: 120, deltaMode: 0, ctrlKey: true });
  assert.equal(app.fill(), 30);
  app.emit('wheel', { deltaY: 120, deltaMode: 0 });
  assert(app.fill() > 0 && app.fill() < 100);
  for (let i = 0; i < 20; i++) app.emit('wheel', { deltaY: 120, deltaMode: 0 });
  assert.equal(app.fill(), 100);
  app.view.scrollY = 1000;
  app.emit('scroll', {});
  assert.equal(app.fill(), 0);
  app.cleanup();
  assert.equal(app.listeners.size, 0);
});

test('touch overscroll paints only at bottom and reduced motion suppresses painting', () => {
  const app = mount();
  app.emit('touchstart', { touches: [{ clientY: 500 }] });
  app.emit('touchmove', { touches: [{ clientY: 450 }] });
  assert.equal(app.fill(), 0);
  app.view.scrollY = 1200;
  app.emit('touchmove', { touches: [{ clientY: 400 }] });
  assert(app.fill() > 0 && app.fill() < 100);
  const progress = app.fill();
  app.preference.matches = true;
  app.emit('wheel', { deltaY: 120, deltaMode: 0 });
  app.emit('touchmove', { touches: [{ clientY: 350 }] });
  assert.equal(app.fill(), progress);
  app.cleanup();
});

test('inertial scroll alone starts the fill before bottom without requiring another gesture', () => {
  const app = mount();
  app.view.scrollY = 1070;
  app.emit('scroll', {});
  assert.equal(app.fill(), 0);
  app.view.scrollY = 1100;
  app.emit('scroll', {});
  const early = app.fill();
  assert(early > 0 && early < 30);
  app.view.scrollY = 1200;
  app.emit('scroll', {});
  assert.equal(app.fill(), 30);
  app.emit('wheel', { deltaY: 12, deltaMode: 0 });
  assert(app.fill() > 30);
  app.cleanup();
});
