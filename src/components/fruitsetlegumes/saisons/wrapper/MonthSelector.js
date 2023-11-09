import { useRouter } from 'next/router'
import React from 'react'
import { getMonth, slugs } from 'utils/months'
import useIframe from 'hooks/useIframe'
import FancySelect from 'components/base/FancySelect'

export default function MonthSelector(props) {
  const iframe = useIframe()

  const router = useRouter()

  return (
    <FancySelect
      value={props.month.slug}
      onChange={(value) => {
        router.push(`${iframe ? '/iframes' : ''}/fruitsetlegumes/mois/${value}`)
      }}
      options={slugs.map((slug, index) => ({
        value: slug,
        label: getMonth(index).long,
      }))}
    />
  )
}
