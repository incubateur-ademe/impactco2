import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useDataContext from 'components/providers/DataProvider'
import BarChart from 'components/charts/BarChart'
import Simulator from 'components/misc/Simulator'
import CategoryWrapper from 'components/misc/category/CategoryWrapper'
import SliderWithInput from 'components/misc/slider/SliderWithInput'

const DEFAULT_M2 = 63

const Chauffage = ({ category, iframe }: { category: Category; iframe?: boolean }) => {
  const router = useRouter()
  const [value, setValue] = useState(DEFAULT_M2)
  const { equivalents } = useDataContext()

  useEffect(() => {
    if (router.query.m2) {
      const m2 = Number.parseInt(router.query.m2 as string)
      if (!Number.isNaN(m2)) setValue(m2)
    }
  }, [router])

  const equivalentsOfCategory = useMemo(
    () =>
      equivalents
        .filter((equivalent) => equivalent.category === category.id)
        .map((equivalent) => ({
          ...equivalent,
          title: formatName(equivalent.name, 1, true),
          value: computeECV(equivalent) * value,
          usage: 0,
          onClick: () => track('Chauffage', 'Navigation equivalent', equivalent.slug),
        })),
    [equivalents, category, value]
  )

  return (
    <CategoryWrapper category={category} iframe={iframe} params={{ m2: value.toString() }} withFooter>
      <Simulator
        text={
          <>
            Indiquer la surface à chauffer pour découvrir la quantité de CO<sub>2</sub>e émise par mode de chauffage
            pour cette surface par année.
          </>
        }>
        <SliderWithInput
          value={value}
          setValue={setValue}
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
