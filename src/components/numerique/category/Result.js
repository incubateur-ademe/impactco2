import React from 'react'
import styled from 'styled-components'

import Total from './result/Total'
import Detail from './result/Detail'

const Wrapper = styled.div`
  margin-bottom: 2rem;
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
