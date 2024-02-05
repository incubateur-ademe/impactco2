import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { ReactNode } from 'react'
import { getMetaName, getMetaProperty } from 'test-utils/get-meta'
import Seo from 'components/layout/web/Seo'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => {
      return <>{children}</>
    },
  }
})

describe('Seo', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, NEXT_PUBLIC_URL: 'https://example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  const default_description =
    "Sensibilisez votre communauté grâce aux ressources sur l’impact carbone des gestes et objets du quotidien,  issue des données environnementales de l'ADEME."
  const default_title = 'Impact sur le climat des objets et gestes | Impact CO₂'

  it('La balise title a bien la valeur par défaut', () => {
    render(<Seo />)
    expect(document.title).toBe(default_title)
  })
  it('La meta image est /metaimage.png par défaut', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'image')).toEqual('https://example.com/metaimage.png')
  })
  it('La meta description est "sensibilisez..." par défaut', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'description')).toEqual(default_description)
  })
  it("La meta og:url représente bien l'URL courante (version simple)", () => {
    mockRouter.push('/current-path')
    const { container } = render(<Seo />)
    expect(getMetaProperty(container, 'og:url')).toEqual('https://example.com/current-path')
  })
  it("La meta og:url représente bien l'URL courante (version compliquée)", () => {
    mockRouter.push('/another/a?b=c')
    const { container } = render(<Seo />)
    expect(getMetaProperty(container, 'og:url')).toEqual('https://example.com/another/a?b=c')
  })
  it('La meta og:title vaut la même chose que le title', () => {
    const { container } = render(<Seo />)
    expect(getMetaProperty(container, 'og:title')).toEqual(default_title)
  })
  it('La meta og:description vaut la même chose que la description', () => {
    const { container } = render(<Seo />)
    expect(getMetaProperty(container, 'og:description')).toEqual(default_description)
  })
  it('La meta twitter:card vaut la constante summary_large_image', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'twitter:card')).toEqual('summary_large_image')
  })
  it('La meta twitter:creator est pour le compte ademe', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'twitter:creator')).toEqual('ademe')
  })
  it('La meta twitter:title vaut la même chose que le titre', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'twitter:title')).toEqual(default_title)
  })
  it('La meta twitter:description vaut la même chose que la description', () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'twitter:description')).toEqual(default_description)
  })
  it("La meta twitter:image vaut la même chose que l'image", () => {
    const { container } = render(<Seo />)
    expect(getMetaName(container, 'twitter:image')).toEqual('https://example.com/metaimage.png')
  })
  it('La balise title peut être personnalisée', () => {
    render(<Seo title='aaa' />)
    expect(document.title).toBe('aaa | Impact CO₂')
  })
  it('La meta image peut être personnalisée', () => {
    const { container } = render(<Seo image={'myimage.png'} />)
    expect(getMetaName(container, 'image')).toEqual('https://example.com/myimage.png')
  })
  it('La description peut être personnalisée', () => {
    const { container } = render(<Seo description={'my description'} />)
    expect(getMetaName(container, 'description')).toEqual('my description')
  })
})
