import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { MEDIA } from 'utils/styles'
import Detail from './result/Detail'
import Total from './result/Total'

const Wrapper = styled.div`
  margin-top: 1.5rem;
  ${MEDIA.LT.MEDIUM} {
    margin-top: 1rem;
  }
`
export default function Result({ category }: { category: Category }) {
  return (
    <Wrapper>
      <Total />
      <Detail category={category} />
    </Wrapper>
  )
}
