import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import FancySelect from 'components/base/FancySelect'
import { HiddenLabel } from 'components/form/HiddenLabel'

export default function MonthSelector({
  month,
  setMonth,
}: {
  month: number
  setMonth: Dispatch<SetStateAction<number>>
}) {
  return (
    <>
      <HiddenLabel htmlFor='month'>Découvres les fruits et légumes du mois de</HiddenLabel>
      <FancySelect
        name='month'
        value={month}
        onChange={(value: string) => {
          track('Fruits et légumes', 'Mois', value)
          setMonth(Number.parseInt(value))
        }}
        options={monthsOptions}
      />
    </>
  )
}
