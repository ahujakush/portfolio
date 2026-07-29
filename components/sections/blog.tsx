'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '@/data/posts';
import { Panel, PanelHeading } from '@/components/ui/panel';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/ui/reveal';

/** Three writing cards. Add a real `href` to any post to link it out. */
export function Blog() {
  return (
    <Panel id="blog" as="section" className="scroll-mt-24 p-6 sm:p-8">
      <PanelHeading title="Writing" action="View all" href="#blog" />

      <Stagger className="mt-6 grid gap-3 md:grid-cols-3" gap={0.09}>
        {posts.map((post) => (
          <StaggerItem key={post.title} className="h-full">
            <motion.a
              href={post.href ?? '#blog'}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="tile group flex h-full flex-col p-5 transition-colors duration-500 hover:border-accent/30"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge variant="accent">{post.tag}</Badge>
                <ArrowUpRight className="size-4 text-fg3 transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>

              <h3 className="mt-4 text-[14.5px] font-semibold leading-snug transition-colors duration-500 group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-fg2">
                {post.blurb}
              </p>

              <p className="mt-4 font-mono text-[11px] text-fg3">
                {post.date} · {post.readTime}
              </p>
            </motion.a>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
