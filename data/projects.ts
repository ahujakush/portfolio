import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'byc',
    title: 'BYC',
    tagline: 'AI platform for building and staffing companies',
    description:
      'The product I lead engineering on. Multi-agent workflows take messy company inputs and turn them into structured, reviewable plans and hiring pipelines. Next.js front end, Python AI services, Postgres underneath.',
    image: '/projects/byc.png',
    stack: ['Next.js', 'TypeScript', 'Python', 'LangGraph', 'Supabase'],
    status: 'live',
    featured: true,
    year: '2025',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    tagline: 'RAG assistant grounded in your own documents',
    description:
      'A retrieval-augmented chatbot that answers from a private knowledge base instead of improvising. Handles ingestion, chunking, hybrid search and streamed responses, with citations back to the source passage.',
    image: '/projects/ai-chatbot.png',
    stack: ['Python', 'LangChain', 'FastAPI', 'pgvector', 'OpenAI'],
    status: 'live',
    featured: true,
    year: '2025',
  },
  {
    slug: 'voice-assistant',
    title: 'Voice Assistant',
    tagline: 'Hands-free agent that listens, reasons and acts',
    description:
      'Speech-to-text into an LLM into text-to-speech, wired to real tool calls. Built around barge-in and low latency so it feels like a conversation rather than a command line you talk at.',
    image: '/projects/voice-assistant.png',
    stack: ['Python', 'Whisper', 'LLM Tools', 'WebSockets', 'TTS'],
    status: 'live',
    featured: true,
    year: '2025',
  },
  {
    slug: 'traffic-management',
    title: 'Traffic Management System',
    tagline: 'Adaptive signal control from live camera feeds',
    description:
      'Computer-vision pipeline that detects and counts vehicles per lane, then reallocates green time based on measured density instead of a fixed timer. Built to run on modest hardware at the intersection.',
    image: '/projects/traffic-management.png',
    stack: ['Python', 'OpenCV', 'YOLO', 'NumPy'],
    status: 'archived',
    year: '2024',
  },
  {
    slug: 'pocketguard',
    title: 'PocketGuard',
    tagline: 'Personal finance tracker with real insight',
    description:
      'Expense tracker that auto-categorises transactions and surfaces where money actually goes, with budgets that adapt to spending habits rather than nagging about a number you set once.',
    image: '/projects/pocketguard.png',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    status: 'in-progress',
    year: '2024',
  },
];

export const statusMeta = {
  live: { label: 'Live', tone: 'success' as const },
  'in-progress': { label: 'In progress', tone: 'warning' as const },
  archived: { label: 'Archived', tone: 'neutral' as const },
};
