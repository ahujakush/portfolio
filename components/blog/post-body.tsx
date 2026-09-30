import { Fragment, type ReactNode } from 'react';
import type { PostBlock } from '@/types';

/** `code` spans inside plain text become <code>. That is the only inline markup posts use. */
function inline(text: string): ReactNode {
  return text.split('`').map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>,
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="post">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{inline(b.text)}</p>;
          case 'h2':
            return <h2 key={i}>{b.text}</h2>;
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'quote':
            return <blockquote key={i}>{inline(b.text)}</blockquote>;
          case 'code':
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
