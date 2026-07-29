import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="panel sheen flex min-h-[60vh] flex-col items-center justify-center p-10 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Error 404</p>
      <h1 className="mt-5 text-5xl font-bold tracking-tightest sm:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-md text-[14.5px] text-fg2">
        That route doesn&apos;t exist — everything on this site lives on one page.
      </p>
      <Button asChild variant="solid" className="mt-8">
        <Link href="/">
          <ArrowLeft />
          Back home
        </Link>
      </Button>
    </section>
  );
}
