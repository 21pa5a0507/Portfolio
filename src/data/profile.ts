import type { ProfilePhotoConfig, PublicUrl } from '@/lib/types';

export const profile = {
  name: 'Kishore Kattiri',
  title: 'AI Software Engineer',
  descriptor: 'AI SOFTWARE ENGINEER · BACKEND · FULL-STACK',
  seoTitle: 'Kishore Kattiri | AI Software Engineer',
  seoDescription:
    'AI Software Engineer specializing in Agentic AI, RAG, LangGraph, Python, FastAPI, and enterprise backend development. Explore my projects and engineering experience.',
  email: 'kishorekattiri@gmail.com',
  phone: '+91 9346528404',
  location: 'India',
  linkedin: 'https://linkedin.com/in/kishorekattiri' satisfies PublicUrl,
  github: 'https://github.com/21pa5a0507' satisfies PublicUrl,
  resumeUrl:
    'https://drive.google.com/file/d/1UwsJNuQzFcUEF3mdQeClUozfietVGOti/view?usp=drivesdk' satisfies PublicUrl,
  photo: {
    src: '/images/kishore-kattiri.webp',
    alt: 'Kishore Kattiri',
    width: 800,
    height: 1200,
  } satisfies ProfilePhotoConfig,
  summary:
    'AI-focused Software Engineer with 2+ years of experience developing enterprise SaaS products, backend services, and AI-powered applications.',
  introduction:
    "I'm a Software Engineer at Hexnode, developing enterprise applications and AI-powered systems. My work spans agentic workflows, retrieval-augmented generation, backend APIs, and full-stack development using Python, FastAPI, Django, React, and LangGraph.",
  about:
    "At Hexnode, I've worked on an enterprise AI assistant using LangChain, LangGraph, RAG, and tool integrations, alongside backend development for endpoint management and compliance systems.",
  aboutLead: 'Practical AI, grounded in software engineering.',
  engineeringApproach:
    'I enjoy the engineering behind AI applications: retrieving relevant context, orchestrating tools, building reliable APIs, and improving performance. My focus is on useful, maintainable systems that integrate intelligent capabilities into real software products.',
} as const;
