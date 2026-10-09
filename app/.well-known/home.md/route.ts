import { text } from '@/lib/api';
import { homeMarkdown } from '@/lib/home-md';

export const dynamic = 'force-static';

export const GET = () => text(homeMarkdown(), 'text/markdown; charset=utf-8');
