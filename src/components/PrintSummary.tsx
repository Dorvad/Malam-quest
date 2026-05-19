import type { SurveyResults } from '../lib/scoring'
import { dimensions } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

export default function PrintSummary({ results }: Props) {
  const items = [
    { result: results.human, dim: dimensions[0] },
    { result: results.ai, dim: dimensions[1] },
  ]

  return (
    <div className="print-only hidden">
      <div style={{ fontFamily: 'Heebo, Arial, sans-serif', direction: 'rtl', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #e2e2ef', paddingBottom: '16px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a2e', marginBottom: '4px' }}>
            שאלון הערכה עצמית
          </h1>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#4338ca' }}>
            ניהול בעידן ה־AI
          </h2>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
            תאריך מילוי: {results.human.dimension && results.completedAt}
          </p>
        </div>

        {items.map(({ result, dim }) => {
          const descParagraphs = result.range.description
            .split('\n')
            .map((p) => p.trim())
            .filter(Boolean)

          return (
            <div
              key={dim.id}
              style={{
                marginBottom: '20px',
                padding: '16px',
                borderRadius: '8px',
                background: dim.color === 'magenta' ? '#f3f0ff' : '#f0f9ff',
                border: `1px solid ${dim.color === 'magenta' ? '#c4b5fd' : '#93c5fd'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>ממד</p>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: dim.color === 'magenta' ? '#7c3aed' : '#0369a1' }}>
                    {dim.name}
                  </h3>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>ציון</p>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: dim.color === 'magenta' ? '#7c3aed' : '#0369a1' }}>
                    {result.score}
                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>/25</span>
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-block',
                  background: dim.color === 'magenta' ? '#ede9fe' : '#dbeafe',
                  border: `1px solid ${dim.color === 'magenta' ? '#c4b5fd' : '#93c5fd'}`,
                  borderRadius: '999px',
                  padding: '3px 12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: dim.color === 'magenta' ? '#6d28d9' : '#1d4ed8',
                  marginBottom: '10px',
                }}
              >
                {result.range.level}
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '10px' }}>
                {descParagraphs.map((para, i) => (
                  <p key={i} style={{ fontSize: '12px', color: '#374151', lineHeight: '1.7', marginBottom: '6px' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )
        })}

        <p style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'center', marginTop: '16px' }}>
          יום מנהלים | מלמ תים | ניהול בעידן ה־AI
        </p>
      </div>
    </div>
  )
}
