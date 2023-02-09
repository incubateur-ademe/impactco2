import React from 'react'
import styled from 'styled-components'

import Detail from './result/Detail'
import Total from './result/Total'

const Wrapper = styled.div`
  margin-bottom: 2rem;
  margin-top: 1.5rem;
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
