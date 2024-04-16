import { useTranslations } from 'next-intl'
import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import formatName from 'utils/formatName'

const Wrapper = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  text-align: center;
`

export default function Instruction({ category }: { category?: Category }) {
  const t = useTranslations('category')
  return (
    <Wrapper className={'noscreenshot'}>
      {t('list-header', {
        gender: category && category.gender === 'f' ? 'e' : '',
        name: formatName(category ? t(`equivalent-${category.slug}`) : t('equivalent')),
      })}
    </Wrapper>
  )
}
