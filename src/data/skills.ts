export const skills = [
  {
    category: 'Programming and Backend',
    items: [
      'Python',
      'SQL',
      'Django',
      'FastAPI',
      'REST APIs',
      'Microservices',
      'Pydantic',
      'SQLAlchemy',
      'Celery',
      'OpenAPI',
    ],
  },
  {
    category: 'AI, LLMs and Agents',
    items: [
      'Generative AI',
      'LLM Applications',
      'Agentic AI',
      'RAG',
      'Agentic RAG',
      'LangChain',
      'LangGraph',
      'ReAct Agents',
      'MCP',
      'Function Calling',
      'Tool Calling',
      'Prompt Engineering',
      'OpenAI APIs',
      'Gemini API',
    ],
  },
  {
    category: 'Retrieval and AI Engineering',
    items: [
      'FAISS',
      'Qdrant',
      'Vector Search',
      'Hybrid Search',
      'BM25',
      'Semantic Search',
      'Embeddings',
      'Sentence Transformers',
      'Cross-Encoder Reranking',
      'Chunking',
      'Source-Aware Retrieval',
      'ONNX Runtime',
      'Crawl4AI',
    ],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'SQLite', 'Vector Databases'],
  },
  {
    category: 'Frontend',
    items: ['React', 'AngularJS', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Cloud and DevOps',
    items: [
      'Docker',
      'AWS Lambda',
      'ECR',
      'S3',
      'Google Cloud Run',
      'Cloud Scheduler',
      'Jenkins',
      'CI/CD',
      'Git',
      'GitHub',
      'GitLab',
    ],
  },
  {
    category: 'Testing and Tools',
    items: ['Unit Testing', 'BDD (Behave)', 'Jira'],
  },
] as const satisfies readonly { category: string; items: readonly string[] }[];

export const featuredSkills = [
  'Python',
  'Django',
  'FastAPI',
  'PostgreSQL',
  'React',
  'Docker',
  'LangChain',
  'LangGraph',
] as const;

// Select from the full inventory above; no proficiency scores are implied.
export const homepageSkillGroups = [
  {
    category: 'Programming and Backend',
    selected: [
      'Python',
      'Django',
      'FastAPI',
      'REST APIs',
      'Microservices',
      'SQL',
    ],
  },
  {
    category: 'AI, LLMs and Agents',
    selected: [
      'LangChain',
      'LangGraph',
      'RAG',
      'ReAct Agents',
      'MCP',
      'OpenAI APIs',
    ],
  },
  {
    category: 'Retrieval and AI Engineering',
    selected: [
      'FAISS',
      'Qdrant',
      'Hybrid Search',
      'BM25',
      'Cross-Encoder Reranking',
      'ONNX Runtime',
    ],
  },
  {
    category: 'Databases',
    selected: ['PostgreSQL', 'SQLite', 'Vector Databases'],
  },
  { category: 'Frontend', selected: ['React', 'JavaScript', 'HTML', 'CSS'] },
  {
    category: 'Cloud and DevOps',
    selected: ['Docker', 'Google Cloud Run', 'AWS Lambda', 'CI/CD', 'Git'],
  },
  {
    category: 'Testing and Tools',
    selected: ['Unit Testing', 'BDD (Behave)', 'Jira'],
  },
] as const;
