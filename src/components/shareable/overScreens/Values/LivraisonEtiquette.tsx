import { OverScreenInfo } from 'types/overscreen'
import LivraisonEtiquetteIntegrate from '../LivraisonEtiquetteIntegrate'
import Share from '../Share'

export const overScreenLivraisonEtiquettesValues: () => Record<
  'animated' | 'static',
  Record<string, OverScreenInfo>
> = () => ({
  animated: {
    partager: {
      title: 'share',
      children: <Share path='outils/livraison' tracking='Livraison' anchor='etiquette-animee' extraKit='livraison' />,
    },
    integrer: {
      title: 'integrate',
      children: <LivraisonEtiquetteIntegrate animated />,
    },
  },
  static: {
    partager: {
      title: 'share',
      children: <Share path='outils/livraison' tracking='Livraison' anchor='etiquette' extraKit='livraison' />,
    },
    integrer: {
      title: 'integrate',
      children: <LivraisonEtiquetteIntegrate />,
    },
  },
})
