import React from 'react'
import styled from 'styled-components'

import Total from './result/Total'
import Detail from './result/Detail'

const Wrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  ${(props) => props.theme.mq.medium} {
    margin-top: 1rem;
  }
`
export default function Result(props) {
  return (
    <Wrapper>
      <Total
        numberEmails={props.numberEmails}
        construction={props.construction}
      />
      <Detail numberEmails={props.numberEmails} />
    </Wrapper>
  )
}
