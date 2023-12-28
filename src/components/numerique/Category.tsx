import React, { useContext, useMemo, useState } from 'react'
import { Category as CategoryType } from 'types/category'
import formatName from 'utils/formatName'
import ShareableContent from 'components/misc/ShareableContent'
import { OverScreenCategory } from 'components/misc/category/overScreens/Type'
import { overScreenCategoryValues } from 'components/misc/category/overScreens/Values'
import RulesContextNumerique from './RulesProviderNumerique'
import Hypothèses from './category/Hypothèses'
import Result from './category/Result'
import Search from './category/Search'

export default function Category({ category, iframe }: { category: CategoryType; iframe?: boolean }) {
  // @ts-expect-error: TODO
  const { engine, situation, numberEmails } = useContext(RulesContextNumerique)

  const params = useMemo(
    () => ({
      situation: {
        value: [
          { emoji: '📧', label: `${numberEmails} ${formatName('email[s]', numberEmails)}` },
          {
            emoji: '🎬',
            label: `${engine.evaluate('streaming . durée').nodeValue / 60}h de streaming`,
          },
          { emoji: '🎥', label: `${engine.evaluate('visio . durée').nodeValue / 60}h de viso` },
        ],
        params: `emails=${numberEmails}&${Object.entries(situation)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')}`,
      },
    }),
    [situation, engine, numberEmails]
  )

  const [overScreen, setOverScreen] = useState<OverScreenCategory | undefined>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(category, params), [category, params])

  return (
    <ShareableContent<OverScreenCategory>
      category={category}
      iframe={iframe}
      params={params}
      tracking={category.name}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}>
      <Search />
      <Hypothèses />
      <Result category={category} />
    </ShareableContent>
  )
}
