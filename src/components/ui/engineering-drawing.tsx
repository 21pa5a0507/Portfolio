import { useId } from 'react';

export function EngineeringDrawing({
  variant = 'systems',
}: {
  variant?: 'systems' | 'retrieval' | 'endpoint';
}) {
  const gridId = useId();
  const retrieval = variant === 'retrieval';
  const endpoint = variant === 'endpoint';
  // Conceptual disciplines and workflows only; not an employer infrastructure diagram.
  const labels = endpoint
    ? ['POLICIES', 'SCANNING', 'ENDPOINTS']
    : retrieval
      ? ['SOURCES', 'RETRIEVAL', 'ASSISTANCE']
      : ['BACKEND', 'PRODUCT', 'INTELLIGENCE'];
  return (
    <svg
      className={`engineering-drawing drawing-${variant}`}
      viewBox="0 0 460 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={gridId}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path d="M24 0H0V24" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect
        x="1"
        y="1"
        width="458"
        height="358"
        fill={`url(#${gridId})`}
        className="drawing-grid"
      />
      <g className="drawing-guides" stroke="currentColor" strokeWidth="0.7">
        <path d="M24 38H436M24 322H436M42 20V340M418 20V340" />
        <path d="M36 32L48 44M48 32L36 44M412 316L424 328M424 316L412 328" />
      </g>
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M118 119V180H230M342 119V180H230M230 180V242" />
        <circle cx="230" cy="180" r="5" className="drawing-junction" />
        <path d="M224 227L230 233L236 227" />
      </g>
      <g className="drawing-node">
        <rect x="60" y="65" width="116" height="70" rx="8" />
        <rect x="284" y="65" width="116" height="70" rx="8" />
        <rect x="144" y="242" width="172" height="62" rx="8" />
      </g>
      <g stroke="currentColor" strokeWidth="1.4">
        <rect x="104" y="80" width="28" height="9" rx="2" />
        <rect x="104" y="94" width="28" height="9" rx="2" />
        <circle cx="109" cy="84.5" r="0.7" />
        <circle cx="109" cy="98.5" r="0.7" />
        {endpoint ? (
          <path d="M342 78L355 83V94Q352 102 342 106Q332 102 329 94V83Z M337 92L341 96L348 87" />
        ) : (
          <>
            <rect x="329" y="79" width="26" height="25" rx="3" />
            <path d="M334 86H350M334 92H346M334 98H342" />
          </>
        )}
        <path d="M217 263L223 269L217 275M243 263L237 269L243 275M232 260L228 278" />
      </g>
      <g fill="currentColor" className="drawing-label" textAnchor="middle">
        <text x="118" y="121">
          {labels[0]}
        </text>
        <text x="342" y="121">
          {labels[1]}
        </text>
        <text x="230" y="293">
          {labels[2]}
        </text>
      </g>
      <g fill="currentColor" className="drawing-annotation">
        <text x="57" y="203">
          01
        </text>
        <text x="362" y="203">
          02
        </text>
        <text x="248" y="219">
          03
        </text>
        <text x="58" y="344">
          CONCEPT /{' '}
          {endpoint
            ? 'DEVICE MANAGEMENT'
            : retrieval
              ? 'KNOWLEDGE WORKFLOW'
              : 'CONNECTED DISCIPLINES'}
        </text>
      </g>
    </svg>
  );
}
