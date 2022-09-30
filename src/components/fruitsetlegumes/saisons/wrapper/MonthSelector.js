import React from 'react'
import { useRouter } from 'next/router'

import { slugs, getMonth } from 'utils/months'
import useIframe from 'hooks/useIframe'
import FancySelect from 'components/base/FancySelect'

export default function MonthSelector(props) {
  const iframe = useIframe()

  const router = useRouter()

  return (
    <FancySelect
      value={props.month.slug}
      onChange={(value) => {
        router.push(
          `${
            iframe ? '/iframes' : ''
          }/empreinte-carbone/fruitsetlegumes/mois/${value}`
        )
      }}
      options={slugs.map((slug, index) => ({
        value: slug,
        label: getMonth(index).long,
      }))}
    />
  )
}
