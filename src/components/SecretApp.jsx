export default function SecretApp() {
  return (
    <div className="secret-app">
      <div className="secret-header">
        ⚠ CLASSIFIED DOCUMENT — CLEARANCE LEVEL: DEVELOPER ⚠
      </div>
      <div className="secret-content">
        <p>SUBJECT: <strong style={{ color: 'var(--accent)' }}>Raul Abakarov</strong></p>
        <p>CLASSIFICATION: <span style={{ color: 'var(--danger)' }}>TOP SECRET</span></p>
        <br />
        <p>
          Agent codename: <span className="redacted">LIONNN</span>
        </p>
        <br />
        <p>
          Known aliases: Full Stack Developer, Code Artisan, Neovim Evangelist,
          The Guy Who <span className="redacted">Deploys on Fridays</span>
        </p>
        <br />
        <p>
          Confirmed abilities:
        </p>
        <p>
          — Can debug CSS in under <span className="redacted">3 minutes</span> (unverified)
        </p>
        <p>
          — Has memorized <span className="redacted">847</span> keyboard shortcuts
        </p>
        <p>
          — Can exit Vim (this alone makes him <span className="redacted">extremely dangerous</span>)
        </p>
        <p>
          — Once wrote a recursive function that <span className="redacted">actually terminated</span>
        </p>
        <p>
          — Survived a <span className="redacted">production deployment on a Friday at 5pm</span>
        </p>
        <br />
        <p>
          Known weaknesses:
        </p>
        <p>
          — Coffee dependency (critical vulnerability)
        </p>
        <p>
          — Will spend <span className="redacted">6 hours</span> configuring a tool to save 5 minutes
        </p>
        <p>
          — Cannot resist adding <span className="redacted">"just one more feature"</span>
        </p>
        <p>
          — The <span className="redacted">dark theme</span> — will refuse to work in light mode
        </p>
        <br />
        <p>
          WiFi password: <span className="redacted">nice_try_lol_404</span>
        </p>
        <br />
        <p style={{ color: 'var(--text-dim)', fontSize: 10, fontStyle: 'italic' }}>
          [Hover over redacted text to reveal classified information]
        </p>
        <br />
        <p style={{ color: 'var(--accent-secondary)' }}>
          🥚 Congrats! You found the easter egg. You're clearly the curious type.
          <br />That's exactly the kind of person I'd love to work with.
        </p>
      </div>
    </div>
  )
}
