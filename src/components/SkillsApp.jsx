import { useState, useEffect } from 'react'

const SKILL_DATA = {
  all: [
    { icon: '🟨', name: 'JavaScript', sub: 'ES2024+', category: 'Language', level: 95, color: 'gold' },
    { icon: '🔷', name: 'TypeScript', sub: 'Strict mode enthusiast', category: 'Language', level: 90, color: 'blue' },
    { icon: '🐍', name: 'Python', sub: 'Snakes & scripts', category: 'Language', level: 85, color: 'green' },
    { icon: '⚛️', name: 'React', sub: 'Hooks all day', category: 'Framework', level: 95, color: 'blue' },
    { icon: '🟢', name: 'Node.js', sub: 'Event loop go brr', category: 'Runtime', level: 90, color: 'green' },
    { icon: '🚂', name: 'Express', sub: 'The OG framework', category: 'Framework', level: 80, color: 'green' },
    { icon: '⚡', name: 'Vite', sub: 'Blazingly fast™', category: 'Tooling', level: 85, color: 'gold' },
    { icon: '🌶️', name: 'Flask', sub: 'Micro but mighty', category: 'Framework', level: 75, color: 'pink' },
    { icon: '🍃', name: 'MongoDB', sub: 'NoSQL vibes', category: 'Database', level: 85, color: 'green' },
    { icon: '🐬', name: 'MySQL', sub: 'Relational realness', category: 'Database', level: 75, color: 'blue' },
    { icon: '🐙', name: 'Git', sub: 'Force push Friday', category: 'Tool', level: 95, color: 'pink' },
    { icon: '🐳', name: 'Docker', sub: 'Works on my machine™', category: 'Tool', level: 70, color: 'blue' },
    { icon: '🌐', name: 'HTML/CSS', sub: 'Pixel-perfect artisan', category: 'Language', level: 95, color: 'pink' },
    { icon: '💾', name: 'SQL', sub: 'SELECT * FROM skills', category: 'Language', level: 75, color: 'blue' },
    { icon: '📝', name: 'Neovim', sub: '847th config revision', category: 'Editor', level: 99, color: 'green' },
    { icon: '🎮', name: 'Pygame', sub: 'Game dev for fun', category: 'Library', level: 70, color: 'gold' },
  ],
}

const TABS = [
  { id: 'all', label: 'All Processes' },
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'tools', label: 'Tools' },
]

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState('all')
  const [animate, setAnimate] = useState(false)
  const [cpuUsage, setCpuUsage] = useState(73)
  const [memUsage, setMemUsage] = useState(64)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100)
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(99, prev + (Math.random() - 0.5) * 10)))
      setMemUsage(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 5)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const filtered = SKILL_DATA.all.filter(s => {
    if (activeTab === 'all') return true
    if (activeTab === 'languages') return s.category === 'Language'
    if (activeTab === 'frameworks') return ['Framework', 'Runtime', 'Library'].includes(s.category)
    if (activeTab === 'tools') return ['Tool', 'Database', 'Editor', 'Tooling'].includes(s.category)
    return true
  })

  return (
    <div className="skills-app">
      <div className="skills-header">
        <div className="skills-header-title">⚡ Task Manager — Skills Monitor</div>
        <div className="skills-header-stats">
          <span className="skills-header-stat">
            CPU: <span>{Math.round(cpuUsage)}%</span>
          </span>
          <span className="skills-header-stat">
            Memory: <span>{Math.round(memUsage)}%</span>
          </span>
          <span className="skills-header-stat">
            Processes: <span>{filtered.length}</span>
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
          <span>Name</span>
          <span>Type</span>
          <span>Usage</span>
          <span>Level</span>
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
              <small>{skill.sub}</small>
            </div>
            <span className="skill-category">{skill.category}</span>
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
