import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Resource from 'components/base/Resource'
import ComparisonOverscreen from 'components/comparateur/overscreens/ComparisonOverscreen'
import EquivalentsOverscreen from 'components/comparateur/overscreens/EquivalentsOverscreen'
import Integrate from './Integrate'
import Share from './Share'
import TransportIntegrate from './TransportIntegrate'
import TransportShare from './TransportShare'
import styles from './Values.module.css'

const ChauffageData = dynamic(() => import('./Data/ChauffageData'))
const FruitsEtLegumesData = dynamic(() => import('./Data/FruitsEtLegumesData'))
const LivraisonData = dynamic(() => import('./Data/LivraisonData'))
const UsageData = dynamic(() => import('./Data/UsageData'))
const OsezChangerData = dynamic(() => import('./Data/OsezChangerData'))
const TransportData = dynamic(() => import('./Data/TransportData'))
const UsageNumeriqueData = dynamic(() => import('./Data/UsageNumeriqueData'))

export type OverScreenInfo = {
  title?: string
  image?: string
  children: ReactNode
  fullHeight?: boolean
  cancel?: (onClose: () => void) => ReactNode
}

export const overScreenEquivalentEtiquetteValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => {
  const params = `value=${equivalent.value}&comparisons=${equivalent.slug}`

  return {
    integrer: {
      title: 'integrate',
      children: <Integrate path='/comparateur/etiquette' extraParams={params} tracking={getName('fr', equivalent)} />,
    },
  }
}

export const overScreenEquivalentInfographyValues: (
  equivalent: ComputedEquivalent,
  equivalents: string[]
) => Record<string, OverScreenInfo> = (equivalent, equivalents) => ({
  partager: {
    title: 'share',
    children: <Share path={`${equivalent.link}#infographie`} tracking={getName('fr', equivalent)} />,
  },
  integrer: {
    title: 'integrate',
    children: (
      <Integrate
        path='/infographie'
        extraParams={`equivalents=${equivalents.join(',')}`}
        tracking={getName('fr', equivalent)}
      />
    ),
  },
})

export const overScreenEquivalentValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => ({
  partager: {
    title: 'share',
    children: <Share path={equivalent.link} tracking={getName('fr', equivalent)} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={equivalent.link} tracking={getName('fr', equivalent)} />,
  },
  usage: {
    title: 'usage',
    children: <UsageData />,
  },
})

export const overScreenComparateurValues = {
  partager: {
    title: 'share',
    children: <Share path='outils/comparateur' tracking='Comparateur' />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='comparateur' tracking='Comparateur' />,
  },
  equivalents: {
    children: <EquivalentsOverscreen />,
    fullHeight: true,
  },
}

export const overScreenComparateurEtiquettesValues: () => Record<
  'animated' | 'static',
  Record<string, OverScreenInfo>
> = () => ({
  animated: {
    partager: {
      title: 'share',
      children: <Share path='outils/comparateur/etiquette-animee' tracking='Comparateur' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette-animee' tracking='Comparateur' />,
    },
  },
  static: {
    partager: {
      title: 'share',
      children: <Share path='outils/comparateur/etiquette' tracking='Comparateur' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette' tracking='Comparateur' />,
    },
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
          }}
          path='outils/habillement/osez-changer'
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
            text='tri'
            href='https://librairie.ademe.fr/consommer-autrement/5271-comment-faire-de-la-place-chez-soi-.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-questions.jpg'
            text='questions'
            href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-deuxieme-vie.jpg'
            text='deuxieme-vie'
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
      children:
        category.slug === 'transport' ? (
          <TransportIntegrate />
        ) : (
          <Integrate
            category={category}
            path={category ? category.slug : 'comparateur'}
            tracking={category ? category.name : 'Comparateur'}
          />
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
              text='pompe-chaleur'
              href='https://librairie.ademe.fr/changement-climatique-et-energie/6714-s-equiper-d-une-pompe-a-chaleur.html'
              withLink='ADEME'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/category-chauffage-bois.jpg'
              text='chauffage-bois'
              href='https://librairie.ademe.fr/urbanisme-et-batiment/5667-adopter-le-chauffage-au-bois-9791029719769.html'
              withLink='ADEME'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/category-wattris.png'
              text='wattris'
              href='https://wattris.ademe.fr/'
              withLink='Wattris'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
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
              image='/images/ecoresponsable.png'
              text='ecoresponsable'
              href='https://librairie.ademe.fr/consommer-autrement/5225-ecoresponsable-au-bureau-9791029718960.html'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/leger.png'
              text='leger'
              href='https://librairie.ademe.fr/consommer-autrement/249-comment-teletravailler-leger-.html'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/agir.png'
              text='agir'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/teletravail-ca-change-quoi-planete'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
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
  if (category.slug === 'fruitsetlegumes') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/category-fruitsetlegumes.png'
              text='calendar'
              href='https://librairie.ademe.fr/consommer-autrement/5784-a-chaque-mois-ses-fruits-et-legumes-.html/'
              withLink='ADEME'
              tracking='fruitsetlegumes'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='fruitsetlegumes'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <FruitsEtLegumesData />,
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
              text='ngc'
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
      comparison0: {
        children: <ComparisonOverscreen index={0} />,
        fullHeight: true,
      },
      comparison1: {
        children: <ComparisonOverscreen index={1} />,
        fullHeight: true,
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
              text='ngc'
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
              text='livraison'
              href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'
              withLink='ADEME'
              tracking='livraison'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
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
