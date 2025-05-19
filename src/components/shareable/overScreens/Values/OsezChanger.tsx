import dynamic from 'next/dynamic'
import { OverScreenInfo } from 'types/overscreen'
import Resource from 'components/base/Resource'
import Integrate from '../Integrate'
import Share from '../Share'
import styles from './Values.module.css'

const OsezChangerData = dynamic(() => import('../Data/OsezChangerData'))

export const overScreenOsezChangerValues: () => Record<string, OverScreenInfo> = () => {
  return {
    partager: {
      title: 'share',
      children: (
        <Share
          category={{
            slug: 'osez-changer',
            name: 'Défi chaussures',
          }}
          path='outils/habillement'
          tracking='OsezChanger'
          anchor='osez-changer'
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
            image='/images/osez-changer-fast-fashion.png'
            text='fast-fashion'
            href='https://librairie.ademe.fr/consommer-autrement/7747-tout-comprendre-les-impacts-de-la-mode-et-de-la-fast-fashion.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/gagner-place.png'
            text='gagner-place'
            href='https://librairie.ademe.fr/consommer-autrement/8192-9957-comment-gagner-de-la-place-chez-soi--9791029725135.html#/43-type_de_produit-format_imprime'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-questions.png'
            text='questions'
            href='https://librairie.ademe.fr/consommer-autrement/3882-exposition-le-revers-de-mon-look-quels-impacts-ont-mes-vetements-sur-la-planete-.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-deuxieme-vie.png'
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
