import dynamic from 'next/dynamic'
import { ComputedEquivalent } from 'types/equivalent'
import { OverScreenInfo } from 'types/overscreen'
import { getName } from 'utils/Equivalent/equivalent'
import Integrate from '../Integrate'
import Share from '../Share'

const UsageData = dynamic(() => import('../Data/UsageData'))

export const overScreenEquivalentValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => ({
  partager: {
    title: 'share',
    children: <Share path={equivalent.link} tracking={getName('fr', equivalent)} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={equivalent.link.replace('/outils/', '')} tracking={getName('fr', equivalent)} />,
  },
  usage: {
    title: 'usage',
    children: <UsageData />,
  },
})
