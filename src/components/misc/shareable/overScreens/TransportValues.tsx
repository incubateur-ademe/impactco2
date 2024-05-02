import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import Card from 'components/base/Card'
import { CustomParamValue } from './CustomParam'
import { OverScreenTransport } from './TransportType'
import { OverScreenInfo } from './Values'

export const overScreenTransportValues: (
  category: Category,
  params: Record<string, CustomParamValue>,
  tracking: string,
  type: TransportSimulateur
) => Record<OverScreenTransport, OverScreenInfo> = (category) => ({
  partager: {
    title: 'share',
    children: <></>,
  },
  integrer: {
    title: 'integrate',
    children: (
      <>
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
