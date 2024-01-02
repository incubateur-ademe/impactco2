import { Category } from 'types/category'
import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import { CustomParamValue } from '../CustomParam'
import Share from '../Share'
import TransportIntegrate from '../TransportIntegrate'
import { OverScreenTransport } from './TransportType'
import { Space } from './Values.styles'

export const overScreenTransportValues: (
  category: Category,
  params: Record<string, CustomParamValue>,
  tracking: string,
  type: 'distance' | 'itineraire' | 'teletravail'
) => Record<OverScreenTransport, OverScreenInfo> = (category, params, tracking, type) => ({
  partager: {
    title: 'Partager',
    children: (
      <Share category={category} params={params} path={type === 'distance' ? undefined : `transport/${type}`} />
    ),
  },
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <TransportIntegrate type={type} tracking={tracking} />
        <Space />
        <Card
          href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
          title='Utiliser cette ressource'
          description='Consultez le kit de diffusion impact CO₂ pour vous emparer facilement du simulateur et l’intégrer à votre publication.'
          link='Kit de diffusion'
          image='/images/laptop.png'
          tracking={category.name}
        />
      </>
    ),
  },
})