import React from 'react'
import styled from 'styled-components'

import Total from './result/Total'
import Construction from './result/Construction'
import Chart from './result/Chart'

const Wrapper = styled.div``
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 1.5rem 1.5rem;
`
export default function Result(props) {
  return (
    <Wrapper>
      <Top>
        <Total numberEmails={props.numberEmails} />
        <Construction numberEmails={props.numberEmails} />
      </Top>
      <Chart numberEmails={props.numberEmails} />
    </Wrapper>
  )
}
