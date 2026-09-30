/**
 * Bricolage Grotesque ExtraBold for generated share images. Satori (next/og) can't read
 * woff2, so ask Google Fonts' CSS API without a browser user agent: it then
 * answers with a plain TTF url. Runs at build time; if the network is down
 * the images fall back to the default font instead of failing the build.
 */
let cached: Promise<ArrayBuffer | null> | undefined;

export function loadDisplayFont() {
  cached ??= (async () => {
    try {
      const css = await (await fetch('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800')).text();
      const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
      if (!url) return null;
      return await (await fetch(url)).arrayBuffer();
    } catch {
      return null;
    }
  })();
  return cached;
}

export async function ogFonts() {
  const data = await loadDisplayFont();
  return data ? [{ name: 'Bricolage Grotesque', data, weight: 800 as const, style: 'normal' as const }] : undefined;
}
