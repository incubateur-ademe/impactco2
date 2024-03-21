import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import { CustomParamValue } from '../CustomParam'
import TransportIntegrate from '../TransportIntegrate'
import TransportShare from '../TransportShare'
import { OverScreenTransport } from './TransportType'
import { Space } from './Values.styles'

export const overScreenTransportValues: (
  category: Category,
  params: Record<string, CustomParamValue>,
  tracking: string,
  type: TransportSimulateur
) => Record<OverScreenTransport, OverScreenInfo> = (category, params, tracking, type) => ({
  partager: {
    title: 'Partager',
    children: <TransportShare type={type} tracking={tracking} />,
  },
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <TransportIntegrate type={type} tracking={tracking} />
        <Space />
        <Card
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link="Guide d'utilisation"
          image='/images/laptop.png'
          trackingCategory={category.name}
          trackingAction='Blocs accompagnement'
        />
      </>
    ),
  },
})
