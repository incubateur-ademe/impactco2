import { OverScreenInfo } from 'types/overscreen'
import Integrate from '../Integrate'
import Share from '../Share'

export const overScreenComparateurEtiquettesValues: () => Record<
  'animated' | 'static',
  Record<string, OverScreenInfo>
> = () => ({
  animated: {
    partager: {
      title: 'share',
      children: <Share path='outils/comparateur' tracking='Comparateur' anchor='etiquette-animee' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette-animee' tracking='Comparateur' />,
    },
  },
  static: {
    partager: {
      title: 'share',
      children: <Share path='outils/comparateur' tracking='Comparateur' anchor='etiquette-statique' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette' tracking='Comparateur' />,
    },
  },
})
