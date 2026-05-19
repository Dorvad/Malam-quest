import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#05091a',
            color: 'white',
            fontFamily: 'Heebo, sans-serif',
            padding: '24px',
            textAlign: 'center',
            direction: 'rtl',
          }}
        >
          <p style={{ fontSize: '18px', marginBottom: '12px' }}>אירעה שגיאה בטעינה</p>
          <pre
            style={{
              fontSize: '12px',
              color: '#e879f9',
              background: 'rgba(255,255,255,0.05)',
              padding: '12px',
              borderRadius: '8px',
              maxWidth: '100%',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
