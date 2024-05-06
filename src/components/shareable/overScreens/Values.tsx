import { ReactNode } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import Card from 'components/base/Card'
import Resource from 'components/base/Resource'
import EquivalentsOverscreen from 'components/comparateur/overscreens/EquivalentsOverscreen'
import ChauffageData from './Data/ChauffageData'
import LivraisonData from './Data/LivraisonData'
import OsezChangerData from './Data/OsezChangerData'
import TransportData from './Data/TransportData'
import UsageNumeriqueData from './Data/UsageNumeriqueData'
import Integrate from './Integrate'
import Share from './Share'
import TransportIntegrate from './TransportIntegrate'
import TransportShare from './TransportShare'
import styles from './Values.module.css'

export type OverScreenInfo = {
  title?: ReactNode
  image?: string
  children: ReactNode
  fullWidth?: boolean
  cancel?: (onClose: () => void) => ReactNode
}

export const overScreenEquivalentEtiquetteValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => {
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

export const overScreenEquivalentInfographyValues: (
  equivalent: ComputedEquivalent
) => Record<string, OverScreenInfo> = (equivalent) => ({
  partager: {
    title: 'share',
    children: <Share path={`${equivalent.link}#infographie`} tracking={equivalent.name} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={`${equivalent.link}/infographie`} tracking={equivalent.name} />,
  },
})

export const overScreenEquivalentValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => ({
  partager: {
    title: 'share',
    children: <Share path={equivalent.link} tracking={equivalent.name} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={equivalent.link} tracking={equivalent.name} />,
  },
})

export const overScreenComparateurValues: (onClose?: () => void) => Record<string, OverScreenInfo> = (onClose) => ({
  partager: {
    title: 'share',
    children: <Share path='comparateur' tracking='Comparateur' />,
    fullWidth: !onClose,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='comparateur' tracking='Comparateur' />,
    fullWidth: !onClose,
  },
  equivalents: {
    children: <EquivalentsOverscreen onClose={onClose} />,
    fullWidth: true,
  },
})

export const overScreenEtiquetteValues: () => Record<string, OverScreenInfo> = () => ({
  partager: {
    title: 'share',
    children: <Share path='etiquette' tracking='Comparateur' />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='etiquette' tracking='Comparateur' />,
  },
})

export const overScreenExtraSimulatorValues: (slug: string) => Record<string, OverScreenInfo> = () => {
  return {
    partager: {
      title: 'share',
      children: (
        <Share
          category={{
            slug: 'osez-changer',
            name: 'Défi chaussures',
            meta: {
              title: 'Osez changer',
              description:
                'En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on les aidait à désencombrer les placards ? Découvrez le nouveau challenge d’Impact CO2 !',
            },
          }}
          path='habillement/osez-changer'
          tracking='OsezChanger'
        />
      ),
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='habillement/osez-changer' tracking='OsezChanger' />,
    },
    hypothesis: {
      image: '/images/icn-next-actions.svg',
      title: 'next-actions',
      children: (
        <div className={styles.ressourceContainer}>
          <Resource
            image='/images/osez-changer-tri.jpeg'
            text='Faire le tri dans ses placards pour gagner de la place chez soi'
            href='https://librairie.ademe.fr/consommer-autrement/5271-comment-faire-de-la-place-chez-soi-.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-questions.jpg'
            text='Se poser les bonnes questions avant d’acheter : en ai-je vraiment besoin ?'
            href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-deuxieme-vie.jpg'
            text='Donner une seconde vie aux vêtements et chaussures non utilisées'
            href='https://longuevieauxobjets.ademe.fr/'
            tracking='OsezChanger'
          />
        </div>
      ),
    },
    data: {
      image: '/images/icn-understand.svg',
      title: 'understand',
      children: <OsezChangerData />,
    },
  }
}

export const overScreenCategoryValues: (category: Category) => Record<string, OverScreenInfo> = (category) => {
  const values = {
    partager: {
      title: 'share',
      children:
        category.slug === 'transport' ? <TransportShare /> : <Share category={category} tracking={category.name} />,
    },
    integrer: {
      title: 'integrate',
      children: (
        <>
          {category.slug === 'transport' ? (
            <TransportIntegrate />
          ) : (
            <Integrate
              category={category}
              path={category ? category.slug : 'comparateur'}
              tracking={category ? category.name : 'Comparateur'}
            />
          )}
          <div className={styles.space} />
          <Card
            href='/doc/guide-utilisation'
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
  }
  if (category.slug === 'chauffage') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
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
            <Resource
              image='/images/ngc.png'
              text='Estimer son empreinte carbone de consommation'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking={category ? category.name : 'Comparateur'}
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <ChauffageData />,
      },
    }
  }
  if (category.slug === 'teletravail') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ngc.png'
              text='Estimer son empreinte carbone de consommation'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Télétravail'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'transport') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ngc.png'
              text='Estimer son empreinte carbone de consommation'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Transport'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <TransportData />,
      },
    }
  }
  if (category.slug === 'usagenumerique') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ngc.png'
              text='Estimer son empreinte carbone de consommation'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Usage numérique'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <UsageNumeriqueData />,
      },
    }
  }
  if (category.slug === 'livraison') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/category-livraison.png'
              text='Télécharger le guide “E-consommateur & responsable”'
              href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'
              withLink='ADEME'
              tracking='livraison'
            />
            <Resource
              image='/images/ngc.png'
              text='Estimer son empreinte carbone de consommation'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='livraison'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <LivraisonData />,
      },
    }
  }
  return values
}
