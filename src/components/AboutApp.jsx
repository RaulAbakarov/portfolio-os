export default function AboutApp() {
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
          <span className="glitch">Raul Abakarov</span>
        </div>
        <div className="about-title">Full Stack Developer</div>
        <div className="about-location">📍 Baku, Azerbaijan 🇦🇿</div>
      </div>

      <div className="about-section">
        <div className="about-section-title">About Me</div>
        <div className="about-bio">
          I turn <strong>complex ideas</strong> into elegant, user-friendly software.
          From interactive web applications to game development — I love exploring
          the full spectrum of what code can create.
          <br /><br />
          Currently working on <strong>full-stack web applications</strong> with React & TypeScript.
          Sharpening my skills in <strong>algorithms & system design</strong>.
          Building games with Python/Pygame in my spare time.
          <br /><br />
          Open to <strong>freelance projects</strong> and collaborations. Let's build something absurd together.
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-title">Quick Stats</div>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-value">25+</div>
            <div className="about-stat-label">Repositories</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value">∞</div>
            <div className="about-stat-label">Coffee Consumed</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value">847</div>
            <div className="about-stat-label">Neovim Revisions</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-title">Fun Facts</div>
        <div className="about-fun-facts">
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🔭</span>
            <span>Currently building full-stack web apps with React & TypeScript at 3 AM because "one more feature" is a lifestyle.</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🎮</span>
            <span>Building games with Python/Pygame in my spare time. The FlappyBird clone was "just for practice." (I scored 847.)</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🐧</span>
            <span>I customize my Neovim config for fun. My dotfiles repo has more commits than most of my actual projects.</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">🧠</span>
            <span>Active on Codeforces and LeetCode. I solve algorithmic puzzles the way some people do crosswords — obsessively.</span>
          </div>
          <div className="about-fun-fact">
            <span className="about-fun-fact-icon">☕</span>
            <span>My blood type is technically "Cold Brew Positive." The coffee machine is a legitimate development dependency.</span>
          </div>
        </div>
      </div>

      <div className="about-section" style={{ borderBottom: 'none' }}>
        <div className="about-section-title">Current Status</div>
        <div className="about-bio" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <span style={{ color: 'var(--accent)' }}>const</span> raul = {'{'}<br />
          &nbsp;&nbsp;role: <span style={{ color: 'var(--accent-tertiary)' }}>"Full Stack Developer"</span>,<br />
          &nbsp;&nbsp;location: <span style={{ color: 'var(--accent-tertiary)' }}>"Baku, Azerbaijan"</span>,<br />
          &nbsp;&nbsp;currentFocus: <span style={{ color: 'var(--accent-tertiary)' }}>"Building scalable web apps"</span>,<br />
          &nbsp;&nbsp;communities: [<span style={{ color: 'var(--accent-tertiary)' }}>"Codeforces"</span>, <span style={{ color: 'var(--accent-tertiary)' }}>"LeetCode"</span>],<br />
          &nbsp;&nbsp;funFact: <span style={{ color: 'var(--accent-tertiary)' }}>"I customize my Neovim config for fun 🐧"</span>,<br />
          &nbsp;&nbsp;hireable: <span style={{ color: 'var(--accent)' }}>true</span>,<br />
          {'}'};
        </div>
      </div>
    </div>
  )
}
