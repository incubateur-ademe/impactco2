import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IframeFooter from 'components/layout/iframe/IframeFooter'

describe('IframeFooter', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, NEXT_PUBLIC_URL: 'https://example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  it('renders a Footer specific to the iframe', () => {
    render(<IframeFooter />)
    // check if all components are rendered
    expect(screen.getByTestId('iframe-footer-link')).toHaveAttribute('href', 'https://example.com/')
    expect(screen.getByTestId('logo-impact-co2-link')).toHaveAttribute('href', '/')
  })
})
