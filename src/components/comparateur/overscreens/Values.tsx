import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import Integrate from 'components/misc/category/Integrate'
import Share from 'components/misc/category/Share'
import { Space } from 'components/misc/category/overScreens/Values.styles'
import EquivalentsOverscreen from './EquivalentsOverscreen'
import { OverScreenComparateur, OverScreenEtiquette } from './Type'

export const overScreenEtiquetteValues: (params?: string) => Record<OverScreenEtiquette, OverScreenInfo> = (
  params
) => ({
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <Integrate path='comparateur/etiquette' extraParams={params} tracking='Comparateur' />
        <Space />
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
    title: 'Partager',
    children: <Share params={params} path='comparateur' />,
  },
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <Integrate path='comparateur' params={params} tracking='Comparateur' />
        <Space />
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
