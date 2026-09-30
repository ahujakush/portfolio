import { ImageResponse } from 'next/og';
import { ogFonts } from '@/lib/og-font';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

/** Crimson tile with a white K. */
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontFamily: 'Bricolage Grotesque',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EA0044',
          borderRadius: 143,
          color: '#FFFFFF',
          fontSize: 348,
          fontWeight: 800,
          letterSpacing: -12,
          paddingBottom: 17,
        }}
      >
        K
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
