import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import Card from 'components/base/Card'
import Emoji from 'components/base/Emoji'
import { OverScreenInfo } from 'components/base/OverScreen'
import Resource from 'components/base/Resource'
import { CustomParamValue } from '../CustomParam'
import Integrate from '../Integrate'
import Share from '../Share'
import Data from './Data'
import { OverScreenCategory, OverScreenEquivalent } from './Type'
import styles from './Values.module.css'

export const overScreenEquivalentEtiquetteValues: (
  equivalent: ComputedEquivalent
) => Record<OverScreenEquivalent, OverScreenInfo> = (equivalent) => {
  const params = `?value=${equivalent.value}&comparisons=${equivalent.slug}`

  return {
    partager: {
      title: 'share',
      children: <Share path={`/comparateur${params}#etiquette`} tracking={equivalent.name} />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='/comparateur/etiquette' extraParams={params} tracking={equivalent.name} />,
    },
  }
}

export const overScreenEquivalentValues: (
  equivalent: ComputedEquivalent
) => Record<OverScreenEquivalent, OverScreenInfo> = (equivalent) => ({
  partager: {
    title: 'share',
    children: <Share path={equivalent.link} tracking={equivalent.name} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={equivalent.link} tracking={equivalent.name} />,
  },
})

export const overScreenEquivalentInfographyValues: (
  equivalent: ComputedEquivalent
) => Record<OverScreenEquivalent, OverScreenInfo> = (equivalent) => ({
  partager: {
    title: 'share',
    children: <Share path={`${equivalent.link}#infographie`} tracking={equivalent.name} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={`${equivalent.link}/infographie`} tracking={equivalent.name} />,
  },
})

export const overScreenCategoryValues: (
  category: Category,
  params?: Record<string, CustomParamValue>
) => Record<OverScreenCategory, OverScreenInfo> = (category, params) => ({
  partager: {
    title: 'share',
    children: <Share category={category} params={params} tracking={category.name} />,
  },
  integrer: {
    title: 'integrate',
    children: (
      <>
        <Integrate
          path={category ? category.slug : 'comparateur'}
          params={params}
          tracking={category ? category.name : 'Comparateur'}
        />
        <div className={styles.space} />
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
        <Emoji>💡</Emoji>Aller plus loin
      </div>
    ),
    children: (
      <div className={styles.ressourceContainer}>
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
      </div>
    ),
  },
  data: {
    title: (
      <div>
        <Emoji>🔎</Emoji>Comprendre les données
      </div>
    ),
    children: <Data />,
  },
})
