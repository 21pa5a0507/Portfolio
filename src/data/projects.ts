import type { Project } from '@/lib/types';

export const projects: readonly Project[] = [
  {
    slug: 'hexpilot',
    title: 'HexPilot — Agentic AI & Enterprise Workflow Automation',
    category: 'Personal AI Engineering Project',
    context: 'personal',
    featured: true,
    description:
      'A personal AI engineering project combining hybrid document retrieval, LangGraph agent workflows, reranking, and MCP-enabled device data access in a FastAPI and React application.',
    technologies: [
      'FastAPI',
      'LangChain',
      'LangGraph',
      'FAISS',
      'React',
      'Docker',
    ],
    implementation: [
      'LangGraph and ReAct agent workflows',
      'Hybrid retrieval using BM25 and vector search',
      'Cross-encoder reranking',
      'ONNX-based embeddings',
      'Source-aware retrieval routing',
      'Multi-source contextual question answering',
      'MCP integration with PostgreSQL-backed tools',
      'Device information retrieval through agent tools',
      'Google Cloud Run deployment',
      'Docker containerization',
    ],
    outcomes: ['Built and shipped a GenAI knowledge platform.'],
    demoUrl: 'https://ai-doc-copilot-iota.vercel.app/',
    // Private repository: intentionally no repository URL.
  },
  {
    slug: 'enterprise-ai-assistant',
    title: 'Enterprise AI Assistant',
    category: 'Production AI Engineering — Hexnode',
    context: 'professional',
    featured: false,
    description:
      'A professional case study covering retrieval optimization, agent orchestration, and enterprise tool integration, using generalized architecture without proprietary details.',
    technologies: ['LangChain', 'LangGraph', 'OpenAI APIs', 'FAISS', 'Qdrant'],
    implementation: [
      'End-to-end assistant development',
      'ReAct agent workflows',
      'Knowledge retrieval and Jira integration',
      'Custom chunking and hybrid vector search',
    ],
    outcomes: [
      '30% reduction in retrieval latency',
      '40% improvement in response accuracy',
    ],
  },
  {
    slug: 'uem-compliance',
    title: 'Enterprise UEM and Compliance Engineering',
    category: 'Backend Engineering — Hexnode',
    context: 'professional',
    featured: false,
    description:
      'Production backend development involving Windows MDM, CIS compliance, and enterprise device management services.',
    technologies: [
      'Python',
      'Django',
      'REST APIs',
      'PostgreSQL',
      'Windows MDM',
    ],
    implementation: [
      'CIS compliance policies and automated scanning',
      'Windows MDM customization using CSP and ADMX',
      'Microservice-based product modules',
    ],
    outcomes: [
      'Supported 1,000+ managed devices in production',
      '25% reduction in unauthorized access risk based on internal CIS compliance benchmarks',
      '60% improvement in enterprise configuration management efficiency',
    ],
  },
];
