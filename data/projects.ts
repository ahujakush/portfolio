import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'agents-hub',
    title: 'agents-hub',
    kind: 'AI product · Founder',
    tagline: 'Your AI team, living in Telegram',
    description:
      'Sign in with Google once, unlock the agents you need, and each one joins your Telegram group as its own bot. Gmail, Calendar, Tasks, Docs and Maps agents work in your real accounts, with a three-layer memory, a burst buffer that waits for you to finish typing, and a mobile app on the same brain.',
    stack: ['TypeScript', 'Node 22', 'Azure OpenAI', 'Supabase', 'Telegram', 'Expo'],
    year: '2026',
    status: 'live',
    image: '/projects/agents-hub.webp',
    href: 'https://agentshub.thekush.codes',
    post: 'why-my-ai-team-lives-in-telegram',
    featured: true,
  },
  {
    slug: 'buildyour-company',
    title: 'BuildYour.Company',
    kind: 'AI platform · CTO & Co-founder',
    tagline: 'Diagnose before you build',
    description:
      'An AI startup diagnosis and startup map for early founders. I lead engineering: the architecture, the agent workflows that turn messy founder input into a structured plan, and the infrastructure underneath.',
    stack: ['Next.js', 'TypeScript', 'Python', 'LangGraph', 'Supabase'],
    year: '2025',
    status: 'live',
    image: '/projects/byc.webp',
    href: 'https://buildyour.company',
    featured: true,
  },
  {
    slug: 'kairo',
    title: 'Kairo',
    kind: 'AI coach · BuildYour.Company',
    tagline: 'The one thing to do today',
    description:
      'A daily go-to-market coach for founders. Kairo reads your startup map and sends one task each morning and one honest question each evening, then rewrites the plan when reality disagrees with it.',
    stack: ['Next.js', 'Voice AI', 'WhatsApp', 'Supabase'],
    year: '2026',
    status: 'live',
    image: '/projects/kairo.webp',
    href: 'https://kairo.buildyour.company',
    featured: true,
  },
  {
    slug: 'codeduo',
    title: 'CodeDuo',
    kind: 'Developer tool',
    tagline: 'Run, compile and optimise code in one place',
    description:
      'A code studio that runs Python, C++, JavaScript and Java in a sandbox with stdin, compiles with diagnostics, and rewrites slow code with a before and after Big-O breakdown.',
    stack: ['Python', 'FastAPI', 'OpenAI', 'Gemini'],
    year: '2026',
    status: 'live',
    href: 'https://codeduo-rho.vercel.app',
    art: 'code',
  },
  {
    slug: 'report-generator',
    title: 'AI Report Generator',
    kind: 'Multi-agent app',
    tagline: 'Topic in, finished Word report out',
    description:
      'Five agents in a row: research, outline, write, edit, format. Academic, technical or business reports in three lengths, with live progress and a .docx at the end.',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'python-docx'],
    year: '2026',
    status: 'archived',
    art: 'report',
  },
  {
    slug: 'inventory-dashboard',
    title: 'Inventory & Supply Chain Dashboard',
    kind: 'Hackathon build',
    tagline: 'Decisions first, charts second',
    description:
      'A multipage Streamlit dashboard for inventory, suppliers and sales, with shared filters, a glossary for every metric and one-step exports.',
    stack: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    year: '2026',
    status: 'archived',
    art: 'dashboard',
  },
  {
    slug: 'voice-assistant',
    title: 'Voice Assistant',
    kind: 'Voice AI',
    tagline: 'Listens, reasons and acts',
    description:
      'Speech to text into an LLM into speech, wired to real tool calls. Built around barge-in and low latency so it feels like a conversation, not a command line you talk at.',
    stack: ['Python', 'Whisper', 'LLM tools', 'WebSockets'],
    year: '2025',
    status: 'live',
    art: 'voice',
  },
  {
    slug: 'rag-chatbot',
    title: 'RAG Chatbot',
    kind: 'AI app',
    tagline: 'Answers from your documents, with citations',
    description:
      'Ingestion, chunking, hybrid search and streamed answers that cite the passage they came from, instead of improvising.',
    stack: ['Python', 'LangChain', 'FastAPI', 'pgvector'],
    year: '2025',
    status: 'live',
    art: 'chat',
  },
  {
    slug: 'traffic-management',
    title: 'Traffic Management System',
    kind: 'Computer vision',
    tagline: 'Signals that read the road',
    description:
      'Counts vehicles per lane from camera feeds and gives green time by measured density instead of a fixed timer. Built to run on modest hardware at the junction.',
    stack: ['Python', 'OpenCV', 'YOLO', 'NumPy'],
    year: '2024',
    status: 'archived',
    art: 'traffic',
  },
  {
    slug: 'pocketguard',
    title: 'PocketGuard',
    kind: 'Personal finance',
    tagline: 'Where the money actually goes',
    description:
      'An expense tracker that sorts transactions on its own and sets budgets from real spending habits, not a number you typed once.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    year: '2024',
    status: 'in-progress',
    art: 'finance',
  },
];

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'Building',
  archived: 'Archived',
};
