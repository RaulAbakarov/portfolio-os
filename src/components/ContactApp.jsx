export default function ContactApp() {
  const contacts = [
    {
      icon: '📧',
      name: 'Email',
      detail: 'raulabakarov@outlook.com',
      link: 'mailto:raulabakarov@outlook.com',
    },
    {
      icon: '🐙',
      name: 'GitHub',
      detail: 'github.com/RaulAbakarov',
      link: 'https://github.com/RaulAbakarov',
    },
    {
      icon: '💼',
      name: 'LinkedIn',
      detail: 'linkedin.com/in/raulabakarov',
      link: 'https://www.linkedin.com/in/raulabakarov',
    },
    {
      icon: '📊',
      name: 'LeetCode',
      detail: 'leetcode.com/lionnn',
      link: 'https://leetcode.com/lionnn',
    },
  ]

  return (
    <div className="contact-app">
      <div className="contact-sidebar">
        <a
          href="mailto:raulabakarov@outlook.com"
          className="contact-compose-btn"
          style={{ textDecoration: 'none' }}
        >
          ✉️ Compose New Message
        </a>
      </div>

      <div className="contact-body">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="contact-card-icon">{c.icon}</div>
            <div className="contact-card-info">
              <h4>{c.name}</h4>
              <p>{c.detail}</p>
            </div>
          </a>
        ))}

        <div className="contact-quote fade-in" style={{ animationDelay: '0.4s' }}>
          "First, solve the problem. Then, write the code."
          <span className="contact-quote-author">— John Johnson</span>
        </div>

        <div className="contact-quote fade-in" style={{ animationDelay: '0.5s' }}>
          "I'm always open to interesting conversations, collaborations, and new opportunities.
          Whether you have a project in mind or just want to talk code — let's connect."
          <span className="contact-quote-author">— Raul Abakarov</span>
        </div>
      </div>
    </div>
  )
}
