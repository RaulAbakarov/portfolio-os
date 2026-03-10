import { useLanguage } from '../i18n/LanguageContext'

const PROJECTS = [
  { icon: '🎓', name: 'Semestr Bali', descKey: 'semestrBali', tags: ['React', 'Vite', 'CSS'], demo: 'https://www.semestrbali.site/', repo: 'https://github.com/RaulAbakarov/semestr-bali' },
  { icon: '📝', name: 'Affiliate Blog', descKey: 'affiliateBlog', tags: ['TypeScript', 'Vite', 'CSS'], demo: 'https://oriflamebyvusale.vercel.app/', repo: 'https://github.com/RaulAbakarov/affiliate-blog' },
  { icon: '📖', name: 'Dictionary Web App', descKey: 'dictionaryApp', tags: ['JavaScript', 'REST API', 'CSS'], demo: 'https://raulabakarov.github.io/DictionaryWebApp/', repo: 'https://github.com/RaulAbakarov/DictionaryWebApp' },
  { icon: '💹', name: 'Crypto Dashboard', descKey: 'cryptoDashboard', tags: ['HTML', 'CSS', 'JavaScript'], demo: 'https://raulabakarov.github.io/CryptoDashboard/', repo: 'https://github.com/RaulAbakarov/CryptoDashboard' },
  { icon: '🐦', name: 'FlappyBird', descKey: 'flappyBird', tags: ['Python', 'Pygame'], repo: 'https://github.com/RaulAbakarov/FlappyBird' },
  { icon: '🚢', name: 'Battleship Game', descKey: 'battleship', tags: ['JavaScript', 'HTML', 'CSS'], demo: 'https://raulabakarov.github.io/Project/', repo: 'https://github.com/RaulAbakarov/Project' },
  { icon: '💪', name: 'Gym Website', descKey: 'gymWebsite', tags: ['HTML', 'CSS', 'JavaScript'], demo: 'https://raulabakarov.github.io/GymWebsite/', repo: 'https://github.com/RaulAbakarov/GymWebsite' },
  { icon: '🧘', name: 'Breath Meditation', descKey: 'breathMeditation', tags: ['HTML', 'CSS', 'JavaScript'], demo: 'https://raulabakarov.github.io/BreathMeditationWebsite/', repo: 'https://github.com/RaulAbakarov/BreathMeditationWebsite' },
  { icon: '🧩', name: 'Codeforces Solutions', descKey: 'codeforces', tags: ['Python', 'Algorithms', 'CP'], repo: 'https://github.com/RaulAbakarov/codeforces' },
]

export default function ProjectsApp() {
  const { t } = useLanguage()
  const p = t.projects

  return (
    <div className="projects-app">
      <div className="projects-toolbar">
        <span>📁</span>
        <div className="projects-path">
          <span>C:\</span>Users\Raul\<span>Projects</span>
        </div>
        <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>
          {PROJECTS.length} {p.items}
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
                    {p.demo}
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
                    {p.code}
                  </a>
                )}
              </div>
            </div>
            <h3>{project.name}</h3>
            <p>{p.desc[project.descKey]}</p>
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
