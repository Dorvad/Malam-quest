import { forwardRef } from 'react'
import type { SurveyResults } from '../lib/scoring'
import { dimensions } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

const levelIcons: Record<string, string> = {
  'בסיס בהתפתחות': '🌱',
  'ניהול מסתגל': '⚡',
  'מנהיגות אנושית מובילה': '🏆',
  'בתחילת האימוץ': '🌱',
  'שילוב מתפתח': '⚡',
  'מוביל/ת עבודה היברידית': '🏆',
}

const ExportCard = forwardRef<HTMLDivElement, Props>(({ results }, ref) => {
  const items = [
    { result: results.human, dim: dimensions[0], accent: '#e879f9', accentDim: '#9333ea', bg: 'rgba(147,51,234,0.15)', border: 'rgba(232,121,249,0.3)' },
    { result: results.ai, dim: dimensions[1], accent: '#38bdf8', accentDim: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', border: 'rgba(56,189,248,0.3)' },
  ]

  return (
    <div
      ref={ref}
      style={{
        width: '800px',
        background: 'linear-gradient(160deg, #05091a 0%, #0d1330 50%, #080d22 100%)',
        padding: '48px',
        fontFamily: 'Heebo, Arial, sans-serif',
        direction: 'rtl',
        position: 'fixed',
        top: 0,
        left: '-9999px',
        zIndex: -1,
      }}
    >
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'inline-block',
            background: 'white',
            borderRadius: '12px',
            padding: '8px 18px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}>
            <img src="/Malam-quest/logo.jpg" alt="MalamTeam" style={{ height: '36px', width: 'auto', display: 'block' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>
            פענוח התוצאות
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
            שאלון הערכה עצמית · ניהול בעידן ה־AI
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
        {items.map(({ result, dim, accent, accentDim, bg, border }) => {
          const descParagraphs = result.range.description
            .split('\n').map(p => p.trim()).filter(Boolean)
          const icon = levelIcons[result.range.level] ?? '✦'
          const barWidth = `${result.percentage}%`

          return (
            <div key={dim.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${border}`,
              borderRadius: '16px',
              padding: '28px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Card glow */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '200px', height: '200px', borderRadius: '50%',
                background: `radial-gradient(circle, ${bg} 0%, transparent 70%)`,
              }} />

              {/* Top row: name + score */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    ממד
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: accent }}>
                    {dim.name}
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>ציון</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: accent, lineHeight: 1 }}>
                      {result.score}
                    </span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>/25</span>
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: barWidth, borderRadius: '999px',
                    background: `linear-gradient(90deg, ${accentDim}, ${accent})`,
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {['5','15','25'].map(n => (
                    <span key={n} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{n}</span>
                  ))}
                </div>
              </div>

              {/* Level badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 14px', borderRadius: '999px', marginBottom: '14px',
                background: bg, border: `1px solid ${border}`,
                fontSize: '13px', fontWeight: 700, color: accent,
              }}>
                <span>{icon}</span>
                <span>{result.range.level}</span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '14px' }} />

              {/* Description */}
              {descParagraphs.map((para, i) => (
                <p key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: i < descParagraphs.length - 1 ? '8px' : 0, margin: i < descParagraphs.length - 1 ? '0 0 8px 0' : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
        {results.completedAt} · יום מנהלים · ניהול בעידן ה־AI
      </div>
    </div>
  )
})

ExportCard.displayName = 'ExportCard'
export default ExportCard
