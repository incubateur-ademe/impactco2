import Integrate from '../Integrate'
import Share from '../Share'

export const overScreenQuizInfographyValues = {
  partager: {
    title: 'share',
    children: <Share tracking='Quiz infographie' path='iframes/quiz-infographie' />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='quiz-infographie' tracking='Quiz infographie' />,
  },
}
