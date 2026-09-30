import type { Post } from '@/types';

/**
 * Pillar pages: the broad questions people search ("what is an AI agent",
 * "best AI personal assistant"), answered from first-hand building experience.
 */
export const pillarPosts: Post[] = [
  {
    slug: 'what-is-an-ai-agent',
    series: 'agents-hub',
    part: 1,
    title: 'What is an AI agent? A practical guide from someone who ships them',
    description:
      'A plain-English definition of AI agents, how they differ from chatbots, the four parts every agent needs, and what I learned building the agents-hub AI agents for Gmail, Calendar, Tasks and Docs.',
    date: '2026-09-30',
    tag: 'AI Agents',
    keywords: [
      'what is an AI agent',
      'AI agents',
      'AI agent vs chatbot',
      'how AI agents work',
      'AI agents for email and calendar',
      'personal AI agent',
    ],
    takeaways: [
      'An AI agent is software that uses a language model to decide which actions to take, takes them through tools such as Gmail or a calendar, and checks the result, instead of only replying with text.',
      'Every useful agent has four parts: a model, tools, memory and guardrails. Most failures come from the last two.',
      'agents-hub runs separate AI agents for Gmail, Calendar, Tasks, Docs and Maps, with one hub that routes each message to the right agent.',
    ],
    body: [
      { type: 'h2', text: 'What is an AI agent?' },
      {
        type: 'p',
        text: 'An AI agent is a program that uses a large language model to decide what to do next, does it through real tools, and looks at the result before answering. A chatbot tells you how to add a meeting. An agent adds the meeting to your calendar, checks for a clash, and tells you it is done.',
      },
      {
        type: 'p',
        text: 'I build AI agents for a living. I am CTO of BuildYour.Company and I build agents-hub, a team of AI agents that works inside your Gmail, Google Calendar, Google Tasks and Drive, and that you talk to in Telegram or a mobile app. This guide is what I wish someone had told me before I started.',
      },
      { type: 'h2', text: 'AI agent vs chatbot' },
      {
        type: 'ul',
        items: [
          'A chatbot answers. An AI agent acts: it calls tools, reads what came back and decides the next step.',
          'A chatbot forgets. An agent needs memory, so "send that to Priya" knows what "that" is.',
          'A chatbot can be wrong in words. An agent can be wrong in your inbox, which is why guardrails matter more than prompts.',
        ],
      },
      { type: 'h2', text: 'The four parts of every AI agent' },
      {
        type: 'ol',
        items: [
          'A model that plans. In agents-hub that is Azure OpenAI with function calling: the model chooses which tool to call and with what arguments.',
          'Tools that do real work. Gmail search, create draft, calendar events, Google Tasks, a Python sandbox for documents, Google Maps for places and routes.',
          'Memory. Recent messages, facts that never scroll away, and an archive searched only when needed. See part 5 of this series for the three-layer design.',
          'Guardrails. Hard limits the model cannot talk its way around, such as "the AI can draft an email, only a human tap can send it".',
        ],
      },
      { type: 'h2', text: 'Single agent or many?' },
      {
        type: 'p',
        text: 'One giant agent with every tool gets confused and expensive. agents-hub uses one small agent per job (Gmail, Calendar, Tasks, Docs, Maps) and a hub that reads each message, splits it if needed, and routes each part to the right agent. "Mail Priya the deck and block Friday 4pm" becomes a Gmail task and a Calendar task that run in the same round.',
      },
      { type: 'h2', text: 'What makes an AI agent good' },
      {
        type: 'ul',
        items: [
          'It waits for you to finish typing before it acts (part 4).',
          'It shows progress on long jobs instead of going silent (part 6).',
          'It never sends, deletes or pays without a clear human yes (part 7).',
          'It remembers what you told it last week without re-reading everything every time (part 5).',
        ],
      },
      { type: 'h2', text: 'Where to start' },
      {
        type: 'p',
        text: 'If you want to build one, start with one tool and one guardrail, not ten tools. If you want to use one, pick an agent that works in the accounts you already have. That is the idea behind agents-hub: sign in with Google once, unlock the agents you need, and they do the work where your work already lives.',
      },
    ],
  },
  {
    slug: 'ai-personal-assistant-agents-hub-vs-poke-vs-grok',
    series: 'agents-hub',
    part: 2,
    title: 'AI personal assistants in 2026: agents-hub vs Poke vs Grok',
    description:
      'How three kinds of AI assistant differ: chat assistants like Grok, text-message assistants like Poke, and agent teams like agents-hub that act inside Gmail, Calendar, Tasks and Drive.',
    date: '2026-09-30',
    tag: 'AI Agents',
    keywords: [
      'best AI personal assistant',
      'AI assistant for Gmail and Calendar',
      'Poke alternative',
      'Grok alternative',
      'AI agents in Telegram',
      'AI assistant India',
    ],
    takeaways: [
      'Chat assistants such as Grok are best at answering questions and writing; they are not built to work inside your own inbox and calendar.',
      'Text-message assistants such as Poke bring an AI helper into your messaging app and can connect to your accounts.',
      'agents-hub is a team of separate AI agents for Gmail, Calendar, Tasks, Docs and Maps that you talk to in Telegram or its app, priced per agent in rupees, with sending gated by your tap.',
    ],
    body: [
      {
        type: 'p',
        text: 'People keep asking me how agents-hub compares with the AI assistants they already know. The honest answer is that they are different kinds of product. This page explains the three kinds, where each one is strong, and when agents-hub is the right pick. Features change fast, so treat this as a snapshot from September 2026 and check each product’s own site.',
      },
      { type: 'h2', text: 'Three kinds of AI assistant' },
      {
        type: 'ul',
        items: [
          'Chat assistants (Grok, ChatGPT, Claude): you ask, they answer. Strong at research, writing and reasoning in a chat window.',
          'Text-message assistants (Poke): an AI helper you text from the messaging app you already use, that can link to some of your accounts.',
          'Agent teams (agents-hub): several specialised AI agents that act inside your own Google accounts and report back in a group chat.',
        ],
      },
      { type: 'h2', text: 'When a chat assistant is enough' },
      {
        type: 'p',
        text: 'If you mostly want answers, drafts and ideas, a chat assistant like Grok is excellent. It is not designed to live in your Gmail, remember your contacts, or put an event on your calendar and tell you about a clash.',
      },
      { type: 'h2', text: 'What agents-hub does differently' },
      {
        type: 'ol',
        items: [
          'One agent per job. A Gmail agent, a Calendar agent, a Tasks agent, a Docs agent that makes real PDFs, Word and Excel files, and a Maps agent for places, routes and metro journeys.',
          'It works in your real accounts. You sign in with Google once; agents read and write where your work already is.',
          'It waits for you. A burst buffer holds the reply until you finish typing, so three quick messages get one answer.',
          'You stay in control. The AI can draft an email; only your tap on Send sends it. Files go to a folder in your own Google Drive.',
          'Priced per agent. Unlock only what you use, in rupees, for 30 days at a time.',
        ],
      },
      { type: 'h2', text: 'Who should pick which' },
      {
        type: 'ul',
        items: [
          'Pick a chat assistant if you want a thinking partner in a chat window.',
          'Pick a text-message assistant if you want one general helper inside your texting app.',
          'Pick agents-hub if you want your email, calendar, tasks and documents handled by agents that act in your own Google account, in a Telegram group or a phone app, with a human tap before anything leaves.',
        ],
      },
      {
        type: 'quote',
        text: 'The best AI assistant is the one that finishes the job in the tools you already use.',
      },
      {
        type: 'p',
        text: 'agents-hub is in early access at agentshub.thekush.codes. The rest of this series explains how each part was built, with the numbers.',
      },
    ],
  },
];
