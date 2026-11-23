/** @param {HTMLElement} signature */
export function observeSignatureFill(signature) {
  const document = signature.ownerDocument;
  const view = document.defaultView;
  if (!view) return () => {};
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  let progress = 0;
  let touchY;
  const distanceToBottom = () => Math.max(0, document.documentElement.scrollHeight - view.scrollY - view.innerHeight);
  const paint = delta => {
    if (preference.matches || distanceToBottom() > 120 || delta <= 0) return;
    progress = Math.min(100, progress + Math.min(delta, 120) / 6);
    signature.style.setProperty('--signature-fill', `${progress}%`);
  };
  const wheel = event => {
    if (event.ctrlKey) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? view.innerHeight : 1;
    paint(event.deltaY * unit);
  };
  const touchStart = event => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
  };
  const touchMove = event => {
    const nextY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
    if (touchY !== undefined && nextY !== undefined) paint(touchY - nextY);
    touchY = nextY;
  };
  const scroll = () => {
    if (preference.matches) return;
    const remaining = distanceToBottom();
    // Lenis can coast into the footer after the last wheel event.
    progress = remaining > 120 ? 0 : Math.max(progress, (120 - remaining) / 4);
    signature.style.setProperty('--signature-fill', `${progress}%`);
  };
  const listeners = { wheel, touchstart: touchStart, touchmove: touchMove, scroll };
  for (const [name, listener] of Object.entries(listeners)) view.addEventListener(name, listener, { passive: true });
  return () => {
    for (const [name, listener] of Object.entries(listeners)) view.removeEventListener(name, listener);
    signature.style.removeProperty('--signature-fill');
  };
}
