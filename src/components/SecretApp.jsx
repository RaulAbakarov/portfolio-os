import { useLanguage } from '../i18n/LanguageContext'

export default function SecretApp() {
  const { t } = useLanguage()
  const s = t.secret

  return (
    <div className="secret-app">
      <div className="secret-header">
        {s.classified}
      </div>
      <div className="secret-content">
        <p>{s.subject} <strong style={{ color: 'var(--accent)' }}>Raul Abakarov</strong></p>
        <p>{s.classification} <span style={{ color: 'var(--danger)' }}>{s.topSecret}</span></p>
        <br />
        <p>
          {s.agentCodename} <span className="redacted">LIONNN</span>
        </p>
        <br />
        <p>
          {s.knownAliases} <span className="redacted">{s.deploysOnFridays}</span>
        </p>
        <br />
        <p>
          {s.confirmedAbilities}
        </p>
        <p>
          {s.ability1} <span className="redacted">{s.ability1Redacted}</span> {s.ability1Suffix}
        </p>
        <p>
          {s.ability2} <span className="redacted">{s.ability2Redacted}</span> {s.ability2Suffix}
        </p>
        <p>
          {s.ability3} <span className="redacted">{s.ability3Redacted}</span>{s.ability3Suffix}
        </p>
        <p>
          {s.ability4} <span className="redacted">{s.ability4Redacted}</span>
        </p>
        <p>
          {s.ability5} <span className="redacted">{s.ability5Redacted}</span>
        </p>
        <br />
        <p>
          {s.knownWeaknesses}
        </p>
        <p>
          {s.weakness1}
        </p>
        <p>
          {s.weakness2pre} <span className="redacted">{s.weakness2Redacted}</span> {s.weakness2Suffix}
        </p>
        <p>
          {s.weakness3pre} <span className="redacted">{s.weakness3Redacted}</span>
        </p>
        <p>
          {s.weakness4pre} <span className="redacted">{s.weakness4Redacted}</span> {s.weakness4Suffix}
        </p>
        <br />
        <p>
          {s.wifiPassword} <span className="redacted">{s.wifiRedacted}</span>
        </p>
        <br />
        <p style={{ color: 'var(--text-dim)', fontSize: 10, fontStyle: 'italic' }}>
          {s.hoverHint}
        </p>
        <br />
        <p style={{ color: 'var(--accent-secondary)' }}>
          🥚 {s.easterEgg}
          <br />{s.easterEgg2}
        </p>
      </div>
    </div>
  )
}
