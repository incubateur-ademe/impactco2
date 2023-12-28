import React, { useContext, useMemo } from 'react'
import { Category as CategoryType } from 'types/category'
import formatName from 'utils/formatName'
import CategoryWrapper from 'components/misc/category/CategoryWrapper'
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

  return (
    <CategoryWrapper category={category} iframe={iframe} params={params}>
      <Search />
      <Hypothèses />
      <Result category={category} />
    </CategoryWrapper>
  )
}
