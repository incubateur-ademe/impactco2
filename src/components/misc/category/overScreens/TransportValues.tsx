import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import styles from 'components/misc/category/overScreens/Values.module.css'
import { CustomParamValue } from '../CustomParam'
import TransportIntegrate from '../TransportIntegrate'
import TransportShare from '../TransportShare'
import { OverScreenTransport } from './TransportType'

export const overScreenTransportValues: (
  category: Category,
  params: Record<string, CustomParamValue>,
  tracking: string,
  type: TransportSimulateur
) => Record<OverScreenTransport, OverScreenInfo> = (category, params, tracking, type) => ({
  partager: {
    title: 'share',
    children: <TransportShare tracking={tracking} />,
  },
  integrer: {
    title: 'integrate',
    children: (
      <>
        <TransportIntegrate type={type} tracking={tracking} />
        <div className={styles.space} />
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
