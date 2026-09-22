import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';

const projects = [
  { title: 'MovieFlix', description: 'An AI-powered movie discovery experience built with OpenAI APIs, delivering intelligent recommendations and a conversational search workflow.', tags: ['React', 'OpenAI APIs', 'AI recommendations', 'TMDB API'], image: '/movieflix.png', link: 'https://github.com/mittalraghav45/GPTflix', video: 'https://www.dropbox.com/scl/fi/isi8cmsa1gz9bt9glhtpf/Movie-GPT.mp4?rlkey=phz7ukvucfymrmsadnqjc0snq&st=xx29objo&dl=1' },
  { title: 'Stream Box', description: 'A modern streaming platform interface designed for browsing, discovering, and enjoying video content across devices.', tags: ['React', 'JavaScript', 'Responsive UI'], image: '/streambox.png', link: 'https://github.com/mittalraghav45/youtube', video: 'https://www.dropbox.com/scl/fi/4y3cmlvtlz41y2xjdowk9/StreamBox.mp4?rlkey=rxttpwytxa1tjr0omoubx8e6t&st=nr1vomht&dl=1' },
  { title: 'Healthcare Portal', description: 'A secure healthcare portal concept focused on clear patient workflows, accessible information, and a polished clinical experience.', tags: ['React', 'Healthcare UX', 'Responsive UI'], image: '/healthcare.png', link: 'https://github.com/mittalraghav45/EHR' },
];

const experiences = [
  { role: 'Graduate Software Developer', company: 'NHS England', period: '2024 — Present', description: 'Building accessible, reliable digital services that support better healthcare experiences.' },
  { role: 'Full Stack Developer', company: 'Freelance', period: '2022 — 2024', description: 'Designed and delivered responsive products from concept through deployment.' },
];

const skills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'AWS', 'Git', 'Figma'];
const education = [
  { degree: 'MSc Software Engineering', institution: 'University of Southampton', period: '2023 — 2024' },
  { degree: 'BSc Computer Science', institution: 'Amity University', period: '2019 — 2023' },
];

function SectionHeading({ eyebrow, title }) { return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>; }
function DemoVideo({ project }) { if (!project.video) return null; return <details className="demo-video"><summary><span aria-hidden="true">▶</span> Watch project demo</summary><video controls preload="metadata" playsInline src={project.video}><a href={project.video}>Open the project demo video</a></video></details>; }

function App() {
  return <><Analytics /><header className="site-header"><a className="brand" href="#top">RAGHAV MITTAL</a><nav aria-label="Primary navigation">{['Work', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav></header><main id="top"><section className="hero section-shell"><div className="hero-copy"><span className="eyebrow">SOFTWARE ENGINEER · BUILDER · PROBLEM SOLVER</span><h1>Building intelligent, scalable web experiences.</h1><p>I’m Raghav, a software engineer who turns complex problems into clear, useful digital products.</p><div className="hero-actions"><a className="button primary" href="#work">View selected work</a><a className="button secondary" href="/Raghav_CV.pdf">Download CV</a></div></div><div className="hero-image-wrap"><img className="hero-image" src="/profile.jpeg" alt="Raghav Mittal" /></div></section><section id="work" className="section-shell section-block"><SectionHeading eyebrow="01 / SELECTED WORK" title="Projects that solve real problems." /><div className="project-grid">{projects.map((project) => <article className="project" key={project.title}><img src={project.image} alt={`${project.title} project preview`} /><div className="project-body"><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a className="text-link" href={project.link} target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a><DemoVideo project={project} /></div></div></article>)}</div></section><section id="experience" className="section-shell section-block"><SectionHeading eyebrow="02 / EXPERIENCE" title="Learning by building." /><div className="timeline">{experiences.map((item) => <article className="timeline-item" key={`${item.role}-${item.company}`}><div><h3>{item.role}</h3><p className="muted">{item.company}</p></div><div><p className="period">{item.period}</p><p>{item.description}</p></div></article>)}</div></section><section id="skills" className="section-shell section-block"><SectionHeading eyebrow="03 / TOOLKIT" title="Tools I use to move ideas forward." /><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section><section id="education" className="section-shell section-block"><SectionHeading eyebrow="04 / EDUCATION" title="The foundation behind the work." /><div className="education-list">{education.map((item) => <article className="education-item" key={item.degree}><div><h3>{item.degree}</h3><p>{item.institution}</p></div><p className="period">{item.period}</p></article>)}</div></section><section id="contact" className="contact section-shell section-block"><SectionHeading eyebrow="05 / CONTACT" title="Have a problem worth solving?" /><p>Let’s talk about building something useful, thoughtful, and built to last.</p><a className="button primary" href="mailto:mittalraghav45@gmail.com">Get in touch</a></section></main><footer className="site-footer section-shell"><span>© {new Date().getFullYear()} Raghav Mittal</span><a href="mailto:mittalraghav45@gmail.com">mittalraghav45@gmail.com</a></footer></>;
}

export default App;

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
