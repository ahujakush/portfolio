import Link from 'next/link';
import { ArrowLeft } from '@/components/ui/icons';

export default function NotFound() {
  return (
    <section className="container flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 text-huge font-bold">
        Nothing <span className="text-accent">here.</span>
      </h1>
      <p className="mt-6 max-w-md text-[17px] text-fg2">That page does not exist, or it moved. The home page has everything.</p>
      <Link href="/" className="btn-primary mt-9 self-start">
        <ArrowLeft width={17} height={17} />
        Back home
      </Link>
    </section>
  );
}
