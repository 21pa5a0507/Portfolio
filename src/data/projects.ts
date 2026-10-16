import type { Project } from '@/lib/types';

export const projects: readonly Project[] = [
  {
    slug: 'hexpilot',
    title: 'HexPilot — Agentic GenAI RAG Platform',
    category: 'Personal GenAI Research Project',
    context: 'personal',
    featured: true,
    description:
      'A shipped GenAI knowledge platform for document retrieval, knowledge assistance, and workflow automation.',
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
    // Private repository: intentionally no repository URL. Add demoUrl when supplied.
  },
  {
    slug: 'enterprise-ai-assistant',
    title: 'Enterprise AI Assistant',
    category: 'Professional Engineering Work — Hexnode',
    context: 'professional',
    featured: false,
    description:
      'An enterprise knowledge retrieval and workflow-support assistant with Jira integration.',
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
    category: 'Professional Engineering Work — Hexnode',
    context: 'professional',
    featured: false,
    description:
      'Enterprise backend work across CIS compliance, Windows MDM configuration, and UEM product modules.',
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
