const PROJECTS = [
  {
    icon: '🌐',
    name: 'The Internet Room',
    desc: 'A minimalist shared digital room where only one visitor can be present at any given time, globally.',
    tags: ['Node.js', 'Express', 'WebSocket'],
    repo: 'https://github.com/RaulAbakarov/the_internet_room',
  },
  {
    icon: '📝',
    name: 'Affiliate Blog',
    desc: 'SEO-optimized blog platform with modern UI, responsive design, and blazing fast performance.',
    tags: ['TypeScript', 'Vite', 'CSS'],
    demo: 'https://oriflamebyvusale.vercel.app/',
    repo: 'https://github.com/RaulAbakarov/affiliate-blog',
  },
  {
    icon: '📖',
    name: 'Dictionary Web App',
    desc: 'Interactive dictionary with real-time API integration, search suggestions, and audio pronunciation.',
    tags: ['JavaScript', 'REST API', 'CSS'],
    demo: 'https://raulabakarov.github.io/DictionaryWebApp/',
    repo: 'https://github.com/RaulAbakarov/DictionaryWebApp',
  },
  {
    icon: '💹',
    name: 'Crypto Dashboard',
    desc: 'Cryptocurrency tracking dashboard with live prices, charts, and portfolio overview.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://raulabakarov.github.io/CryptoDashboard/',
    repo: 'https://github.com/RaulAbakarov/CryptoDashboard',
  },
  {
    icon: '🐦',
    name: 'FlappyBird',
    desc: 'Classic FlappyBird clone with modular architecture, smooth animations, and score tracking.',
    tags: ['Python', 'Pygame'],
    repo: 'https://github.com/RaulAbakarov/FlappyBird',
  },
  {
    icon: '🚢',
    name: 'Battleship Game',
    desc: 'Interactive browser-based Battleship with AI opponent and strategic gameplay mechanics.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    repo: 'https://github.com/RaulAbakarov/Project',
  },
  {
    icon: '🏠',
    name: 'My Blog App',
    desc: 'Full-stack blog with React frontend, Node.js backend, and content management.',
    tags: ['React', 'Node.js', 'MongoDB'],
    repo: 'https://github.com/RaulAbakarov/my-blog-app',
  },
  {
    icon: '🧪',
    name: 'Flask App',
    desc: 'Python backend application with RESTful API endpoints and database integration.',
    tags: ['Python', 'Flask', 'SQLite'],
    repo: 'https://github.com/RaulAbakarov/my-flask-app',
  },
  {
    icon: '💪',
    name: 'Gym Website',
    desc: 'Responsive fitness website with modern design, class schedules, and membership plans.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://raulabakarov.github.io/GymWebsite/',
    repo: 'https://github.com/RaulAbakarov/GymWebsite',
  },
  {
    icon: '🧘',
    name: 'Breath Meditation',
    desc: 'Calming meditation web app with breathing exercises and ambient sound.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://raulabakarov.github.io/BreathMeditationWebsite/',
    repo: 'https://github.com/RaulAbakarov/BreathMeditationWebsite',
  },
  {
    icon: '🧩',
    name: 'Codeforces Solutions',
    desc: 'Competitive programming solutions in Python. Algorithm battles and optimization glory.',
    tags: ['Python', 'Algorithms', 'CP'],
    repo: 'https://github.com/RaulAbakarov/codeforces',
  },
]

export default function ProjectsApp() {
  return (
    <div className="projects-app">
      <div className="projects-toolbar">
        <span>📁</span>
        <div className="projects-path">
          <span>C:\</span>Users\Raul\<span>Projects</span>
        </div>
        <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>
          {PROJECTS.length} items
        </span>
      </div>
      <div className="projects-list">
        {PROJECTS.map((project, i) => (
          <div key={i} className="project-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="project-card-header">
              <span className="project-card-icon">{project.icon}</span>
              <div className="project-card-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
                    onClick={e => e.stopPropagation()}
                  >
                    Demo ↗
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
                    onClick={e => e.stopPropagation()}
                  >
                    Code ↗
                  </a>
                )}
              </div>
            </div>
            <h3>{project.name}</h3>
            <p>{project.desc}</p>
            <div className="project-card-tags">
              {project.tags.map((tag, j) => (
                <span key={j} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
