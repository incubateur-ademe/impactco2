'use client'

import React, { useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EtiquetteContent from 'components/comparateur/Etiquette'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentEtiquetteValues } from 'components/shareable/overScreens/Values'

const Etiquette = ({ equivalent }: { equivalent: ComputedEquivalent }) => {
  const { language } = useParamContext()
  const overScreens = useMemo(() => overScreenEquivalentEtiquetteValues(equivalent), [equivalent])
  const ref = useRef(null)
  return (
    <Shareable overScreens={overScreens} tracking={`${getName('fr', equivalent)}-Etiquette`} secondary='' withoutShare>
      <EtiquetteContent
        baseValue={(equivalent.value * 1000).toString()}
        comparisons={[equivalent.slug]}
        ref={ref}
        language={language}
      />
    </Shareable>
  )
}

export default Etiquette
