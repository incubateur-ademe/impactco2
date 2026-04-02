'use client'

import { Component, ReactNode } from 'react'

class NotionErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return <p>Contenu indisponible</p>
    }

    return this.props.children
  }
}

export default NotionErrorBoundary
