import { ImageResponse } from 'next/og';
import { ogFonts } from '@/lib/og-font';
import { getPost, posts, seriesMeta } from '@/data/posts';
import { site } from '@/data/site';

export const alt = 'A post by Kush Ahuja on building AI agents';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontFamily: 'Bricolage Grotesque',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#141316',
          color: '#F7F7F7',
          padding: 72,
          borderTop: '10px solid #EA0044',
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, color: '#FF3D6E', letterSpacing: 3 }}>
          {post ? `${seriesMeta[post.series].name.toUpperCase()} · PART ${post.part}` : 'WRITING'}
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
          {post?.title ?? site.name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#B8B8B8' }}>
          <span>{site.name}</span>
          <span>thekush.codes/blog</span>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
