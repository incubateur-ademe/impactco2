'use client'

import { useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EtiquetteContent from 'components/comparateur/Etiquette'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentEtiquetteValues } from 'components/shareable/overScreens/Values/Etiquette'

const Etiquette = ({ equivalent }: { equivalent: ComputedEquivalent }) => {
  const { language } = useParamContext()
  const overScreens = useMemo(() => overScreenEquivalentEtiquetteValues(equivalent), [equivalent])
  const ref = useRef(null)
  return (
    <Shareable
      slug='etiquette'
      overScreens={overScreens}
      tracking={`${getName('fr', equivalent)}-Etiquette`}
      secondary=''>
      <EtiquetteContent
        baseValue={((equivalent.value / ((equivalent.carpool || 0) + 1)) * 1000).toString()}
        comparisons={[`${equivalent.slug}${equivalent.carpool ? `+${equivalent.carpool}` : ''}`]}
        ref={ref}
        language={language}
      />
    </Shareable>
  )
}

export default Etiquette
