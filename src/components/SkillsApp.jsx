import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const SKILL_DATA = [
  { icon: '🟨', name: 'JavaScript', subKey: 'javascript', category: 'Language', level: 95, color: 'gold' },
  { icon: '🔷', name: 'TypeScript', subKey: 'typescript', category: 'Language', level: 90, color: 'blue' },
  { icon: '🐍', name: 'Python', subKey: 'python', category: 'Language', level: 85, color: 'green' },
  { icon: '⚛️', name: 'React', subKey: 'react', category: 'Framework', level: 95, color: 'blue' },
  { icon: '🟢', name: 'Node.js', subKey: 'nodejs', category: 'Runtime', level: 90, color: 'green' },
  { icon: '🚂', name: 'Express', subKey: 'express', category: 'Framework', level: 80, color: 'green' },
  { icon: '⚡', name: 'Vite', subKey: 'vite', category: 'Tooling', level: 85, color: 'gold' },
  { icon: '🌶️', name: 'Flask', subKey: 'flask', category: 'Framework', level: 75, color: 'pink' },
  { icon: '🍃', name: 'MongoDB', subKey: 'mongodb', category: 'Database', level: 85, color: 'green' },
  { icon: '🐬', name: 'MySQL', subKey: 'mysql', category: 'Database', level: 75, color: 'blue' },
  { icon: '🐙', name: 'Git', subKey: 'git', category: 'Tool', level: 95, color: 'pink' },
  { icon: '🐳', name: 'Docker', subKey: 'docker', category: 'Tool', level: 70, color: 'blue' },
  { icon: '🌐', name: 'HTML/CSS', subKey: 'htmlcss', category: 'Language', level: 95, color: 'pink' },
  { icon: '💾', name: 'SQL', subKey: 'sql', category: 'Language', level: 75, color: 'blue' },
  { icon: '📝', name: 'Neovim', subKey: 'neovim', category: 'Editor', level: 99, color: 'green' },
  { icon: '🎮', name: 'Pygame', subKey: 'pygame', category: 'Library', level: 70, color: 'gold' },
]

export default function SkillsApp() {
  const { t } = useLanguage()
  const s = t.skills
  const [activeTab, setActiveTab] = useState('all')
  const [animate, setAnimate] = useState(false)
  const [cpuUsage, setCpuUsage] = useState(73)
  const [memUsage, setMemUsage] = useState(64)

  const TABS = [
    { id: 'all', label: s.tabAll },
    { id: 'languages', label: s.tabLanguages },
    { id: 'frameworks', label: s.tabFrameworks },
    { id: 'tools', label: s.tabTools },
  ]

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100)
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(99, prev + (Math.random() - 0.5) * 10)))
      setMemUsage(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 5)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const filtered = SKILL_DATA.filter(sk => {
    if (activeTab === 'all') return true
    if (activeTab === 'languages') return sk.category === 'Language'
    if (activeTab === 'frameworks') return ['Framework', 'Runtime', 'Library'].includes(sk.category)
    if (activeTab === 'tools') return ['Tool', 'Database', 'Editor', 'Tooling'].includes(sk.category)
    return true
  })

  return (
    <div className="skills-app">
      <div className="skills-header">
        <div className="skills-header-title">⚡ {s.headerTitle}</div>
        <div className="skills-header-stats">
          <span className="skills-header-stat">
            {s.cpu}: <span>{Math.round(cpuUsage)}%</span>
          </span>
          <span className="skills-header-stat">
            {s.memory}: <span>{Math.round(memUsage)}%</span>
          </span>
          <span className="skills-header-stat">
            {s.processes}: <span>{filtered.length}</span>
          </span>
        </div>
      </div>

      <div className="skills-tabs">
        {TABS.map(tab => (
          <div
            key={tab.id}
            className={`skills-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="skills-content">
        <div className="skills-table-header">
          <span></span>
          <span>{s.colName}</span>
          <span>{s.colType}</span>
          <span>{s.colUsage}</span>
          <span>{s.colLevel}</span>
        </div>

        {filtered.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-row fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <span className="skill-icon">{skill.icon}</span>
            <div className="skill-name">
              {skill.name}
              <small>{s.sub[skill.subKey]}</small>
            </div>
            <span className="skill-category">{s.categories[skill.category]}</span>
            <div className="skill-bar-container">
              <div
                className={`skill-bar ${skill.color}`}
                style={{ width: animate ? `${skill.level}%` : '0%' }}
              />
            </div>
            <span className="skill-level">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
