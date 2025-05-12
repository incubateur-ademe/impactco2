import { ComputedEquivalent } from 'types/equivalent'
import { OverScreenInfo } from 'types/overscreen'
import { getName } from 'utils/Equivalent/equivalent'
import Integrate from '../Integrate'

export const overScreenEquivalentEtiquetteValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => {
  const params = `value=${equivalent.value}&comparisons=${equivalent.slug}`

  return {
    integrer: {
      title: 'integrate',
      children: <Integrate path='/comparateur/etiquette' extraParams={params} tracking={getName('fr', equivalent)} />,
    },
  }
}
