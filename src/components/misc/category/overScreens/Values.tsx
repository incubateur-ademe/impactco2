import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import Card from 'components/base/Card'
import { OverScreenInfo } from 'components/base/OverScreen'
import Resource from 'components/base/Resource'
import { CustomParamValue } from '../CustomParam'
import Integrate from '../Integrate'
import Share from '../Share'
import Data from './Data'
import { OverScreenCategory, OverScreenEquivalent } from './Type'
import { ResourcesContainer, Space, StyledEmoji } from './Values.styles'

export const overScreenEquivalentValues: (equivalent: Equivalent) => Record<OverScreenEquivalent, OverScreenInfo> = (
  equivalent
) => ({
  partager: {
    title: 'Partager',
    children: <Share path={`${equivalent.category}/${equivalent.slug}`} />,
  },
})

export const overScreenCategoryValues: (
  category?: Category,
  params?: Record<string, CustomParamValue>
) => Record<OverScreenCategory, OverScreenInfo> = (category, params) => ({
  partager: {
    title: 'Partager',
    children: <Share category={category} params={params} path={category ? undefined : 'comparateur'} />,
  },
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <Integrate
          path={category ? category.slug : 'comparateur'}
          params={params}
          tracking={category ? category.name : 'Comparateur'}
        />
        <Space />
        <Card
          href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          tracking={category ? category.name : 'Comparateur'}
        />
      </>
    ),
  },
  hypothesis: {
    title: (
      <div>
        <StyledEmoji>💡</StyledEmoji>Aller plus loin
      </div>
    ),
    children: (
      <ResourcesContainer>
        <Resource
          image='/images/category-wattris.png'
          text='Chauffer à l’électrique : simuler la consommation électrique de son logement avec Wattris'
          href='https://wattris.ademe.fr/'
          withLink='Wattris'
          tracking={category ? category.name : 'Comparateur'}
        />
        <Resource
          image='/images/category-mieux-chauffer.png'
          text='Découvrir comment mieux chauffer son logement'
          href='https://multimedia.ademe.fr/infographies/infographie_mieux_se_chauffer/'
          withLink='ADEME'
          tracking={category ? category.name : 'Comparateur'}
        />
        <Resource
          image='/images/category-systeme-chauffage.png'
          text='Rénover et changer son système de chauffage'
          href='https://librairie.ademe.fr/cadic/6566/guide-changer-son-chauffage-0423.pdf'
          withLink='ADEME'
          tracking={category ? category.name : 'Comparateur'}
        />
      </ResourcesContainer>
    ),
  },
  data: {
    title: (
      <div>
        <StyledEmoji>🔎</StyledEmoji>Comprendre les données
      </div>
    ),
    children: <Data />,
  },
})
