/**
 * Tiny event bus for the command palette.
 *
 * Lets the hero's command bar (and anything else) open the palette without
 * lifting state into app/page.tsx — which keeps the page a server component
 * instead of forcing the whole tree to render on the client.
 */
const OPEN_COMMAND = 'portfolio:open-command';

export function openCommandPalette() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND));
}

export function onOpenCommandPalette(handler: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(OPEN_COMMAND, handler);
  return () => window.removeEventListener(OPEN_COMMAND, handler);
}
