import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import DataContext from 'components/providers/DataProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Simulator from 'components/misc/Simulator'
import Wrapper from 'components/misc/category/Wrapper'
import SliderWithInput from 'components/misc/slider/SliderWithInput'

const Chauffage = ({ category }: { category: Category }) => {
  const router = useRouter()
  const [value, setValue] = useState(63)
  const { equivalents } = useContext(DataContext)

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
        })),
    [equivalents, category, value]
  )

  return (
    <Section $withoutPadding>
      <SectionWideContent $small>
        <Wrapper name={category.title || category.name} slug={category.slug} urlParams={`?m2=${value}`}>
          <Simulator text='Indiquer la surface à chauffer pour découvrir la quantité de CO2e émise par mode de chauffage pour cette surface par année.'>
            <SliderWithInput value={value} setValue={setValue} unit='m2' digit={3} />
          </Simulator>
          <BarChart equivalents={equivalentsOfCategory} category={category} />
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}

export default Chauffage
