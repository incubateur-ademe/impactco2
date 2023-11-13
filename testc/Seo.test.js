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

  const default_description =
    "Sensibilisez votre communauté grâce aux ressources sur l’impact carbone des gestes et objets du quotidien,  issue des données environnementales de l'ADEME."
  const default_title = 'Impact sur le climat des objets et gestes | Impact CO2'

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, websiteurl: 'example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  it('La balise title a bien la valeur par défaut', () => {
    render(<Seo />)
    expect(document.title).toBe('Impact sur le climat des objets et gestes | Impact CO2')
  })
  it('La meta image est /metaimage.png par défaut', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=image]')[0].content).toBe('https://example.com/metaimage.png')
  })
  it('En local, je peux lire la meta-image, sans le "s" de "https"', () => {
    process.env = { ...env, websiteurl: 'localhost:3000' }
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=image]')[0].content).toBe('http://localhost:3000/metaimage.png')
  })
  it('La meta description est "sensibilisez..." par défaut', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name=description]')[0].content).toBe(default_description)
  })
  it("La meta og:url représente bien l'URL courante (version simple)", () => {
    mockRouter.push('/current-path')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:url"]')[0].content).toBe('https://example.com/current-path')
  })
  it("La meta og:url représente bien l'URL courante (version compliquée)", () => {
    mockRouter.push('/another/a?b=c')
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:url"]')[0].content).toBe('https://example.com/another/a?b=c')
  })
  it('La meta og:title vaut la même chose que le title', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:title"]')[0].content).toBe(default_title)
  })
  it('La meta og:description vaut la même chose que la description', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[property="og:description"]')[0].content).toBe(default_description)
  })
  it('La meta twitter:card vaut la constante summary_large_image', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name="twitter:card"]')[0].content).toBe('summary_large_image')
  })
  it('La meta twitter:creator est pour le compte ademe', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name="twitter:creator"]')[0].content).toBe('ademe')
  })
  it('La meta twitter:title vaut la même chose que le titre', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name="twitter:title"]')[0].content).toBe(default_title)
  })
  it('La meta twitter:description vaut la même chose que la description', () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name="twitter:description"]')[0].content).toBe(default_description)
  })
  it("La meta twitter:image vaut la même chose que l'image", () => {
    const { container } = render(<Seo />)
    expect(container.querySelectorAll('meta[name="twitter:image"]')[0].content).toBe(
      'https://example.com/metaimage.png'
    )
  })
  it('La balise title peut être personnalisée', () => {
    render(<Seo title='aaa' />)
    expect(document.title).toBe('aaa | Impact CO2')
  })
  it('La meta image peut être personnalisée', () => {
    const { container } = render(<Seo image={'myimage.png'} />)
    expect(container.querySelectorAll('meta[name=image]')[0].content).toBe('https://example.com/myimage.png')
  })
  it('La description peut être personnalisée', () => {
    const { container } = render(<Seo description={'my description'} />)
    expect(container.querySelectorAll('meta[name=description]')[0].content).toBe('my description')
  })
})
