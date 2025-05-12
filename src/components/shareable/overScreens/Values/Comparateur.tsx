import EquivalentsOverscreen from 'components/comparateur/overscreens/EquivalentsOverscreen'
import Integrate from '../Integrate'
import Share from '../Share'

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
    title: 'equivalent',
    hideTitle: true,
    children: <EquivalentsOverscreen />,
    fullHeight: true,
  },
}
