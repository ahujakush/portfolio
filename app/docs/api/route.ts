import { text } from '@/lib/api';
import { apiDocsMarkdown } from '@/lib/openapi';

export const dynamic = 'force-static';

export const GET = () => text(apiDocsMarkdown(), 'text/markdown; charset=utf-8');
