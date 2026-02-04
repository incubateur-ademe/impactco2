import dynamic from 'next/dynamic'
import { Category } from 'types/category'
import { OverScreenInfo } from 'types/overscreen'
import Resource from 'components/base/Resource'
import ComparisonOverscreen from 'components/comparateur/overscreens/ComparisonOverscreen'
import FaqsOverscreen from 'components/faq/FaqsOverscreen'
import AlimentationIntegrate from '../AlimentationIntegrate'
import AlimentationData from '../Data/AlimentationData'
import Integrate from '../Integrate'
import LivraisonIntegrate from '../LivraisonIntegrate'
import Share from '../Share'
import TransportIntegrate from '../TransportIntegrate'
import TransportShare from '../TransportShare'
import styles from './Values.module.css'

const FruitsEtLegumesData = dynamic(() => import('../Data/FruitsEtLegumesData'))
const LivraisonData = dynamic(() => import('../Data/LivraisonData'))
const UsageNumeriqueData = dynamic(() => import('../Data/UsageNumeriqueData'))
const NumeriqueData = dynamic(() => import('../Data/NumeriqueData'))

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
      faq: {
        image: '/images/icn-understand.svg',
        title: 'faq',
        children: <FaqsOverscreen filter={category.name} page={category.name} slug={category.slug} />,
        hideTitle: true,
        fullHeight: true,
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
              text='agir-tt'
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
              href='https://librairie.ademe.fr/consommer-autrement/5784-a-chaque-mois-ses-fruits-et-legumes-.html'
              withLink='ADEME'
              tracking='fruitsetlegumes'
            />
            <Resource
              image='/images/agir.png'
              text='alimentation-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso/alimentation'
              withLink='Agir pour la transition'
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
      integrer: {
        title: 'integrate',
        children: <TransportIntegrate />,
      },
      faq: {
        image: '/images/icn-understand.svg',
        title: 'faq',
        children: <FaqsOverscreen filter={category.name} page={category.name} slug={category.slug} />,
        fullHeight: true,
        hideTitle: true,
      },
      comparison0: {
        title: 'comparison',
        hideTitle: true,
        children: <ComparisonOverscreen index={0} />,
        fullHeight: true,
      },
      comparison1: {
        title: 'comparison',
        hideTitle: true,
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
              image='/images/agir.png'
              text='numerique-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/numerique'
              withLink='Agir pour la transition'
              tracking='Usage numérique'
            />
            <Resource
              image='/images/sobriete.png'
              text='sobriete'
              href='https://librairie.ademe.fr/consommer-autrement/7575-9196-comment-adopter-la-sobriete-numerique--9791029724237.html#/43-type_de_produit-format_imprime'
              withLink='ADEME'
              tracking='Usage numérique'
            />
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
      integrer: {
        title: 'integrate',
        children: <LivraisonIntegrate />,
      },
      partager: {
        title: 'share',
        children: <Share category={category} tracking={category.name} extraKit='livraison' />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/tools-transport.svg'
              text='ico2-transport'
              href='https://impactco2.fr/outils/transport'
              withLink='Impact Transport'
              tracking='Livraison'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Livraison'
              imgSize='4.5rem'
            />
            <Resource
              image='/images/commerce.png'
              text='commerce'
              href='https://infos.ademe.fr/article-magazine/limpact-environnemental-du-commerce-en-ligne/'
              withLink='Infographie ADEME'
              tracking='Livraison'
            />
            <Resource
              image='/images/agir.png'
              text='agir-livraison'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso'
              withLink='Agir pour la transition'
              tracking='Livraison'
            />
            <Resource
              image='/images/epargnonsnosressources.png'
              text='epargnonsnosressources'
              href='https://epargnonsnosressources.gouv.fr/evaluer-besoin-avant-achat/'
              withLink='Épargnons nos ressources'
              tracking='Livraison'
            />
            <Resource
              image='/images/gagner-place.png'
              text='gagner-place'
              href='https://librairie.ademe.fr/consommer-autrement/8192-9957-comment-gagner-de-la-place-chez-soi--9791029725135.html#/43-type_de_produit-format_imprime'
              withLink='La librairie ADEME'
              tracking='Livraison'
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
  if (category.slug === 'alimentation') {
    return {
      partager: {
        title: 'share',
        children: <Share category={category} tracking={category.name} extraKit='alimentation' />,
      },
      integrer: {
        title: 'integrate',
        children: <AlimentationIntegrate />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir-alimentation.png'
              text='agir-alimentation'
              href='https://librairie.ademe.fr/agriculture-alimentation-foret-bioeconomie/7617-tout-comprendre-une-alimentation-plus-durable.html'
              withLink='ADEME'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-fruitsetlegumes.svg'
              text='ico2-fruitsetlegumes'
              href='https://impactco2.fr/outils/fruitsetlegumes'
              withLink='Fruits et légumes de saison'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-repas.svg'
              text='ico2-repas'
              href='https://impactco2.fr/outils/alimentation#repas'
              withLink='Repas'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-alimentation.png'
              text='ico2-fiches-alimentation'
              href='https://impactco2.fr/kit/fiches-alimentation.zip'
              withLink='Télécharger les 65 fiches'
              tracking='Alimentation'
            />
            <Resource
              image='/images/agir.png'
              text='alimentation-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso/alimentation'
              withLink='Agir pour la transition'
              tracking='Alimentation'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Alimentation'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <AlimentationData />,
      },
    }
  }
  if (category.slug === 'repas') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='alimentation-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso/alimentation'
              withLink='Agir pour la transition'
              tracking='Repas'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Repas'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'boisson') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='alimentation-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso/alimentation'
              withLink='Agir pour la transition'
              tracking='Boisson'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Boisson'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'electromenager') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='gestes'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/economies-denergie-deau'
              withLink='Agir pour la transition'
              tracking='Électroménager'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Électroménager'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'habillement') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='mode'
              href='https://agirpourlatransition.ademe.fr/particuliers/conso/mode'
              withLink='Agir pour la transition'
              tracking='Habillement'
            />
            <Resource
              image='/images/gagner-place.png'
              text='gagner-place'
              href='https://librairie.ademe.fr/consommer-autrement/8192-9957-comment-gagner-de-la-place-chez-soi--9791029725135.html#/43-type_de_produit-format_imprime'
              withLink='La librairie ADEME'
              tracking='Habillement'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Habillement'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'mobilier') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='habitation'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/emmenagement'
              withLink='Agir pour la transition'
              tracking='Mobilier'
            />
            <Resource
              image='/images/gagner-place.png'
              text='gagner-place'
              href='https://librairie.ademe.fr/consommer-autrement/8192-9957-comment-gagner-de-la-place-chez-soi--9791029725135.html#/43-type_de_produit-format_imprime'
              withLink='La librairie ADEME'
              tracking='Mobilier'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Mobilier'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'numerique') {
    return {
      ...values,
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <NumeriqueData />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir.png'
              text='numerique-responsable'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/numerique'
              withLink='Agir pour la transition'
              tracking='Numérique'
            />
            <Resource
              image='/images/sobriete.png'
              text='sobriete'
              href='https://librairie.ademe.fr/consommer-autrement/7575-9196-comment-adopter-la-sobriete-numerique--9791029724237.html#/43-type_de_produit-format_imprime'
              withLink='ADEME'
              tracking='Numérique'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Numérique'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  return values
}
