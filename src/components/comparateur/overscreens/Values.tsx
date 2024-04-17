import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import Integrate from 'components/misc/category/Integrate'
import Share from 'components/misc/category/Share'
import styles from 'components/misc/category/overScreens/Values.module.css'
import EquivalentsOverscreen from './EquivalentsOverscreen'
import { OverScreenComparateur, OverScreenEtiquette } from './Type'

export const overScreenEtiquetteValues: (params?: string) => Record<OverScreenEtiquette, OverScreenInfo> = (
  params
) => ({
  integrer: {
    title: 'integrate',
    children: (
      <>
        <Integrate path='comparateur/etiquette' extraParams={params} tracking='Comparateur' />
        <div className={styles.space} />
        <Card
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          trackingCategory='Comparateur'
          trackingAction='Blocs accompagnement'
        />
      </>
    ),
  },
})
export const overScreenComparateurValues: (
  onClose: () => void,
  params?: Record<string, CustomParamValue>
) => Record<OverScreenComparateur, OverScreenInfo> = (onClose, params) => ({
  partager: {
    title: 'share',
    children: <Share params={params} path='comparateur' />,
  },
  integrer: {
    title: 'integrate',
    children: (
      <>
        <Integrate path='comparateur' params={params} tracking='Comparateur' />
        <div className={styles.space} />
        <Card
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          trackingCategory='Comparateur'
          trackingAction='Blocs accompagnement'
        />
      </>
    ),
  },
  equivalents: {
    children: <EquivalentsOverscreen onClose={onClose} />,
  },
})
