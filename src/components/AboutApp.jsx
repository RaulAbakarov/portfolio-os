import { useLanguage } from '../i18n/LanguageContext'

export default function AboutApp() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <div className="about-app">
      <div className="about-hero">
        <div className="about-avatar">
          <img
            src="https://avatars.githubusercontent.com/u/130228615?v=4&s=160"
            alt="Raul Abakarov"
            loading="lazy"
            width="120"
            height="120"
          />
          <div className="about-avatar-ring" />
        </div>
        <div className="about-name">
          <span className="glitch">{a.name}</span>
        </div>
        <div className="about-title">{a.title}</div>
        <div className="about-location">📍 {a.location} 🇦🇿</div>
      </div>

      <div className="about-section">
        <div className="about-section-title">{a.sectionAbout}</div>
        <div className="about-bio">
          <span dangerouslySetInnerHTML={{ __html: a.bio1 }} />
          <br /><br />
          <span dangerouslySetInnerHTML={{ __html: a.bio2 }} />
          <br /><br />
          <span dangerouslySetInnerHTML={{ __html: a.bio3 }} />
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-title">{a.quickStats}</div>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-value">25+</div>
            <div className="about-stat-label">{a.repositories}</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value">∞</div>
            <div className="about-stat-label">{a.coffeeConsumed}</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value">847</div>
            <div className="about-stat-label">{a.neovimRevisions}</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-title">{a.funFacts}</div>
        <div className="about-fun-facts">
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🔭</span>
            <span>{a.funFact1}</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🎮</span>
            <span>{a.funFact2}</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🐧</span>
            <span>{a.funFact3}</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🧠</span>
            <span>{a.funFact4}</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">☕</span>
            <span>{a.funFact5}</span>
          </div>
        </div>
      </div>

      <div className="about-section" style={{ borderBottom: 'none' }}>
        <div className="about-section-title">{a.currentStatus}</div>
        <div className="about-bio" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <span style={{ color: 'var(--accent)' }}>const</span> raul = {'{'}<br />
          &nbsp;&nbsp;role: <span style={{ color: 'var(--accent-tertiary)' }}>{a.codeRole}</span>,<br />
          &nbsp;&nbsp;location: <span style={{ color: 'var(--accent-tertiary)' }}>{a.codeLocation}</span>,<br />
          &nbsp;&nbsp;currentFocus: <span style={{ color: 'var(--accent-tertiary)' }}>{a.codeFocus}</span>,<br />
          &nbsp;&nbsp;communities: [<span style={{ color: 'var(--accent-tertiary)' }}>"Codeforces"</span>, <span style={{ color: 'var(--accent-tertiary)' }}>"LeetCode"</span>],<br />
          &nbsp;&nbsp;funFact: <span style={{ color: 'var(--accent-tertiary)' }}>{a.codeFunFact}</span>,<br />
          &nbsp;&nbsp;hireable: <span style={{ color: 'var(--accent)' }}>true</span>,<br />
          {'}'};
        </div>
      </div>
    </div>
  )
}
