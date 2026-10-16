type DiagramKind = 'hexpilot' | 'enterprise-ai-assistant' | 'uem-compliance';

const diagrams = {
  hexpilot: {
    caption:
      'Conceptual relationships between retrieval, agent workflows, and tools. This is not an execution trace or a deployment topology.',
    nodes: [
      {
        title: 'Retrieval',
        detail: 'BM25 + vector search',
        note: 'FAISS · cross-encoder reranking · ONNX-based embeddings',
      },
      {
        title: 'Agent workflows',
        detail: 'LangGraph + ReAct',
        note: 'LangChain · source-aware routing · contextual answers',
      },
      {
        title: 'Tool access',
        detail: 'MCP integration',
        note: 'PostgreSQL-backed tools · device information retrieval',
      },
    ],
    foundation: 'FastAPI · React · Docker · Google Cloud Run',
  },
  'enterprise-ai-assistant': {
    caption:
      'Generalized capability map of professional work at Hexnode. Connections indicate related capabilities, not proprietary service boundaries or a fixed execution order.',
    nodes: [
      {
        title: 'Knowledge retrieval',
        detail: 'Custom chunking + hybrid search',
        note: 'FAISS · Qdrant',
      },
      {
        title: 'Agent assistance',
        detail: 'LangGraph ReAct agents',
        note: 'LangChain · OpenAI APIs',
      },
      {
        title: 'Workflow support',
        detail: 'Jira integration',
        note: 'Knowledge assistance and workflow support',
      },
    ],
    foundation: 'Professional engineering work / Hexnode',
  },
  'uem-compliance': {
    caption:
      'Three distinct engineering workstreams at Hexnode. The shared line groups the work; it does not represent an internal data flow or deployment architecture.',
    nodes: [
      {
        title: 'CIS compliance',
        detail: 'Policies + automated scanning',
        note: 'Python · Django · REST APIs · PostgreSQL',
      },
      {
        title: 'Windows MDM',
        detail: 'Configuration customization',
        note: 'CSP · ADMX integrations',
      },
      {
        title: 'UEM modules',
        detail: 'Microservice-based product work',
        note: '1,000+ managed devices supported in production',
      },
    ],
    foundation: 'Enterprise endpoint management / separate workstreams',
  },
} as const;

export function ArchitectureDiagram({ kind }: { kind: DiagramKind }) {
  const diagram = diagrams[kind];
  return (
    <figure className="architecture-figure">
      <div className="figure-label">
        <span>CONCEPTUAL ENGINEERING MAP</span>
        <span aria-hidden="true">FIG. 01</span>
      </div>
      <ol className="architecture-nodes">
        {diagram.nodes.map((node, index) => (
          <li key={node.title}>
            <svg
              viewBox="0 0 56 40"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M1 20H12M44 20H55" stroke="currentColor" />
              <rect
                x="12"
                y="5"
                width="32"
                height="30"
                rx="4"
                stroke="currentColor"
              />
              {index === 0 ? (
                <path d="M19 13H37M19 20H37M19 27H30" stroke="currentColor" />
              ) : index === 1 ? (
                <path
                  d="M21 13L16 20L21 27M35 13L40 20L35 27M30 11L26 29"
                  stroke="currentColor"
                />
              ) : (
                <>
                  <circle cx="28" cy="20" r="7" stroke="currentColor" />
                  <path
                    d="M28 9V13M28 27V31M17 20H21M35 20H39"
                    stroke="currentColor"
                  />
                </>
              )}
            </svg>
            <span className="eyebrow">0{index + 1}</span>
            <h3>{node.title}</h3>
            <p>{node.detail}</p>
            <p className="architecture-note">{node.note}</p>
          </li>
        ))}
      </ol>
      <div className="architecture-foundation">
        <svg
          viewBox="0 0 600 20"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 0V10H599V0M300 10V20" stroke="currentColor" />
        </svg>
        <p>{diagram.foundation}</p>
      </div>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
