export type ProjectCategory = 'AI Agents' | 'Trading Bots' | 'Web Apps' | 'Web3';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  detail: string;
  status: 'Featured' | 'Exploring';
  accent: string;
  index: string;
  link?: string;
};

export const discordDestination = '';
// Future audio asset location. Nothing is loaded or played until an asset is added.
export const audioAssetPath = '/audio/future/breeze-ambient.mp3';

export const portfolio = {
  name: 'Breeze',
  role: 'AI Engineer & Full-Stack Developer',
  location: 'Somewhere between signal and noise.',
  bio: 'I’m Breeze, an AI Engineer and Full Stack Developer. I build AI agents, trading systems, modern web apps, and Web3 products that solve real-world problems. I’ve got a bad habit of getting obsessed with problems. I don’t let them go until there’s something fast, useful, and something I’d actually use myself.',
  projects: [
    {
      id: 'gizmo',
      title: 'Gizmo',
      category: 'AI Agents',
      eyebrow: 'Crypto intelligence, explained naturally',
      description: 'An AI-powered crypto intelligence agent that analyzes lead-lag relationships between digital assets and explains market behavior in natural language.',
      detail: 'Gizmo interprets market data across supported crypto assets, identifies lead-lag relationships across pairs, and lets people ask conversational questions about what the market is doing.',
      status: 'Featured',
      accent: '#d5ff65',
      index: '01',
      link: 'https://gizmo-user-interface.vercel.app/',
    },
    {
      id: 'agentforge',
      title: 'AgentForge',
      category: 'AI Agents',
      eyebrow: 'AI agent marketplace on BNB Smart Chain',
      description: 'An ERC-8004 agent marketplace for BNB Smart Chain Testnet where people can discover agents, verify identity and capabilities, review permissions, authorize actions, and execute on-chain tasks.',
      detail: 'AgentForge is built around a verifiable agent lifecycle: discover → verify identity and capability → connect wallet → review permissions → authorize → execute → verify on-chain → persist → recover after refresh. It uses Agent0 / GraphQL for discovery, ERC-8004 for agent identity, and ERC-8183 for agentic commerce execution on BSC Testnet.',
      status: 'Featured',
      accent: '#d5ff65',
      index: '02',
      link: 'https://agent-forge-beige.vercel.app/',
    },
    {
      id: 'known',
      title: 'Known',
      category: 'AI Agents',
      eyebrow: 'Customer memory for AI systems',
      description: 'An AI customer-memory system that turns inboxes and customer history into structured, usable context for intelligent customer interactions.',
      detail: 'Known connects customer data sources such as Gmail and order-history CSVs, transforms them into structured customer profiles, and gives AI systems persistent memory they can use to understand customers and respond with relevant context instead of starting from zero every time.',
      status: 'Featured',
      accent: '#d5ff65',
      index: '03',
    },
    {
      id: 'polymarket',
      title: 'Polymarket Prediction Bot',
      category: 'Trading Bots',
      eyebrow: 'Trading bot / details to follow',
      description: 'A project slot for a Polymarket prediction bot. The project details are intentionally editable placeholders until the work is documented.',
      detail: 'Replace this copy with the real problem, solution, features, stack, links, media, and results when they are ready. No technical claims are invented here.',
      status: 'Featured',
      accent: '#82d8ff',
      index: '01',
    },
    {
      id: 'trading-02',
      title: 'Untitled / 02',
      category: 'Trading Bots',
      eyebrow: 'Signal / patience',
      description: 'A future system with no convenient numbers attached.',
      detail: 'This is a placeholder for a trading idea that deserves to be real before it deserves to be described.',
      status: 'Exploring',
      accent: '#d5ff65',
      index: '02',
    },
    {
      id: 'trading-03',
      title: 'Untitled / 03',
      category: 'Trading Bots',
      eyebrow: 'The edge is in the details',
      description: 'A blank canvas for the next market experiment.',
      detail: 'No promises here. Only the question, the data, and the stubbornness to stay with it.',
      status: 'Exploring',
      accent: '#f3bd73',
      index: '03',
    },
    {
      id: 'web-01',
      title: 'Untitled / 01',
      category: 'Web Apps',
      eyebrow: 'Interface under construction',
      description: 'A modern web app waiting for the right problem.',
      detail: 'The web is a medium I return to for its speed: an idea can become something you can touch in an afternoon.',
      status: 'Exploring',
      accent: '#b6a2ff',
      index: '01',
    },
    {
      id: 'web-02',
      title: 'Untitled / 02',
      category: 'Web Apps',
      eyebrow: 'Useful first, pretty second',
      description: 'A future tool with a clean surface and a sharp purpose.',
      detail: 'There is a special joy in removing one small daily frustration with a well-made screen.',
      status: 'Exploring',
      accent: '#82d8ff',
      index: '02',
    },
    {
      id: 'web-03',
      title: 'Untitled / 03',
      category: 'Web Apps',
      eyebrow: 'A little more considered',
      description: 'Another open slot for something worth using.',
      detail: 'A placeholder, not a claim. The work will arrive when it can say something true.',
      status: 'Exploring',
      accent: '#ff9d8d',
      index: '03',
    },
    {
      id: 'web3-01',
      title: 'Untitled / 01',
      category: 'Web3',
      eyebrow: 'Beyond the wallet connect',
      description: 'A future product for people, not just protocols.',
      detail: 'The bar is simple: the technology should disappear into the usefulness of the thing.',
      status: 'Exploring',
      accent: '#f3bd73',
      index: '01',
    },
    {
      id: 'web3-02',
      title: 'Untitled / 02',
      category: 'Web3',
      eyebrow: 'Still investigating',
      description: 'Somewhere in the space between trust and interaction.',
      detail: 'This slot stays intentionally neutral until there is a product on the other side of the question.',
      status: 'Exploring',
      accent: '#b6a2ff',
      index: '02',
    },
    {
      id: 'web3-03',
      title: 'Untitled / 03',
      category: 'Web3',
      eyebrow: 'One more open thread',
      description: 'A future Web3 product waiting for the right problem.',
      detail: 'No inflated case study here. This slot stays open until there is a real product worth showing.',
      status: 'Exploring',
      accent: '#82d8ff',
      index: '03',
    },
  ] satisfies Project[],
  categories: ['AI Agents', 'Trading Bots', 'Web Apps', 'Web3'] satisfies ProjectCategory[],
  skills: ['Agent architecture', 'LLM systems', 'TypeScript', 'React', 'Python', 'Trading logic', 'Product thinking', 'Web3'],
};
