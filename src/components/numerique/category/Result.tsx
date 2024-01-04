import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import Detail from './result/Detail'
import Total from './result/Total'

const Wrapper = styled.div`
  margin-top: 1.5rem;
  ${(props) => props.theme.mq.medium} {
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
