import React, { useMemo } from 'react'
import { Category } from 'types/category'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import BarChart from 'components/charts/BarChart'
import Simulator from 'components/misc/Simulator'
import CategoryWrapper from 'components/misc/category/CategoryWrapper'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import SliderWithInput from 'components/misc/slider/SliderWithInput'

const Chauffage = ({ category, iframe }: { category: Category; iframe?: boolean }) => {
  const {
    chauffage: { m2, setM2 },
  } = useParamContext()

  const equivalentsOfCategory = useMemo(
    () =>
      computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .map((equivalent) => ({
          ...equivalent,
          title: formatName(equivalent.name, 1, true),
          value: equivalent.value * m2,
          usage: 0,
          onClick: () => track('Chauffage', 'Navigation equivalent', equivalent.slug),
        })),
    [category, m2]
  )

  return (
    <CategoryWrapper
      category={category}
      iframe={iframe}
      params={{ m2: { value: m2, setter: setM2 } as CustomParamValue }}
      withFooter>
      <Simulator
        text={
          <>
            Découvrez la quantité de CO<sub>2</sub>e que vous émettez pour chauffer cette surface par année
          </>
        }>
        <SliderWithInput
          value={m2}
          setValue={setM2}
          unit='m²'
          digit={3}
          tracking='Chauffage'
          aria-label='Surface à chauffer'
        />
      </Simulator>
      <BarChart equivalents={equivalentsOfCategory} category={category} />
    </CategoryWrapper>
  )
}

export default Chauffage
