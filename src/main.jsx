import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const healthcareThumbnail = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85';

const projects = [
  {
    title: 'Healthcare Portal',
    description: 'A secure healthcare portal concept for managing patient information, appointments, and communication.',
    image: healthcareThumbnail,
    tags: ['React', 'Healthcare', 'Security'],
    link: '#',
  },
  {
    title: 'MovieFlix',
    description: 'A responsive movie discovery experience with searchable content and a clean viewing interface.',
    video: '/videos/movieflix.mp4',
    tags: ['React', 'API', 'UI/UX'],
    link: '#',
  },
  {
    title: 'Stream Box',
    description: 'A streaming interface concept focused on content browsing and modern media presentation.',
    video: '/videos/stream-box.mp4',
    tags: ['React', 'JavaScript', 'CSS'],
    link: '#',
  },
];

function ProjectMedia({ project }) {
  if (project.video) {
    return (
      <video className="project-video" controls preload="metadata" aria-label={`${project.title} preview`}>
        <source src={project.video} type="video/mp4" />
        Your browser does not support video playback.
      </video>
    );
  }

  return <img className="project-image" src={project.image} alt={`${project.title} thumbnail`} loading="lazy" />;
}

function App() {
  return (
    <main>
      <section className="projects" id="projects">
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <ProjectMedia project={project} />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {project.link !== '#' && <a href={project.link}>View project</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
