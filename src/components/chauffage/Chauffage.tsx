import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useScreenshot from 'hooks/useScreenshot'
import DataContext from 'components/providers/DataProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Simulator from 'components/misc/Simulator'
import CategoryWrapper from 'components/misc/category/CategoryWrapper'
import Header from 'components/misc/category/Header'
import SliderWithInput from 'components/misc/slider/SliderWithInput'

const DEFAULT_M2 = 63

const Chauffage = ({ category, iframe }: { category: Category; iframe?: boolean }) => {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('chauffage', 'Chauffage')

  const router = useRouter()
  const [value, setValue] = useState(DEFAULT_M2)
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
          onClick: () => track('Chauffage', 'Navigation equivalent', equivalent.slug),
        })),
    [equivalents, category, value]
  )

  const content = (
    <SectionWideContent $size='xs' $noGutter>
      <CategoryWrapper category={category} ref={ref} isScreenshotting={isScreenshotting} iframe={iframe}>
        <Simulator text='Indiquer la surface à chauffer pour découvrir la quantité de CO2e émise par mode de chauffage pour cette surface par année.'>
          <SliderWithInput value={value} setValue={setValue} unit='m2' digit={3} tracking='Chauffage' />
        </Simulator>
        <BarChart equivalents={equivalentsOfCategory} category={category} />
      </CategoryWrapper>
    </SectionWideContent>
  )

  return iframe ? (
    content
  ) : (
    <Section $withoutPadding>
      <SectionWideContent $size='sm'>
        <Header category={category} params={{ m2: value.toString() }} takeScreenshot={takeScreenshot} />
        {content}
      </SectionWideContent>
    </Section>
  )
}

export default Chauffage
