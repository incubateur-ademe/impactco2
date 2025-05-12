import { OverScreenInfo } from 'types/overscreen'
import Integrate from '../Integrate'
import Share from '../Share'

export const overScreenQuizValues: () => Record<string, OverScreenInfo> = () => {
  return {
    partager: {
      title: 'share',
      children: <Share path='/outils/quiz' tracking='Quiz' extraKit='quiz' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='quiz' tracking='Quiz' />,
    },
  }
}
