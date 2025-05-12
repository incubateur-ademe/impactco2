import { ComputedEquivalent } from 'types/equivalent'
import { OverScreenInfo } from 'types/overscreen'
import { getName } from 'utils/Equivalent/equivalent'
import Integrate from '../Integrate'
import Share from '../Share'

export const overScreenEquivalentImageInfographyValues: (
  equivalent: ComputedEquivalent,
  index: number
) => Record<string, OverScreenInfo> = (equivalent, index) => ({
  partager: {
    title: 'share',
    children: (
      <Share
        noLanguage
        anchor={`image-infographie-${index}`}
        path={equivalent.link}
        tracking={`${getName('fr', equivalent)} image infographie ${index}`}
      />
    ),
  },
  integrer: {
    title: 'integrate',
    children: (
      <Integrate
        noLanguage
        path={`/image-infographie/${equivalent.slug}/${index}`}
        tracking={`${getName('fr', equivalent)} image infographie ${index}`}
      />
    ),
  },
})
