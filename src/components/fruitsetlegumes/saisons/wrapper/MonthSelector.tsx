import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import FancySelect from 'components/base/FancySelect'

export default function MonthSelector({
  month,
  setMonth,
}: {
  month: number
  setMonth: Dispatch<SetStateAction<number | undefined>>
}) {
  return (
    <FancySelect
      value={month}
      onChange={(value: string) => {
        track('Fruits et légumes', 'Mois', value)
        setMonth(Number.parseInt(value))
      }}
      options={monthsOptions}
    />
  )
}
