import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import Integrate from 'components/misc/category/Integrate'
import Share from 'components/misc/category/Share'
import { Space } from 'components/misc/category/overScreens/Values.styles'
import EquivalentsOverscreen from './EquivalentsOverscreen'
import { OverScreenComparateur } from './Type'

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
        <Integrate slug='convertisseur' params={params} tracking='Comparateur' />
        <Space />
        <Card
          href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          tracking='Comparateur'
        />
      </>
    ),
  },
  equivalents: {
    children: <EquivalentsOverscreen onClose={onClose} />,
  },
})
