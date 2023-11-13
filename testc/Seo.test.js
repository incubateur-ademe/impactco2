import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import Seo from 'components/layout/web/Seo'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

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

  it('La meta image est /metaimage.png par défaut', () => {
    mockRouter.push('/')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=image]')[0].content).toBe('https://example.com/metaimage.png')
  })
  it('La meta description est "sensibilisez..." par défaut', () => {
    mockRouter.push('/')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=description]')[0].content).toBe(
      "Sensibilisez votre communauté grâce aux ressources sur l’impact carbone des gestes et objets du quotidien,  issue des données environnementales de l'ADEME."
    )
  })
  it("La meta og:url représente bien l'URL courante", () => {
    mockRouter.push('/current-path')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:url"]')[0].content).toBe('https://example.com/current-path')
  })
  it("La balise title vaut 'Impact Carbone de la livraison de colis | Impact CO2' par défaut", () => {
    mockRouter.push('/')
    render(<Seo />)
    expect(document.title).toBe('Impact sur le climat des objets et gestes | Impact CO2')
  })
  it('La meta og:title vaut la même chose que le title', () => {
    mockRouter.push('/')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:title"]')[0].content).toBe(
      'Impact sur le climat des objets et gestes | Impact CO2'
    )
  })
})
