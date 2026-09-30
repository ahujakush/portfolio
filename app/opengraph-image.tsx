import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { ogFonts } from '@/lib/og-font';
import { site } from '@/data/site';

export const alt = `${site.name}, AI Engineer & Founder`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/kush/og-cutout.png'));
  const src = `data:image/png;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontFamily: 'Bricolage Grotesque',
          display: 'flex',
          position: 'relative',
          background: '#141316',
          color: '#F7F7F7',
          padding: 64,
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(234,0,68,0.45), rgba(234,0,68,0) 70%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div style={{ fontSize: 22, color: '#828282', letterSpacing: 4 }}>THEKUSH.CODES</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>KUSH</div>
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6, color: '#EA0044' }}>
              AHUJA
            </div>
            <div style={{ fontSize: 30, color: '#B8B8B8', marginTop: 28, maxWidth: 620 }}>
              AI engineer. CTO at BuildYour.Company. Founder of agents-hub.
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" height={600} style={{ position: 'absolute', right: 70, bottom: 0 }} />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
