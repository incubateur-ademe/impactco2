import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useRouter } from 'next/router'
import Seo from 'components/layout/web/Seo'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>
    },
  }
})

describe('Seo', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, websiteurl: 'example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  it('renders metaimage.png by default', () => {
    useRouter.mockReturnValue({ query: {} })
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=image]')[0].content).toBe('https://example.com/metaimage.png')
  })
})
