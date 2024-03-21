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
  category: Category,
  params?: Record<string, CustomParamValue>
) => Record<OverScreenCategory, OverScreenInfo> = (category, params) => ({
  partager: {
    title: 'Partager',
    children: <Share category={category} params={params} />,
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
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link="Guide d'utilisation"
          image='/images/laptop.png'
          trackingCategory={category ? category.name : 'Comparateur'}
          trackingAction='Blocs accompagnement'
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
          image='/images/category-pompe-chaleur.jpg'
          text='S’équiper d’une pompe à chaleur'
          href='https://librairie.ademe.fr/changement-climatique-et-energie/6714-s-equiper-d-une-pompe-a-chaleur.html'
          withLink='ADEME'
          tracking={category ? category.name : 'Comparateur'}
        />
        <Resource
          image='/images/category-chauffage-bois.jpg'
          text='Adopter le chauffage au bois'
          href='https://librairie.ademe.fr/urbanisme-et-batiment/5667-adopter-le-chauffage-au-bois-9791029719769.html'
          withLink='ADEME'
          tracking={category ? category.name : 'Comparateur'}
        />
        <Resource
          image='/images/category-wattris.png'
          text='Simuler la consommation électrique de son logement'
          href='https://wattris.ademe.fr/'
          withLink='Wattris'
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
