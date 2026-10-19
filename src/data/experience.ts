import type { Experience } from '@/lib/types';

export const experience = [
  {
    company: 'Hexnode',
    role: 'Software Engineer',
    startDate: '2024-07',
    metrics: [
      { value: '1,000+', label: 'managed devices supported' },
      { value: '30%', label: 'retrieval latency reduction' },
      { value: '40%', label: 'response accuracy improvement' },
    ],
    groups: [
      {
        title: 'Agentic AI & Enterprise Knowledge Systems',
        details: [
          'Led end-to-end development of an enterprise RAG assistant using LangChain, LangGraph ReAct agents, and OpenAI APIs, with knowledge retrieval and Jira integration.',
          'Reduced retrieval latency by 30% through custom chunking and hybrid vector search with FAISS and Qdrant, while improving response accuracy by 40%.',
          'Optimized AI inference workflows using ONNX Runtime and Docker and contributed technical guidance and knowledge sharing.',
        ],
      },
      {
        title: 'Backend & Enterprise Device Management',
        details: [
          'Built Python and Django services and microservice modules for Unified Endpoint Management supporting 1,000+ managed devices in production.',
          'Implemented Windows MDM customizations with CSP and ADMX integrations, improving enterprise configuration management efficiency by 60%.',
        ],
      },
      {
        title: 'Compliance & Security Engineering',
        details: [
          'Built CIS compliance policies and automated scanning using Python, Django, REST APIs, and PostgreSQL, reducing unauthorized access risk by 25% based on internal CIS compliance benchmarks.',
        ],
      },
    ],
  },
  {
    company: 'Hexnode',
    role: 'Software Engineer Intern',
    startDate: '2024-05',
    endDate: '2024-06',
    groups: [
      {
        title: 'Backend Development',
        details: [
          'Developed and optimized backend features using Python, Django, and REST APIs.',
          'Worked with database operations, product testing, CI/CD pipelines, Git, Jira, and Agile development practices.',
        ],
      },
    ],
  },
] as const satisfies readonly Experience[];
