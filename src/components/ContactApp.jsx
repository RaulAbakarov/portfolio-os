import { useLanguage } from '../i18n/LanguageContext'

export default function ContactApp() {
  const { t } = useLanguage()
  const c = t.contact

  const contacts = [
    { icon: '📧', name: 'Email', detail: 'raulabakarov@outlook.com', link: 'mailto:raulabakarov@outlook.com' },
    { icon: '🐙', name: 'GitHub', detail: 'github.com/RaulAbakarov', link: 'https://github.com/RaulAbakarov' },
    { icon: '💼', name: 'LinkedIn', detail: 'linkedin.com/in/raulabakarov', link: 'https://www.linkedin.com/in/raulabakarov' },
    { icon: '📊', name: 'LeetCode', detail: 'leetcode.com/lionnn', link: 'https://leetcode.com/lionnn' },
  ]

  return (
    <div className="contact-app">
      <div className="contact-sidebar">
        <a
          href="mailto:raulabakarov@outlook.com"
          className="contact-compose-btn"
          style={{ textDecoration: 'none' }}
        >
          ✉️ {c.composeNewMessage}
        </a>
      </div>

      <div className="contact-body">
        {contacts.map((ct, i) => (
          <a
            key={i}
            href={ct.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="contact-card-icon">{ct.icon}</div>
            <div className="contact-card-info">
              <h4>{ct.name}</h4>
              <p>{ct.detail}</p>
            </div>
          </a>
        ))}

        <div className="contact-quote fade-in" style={{ animationDelay: '0.4s' }}>
          {c.quote1}
          <span className="contact-quote-author">{c.quote1Author}</span>
        </div>

        <div className="contact-quote fade-in" style={{ animationDelay: '0.5s' }}>
          {c.quote2}
          <span className="contact-quote-author">{c.quote2Author}</span>
        </div>
      </div>
    </div>
  )
}
