import { ComputedEquivalent } from 'types/equivalent'
import { OverScreenInfo } from 'types/overscreen'
import { getName } from 'utils/Equivalent/equivalent'
import Integrate from '../Integrate'
import Share from '../Share'

export const overScreenEquivalentInfographyValues: (
  equivalent: ComputedEquivalent,
  equivalents: string[]
) => Record<string, OverScreenInfo> = (equivalent, equivalents) => ({
  partager: {
    title: 'share',
    children: (
      <Share path={equivalent.link} tracking={`${getName('fr', equivalent)} infographie`} anchor='infographie' />
    ),
  },
  integrer: {
    title: 'integrate',
    children: (
      <Integrate
        path='/infographie'
        extraParams={`equivalents=${equivalents.join(',')}`}
        tracking={`${getName('fr', equivalent)} infographie`}
      />
    ),
  },
})
