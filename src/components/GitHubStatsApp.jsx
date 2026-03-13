import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const USERNAME = 'RaulAbakarov'

export default function GitHubStatsApp() {
  const { t } = useLanguage()
  const g = t.github
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchStats() {
      try {
        const [userRes, reposRes, commitsRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { signal: controller.signal }),
          fetch(`https://api.github.com/search/commits?q=author:${USERNAME}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github.cloak-preview+json' },
          }),
          fetch(`https://api.github.com/users/${USERNAME}/events?per_page=100`, { signal: controller.signal }),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('API error')

        const user = await userRes.json()
        const repos = await reposRes.json()

        // Total commits from search API
        let totalCommits = 0
        if (commitsRes.ok) {
          const commitsData = await commitsRes.json()
          totalCommits = commitsData.total_count || 0
        }

        // Contribution activity from events
        let totalContributions = 0
        let recentEvents = []
        if (eventsRes.ok) {
          const events = await eventsRes.json()
          recentEvents = events

          for (const ev of events) {
            if (ev.type === 'PushEvent') {
              totalContributions += ev.payload?.commits?.length || 0
            } else if (['CreateEvent', 'PullRequestEvent', 'IssuesEvent', 'PullRequestReviewEvent'].includes(ev.type)) {
              totalContributions += 1
            }
          }
        }

        // Count PRs and issues from events
        const prsOpened = recentEvents.filter(e => e.type === 'PullRequestEvent' && e.payload?.action === 'opened').length
        const issuesOpened = recentEvents.filter(e => e.type === 'IssuesEvent' && e.payload?.action === 'opened').length

        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
        const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

        const langMap = {}
        for (const r of repos) {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1
          }
        }
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
        const langTotal = topLangs.reduce((s, [, c]) => s + c, 0)

        // Build contribution graph from push events (last 30 days)
        const now = new Date()
        const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
        const dayMap = {}
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now - i * 24 * 60 * 60 * 1000)
          dayMap[d.toISOString().slice(0, 10)] = 0
        }
        for (const ev of recentEvents) {
          if (ev.type === 'PushEvent') {
            const day = ev.created_at?.slice(0, 10)
            if (day && day in dayMap) {
              dayMap[day] += ev.payload?.commits?.length || 0
            }
          }
        }
        const contributionGraph = Object.entries(dayMap).map(([date, count]) => ({ date, count }))

        setData({
          avatar: user.avatar_url,
          name: user.name || USERNAME,
          bio: user.bio,
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalStars,
          totalForks,
          totalCommits,
          totalContributions,
          prsOpened,
          issuesOpened,
          topLangs,
          langTotal,
          contributionGraph,
          recentRepos: repos.slice(0, 5),
          createdAt: new Date(user.created_at).getFullYear(),
        })
      } catch (e) {
        if (e.name !== 'AbortError') setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    return () => controller.abort()
  }, [])

  if (loading) {
    return (
      <div className="github-stats-app">
        <div className="github-loading">
          <div className="github-loading-spinner" />
          <span>{g.fetching}</span>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="github-stats-app">
        <div className="github-error">
          <span>⚠️ {g.error}</span>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
            {g.viewOnGithub}
          </a>
        </div>
      </div>
    )
  }

  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Jupyter: '#DA5B0B',
    C: '#555555',
    'C++': '#f34b7d',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
  }

  return (
    <div className="github-stats-app">
      {/* Header */}
      <div className="github-header">
        <img src={data.avatar} alt={data.name} className="github-avatar" width="64" height="64" />
        <div className="github-header-info">
          <div className="github-username">{data.name}</div>
          <a
            className="github-handle"
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{USERNAME}
          </a>
          {data.bio && <div className="github-bio">{data.bio}</div>}
          <div className="github-member-since">{g.memberSince} {data.createdAt}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="github-stats-grid">
        <div className="github-stat-card">
          <div className="github-stat-value">{data.publicRepos}</div>
          <div className="github-stat-label">{g.repos}</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-value">{data.totalCommits.toLocaleString()}</div>
          <div className="github-stat-label">{g.commits}</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-value">{data.totalStars}</div>
          <div className="github-stat-label">{g.stars}</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-value">{data.totalForks}</div>
          <div className="github-stat-label">{g.forks}</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-value">{data.followers}</div>
          <div className="github-stat-label">{g.followers}</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-value">{data.prsOpened}</div>
          <div className="github-stat-label">{g.prs}</div>
        </div>
      </div>

      {/* Contribution Graph (last 30 days) */}
      <div className="github-section">
        <div className="github-section-title">
          {g.contributionGraph}
          <span className="github-contrib-summary">
            {data.totalContributions} {g.recentContributions}
          </span>
        </div>
        <div className="github-contrib-graph">
          {data.contributionGraph.map(({ date, count }) => {
            const maxCount = Math.max(...data.contributionGraph.map(d => d.count), 1)
            const intensity = count === 0 ? 0 : Math.max(0.2, count / maxCount)
            return (
              <div
                key={date}
                className="github-contrib-cell"
                title={`${date}: ${count} ${count === 1 ? 'commit' : 'commits'}`}
                style={{
                  background: count === 0
                    ? 'var(--bg-tertiary)'
                    : `rgba(0, 255, 136, ${intensity})`,
                }}
              />
            )
          })}
        </div>
        <div className="github-contrib-legend">
          <span>{g.less}</span>
          <div className="github-contrib-cell" style={{ background: 'var(--bg-tertiary)' }} />
          <div className="github-contrib-cell" style={{ background: 'rgba(0, 255, 136, 0.2)' }} />
          <div className="github-contrib-cell" style={{ background: 'rgba(0, 255, 136, 0.5)' }} />
          <div className="github-contrib-cell" style={{ background: 'rgba(0, 255, 136, 0.8)' }} />
          <div className="github-contrib-cell" style={{ background: 'rgba(0, 255, 136, 1)' }} />
          <span>{g.more}</span>
        </div>
      </div>

      {/* Top Languages */}
      <div className="github-section">
        <div className="github-section-title">{g.topLanguages}</div>
        <div className="github-langs">
          {data.topLangs.map(([lang, count]) => {
            const pct = Math.round((count / data.langTotal) * 100)
            return (
              <div key={lang} className="github-lang-row">
                <div className="github-lang-info">
                  <span
                    className="github-lang-dot"
                    style={{ background: LANG_COLORS[lang] || '#8b8b8b' }}
                  />
                  <span className="github-lang-name">{lang}</span>
                  <span className="github-lang-pct">{pct}%</span>
                </div>
                <div className="github-lang-bar-bg">
                  <div
                    className="github-lang-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: LANG_COLORS[lang] || '#8b8b8b',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Repos */}
      <div className="github-section" style={{ borderBottom: 'none' }}>
        <div className="github-section-title">{g.recentActivity}</div>
        <div className="github-repos">
          {data.recentRepos.map(repo => (
            <a
              key={repo.id}
              className="github-repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="github-repo-name">
                <span>📁</span> {repo.name}
              </div>
              {repo.description && (
                <div className="github-repo-desc">{repo.description}</div>
              )}
              <div className="github-repo-meta">
                {repo.language && (
                  <span className="github-repo-lang">
                    <span
                      className="github-lang-dot"
                      style={{ background: LANG_COLORS[repo.language] || '#8b8b8b' }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span>⭐ {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span>🍴 {repo.forks_count}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
