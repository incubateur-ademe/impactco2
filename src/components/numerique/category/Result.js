import React from 'react'
import styled from 'styled-components'

import Total from './result/Total'
import Construction from './result/Construction'
import Chart from './result/Chart'

const Wrapper = styled.div`
  margin-bottom: 2rem;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 1.5rem 1.5rem;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    gap: 1.5rem;
    margin: 0 0 1.5rem;
  }
`
export default function Result(props) {
  return (
    <Wrapper>
      <Top>
        <Total
          numberEmails={props.numberEmails}
          construction={props.construction}
        />
        <Construction
          numberEmails={props.numberEmails}
          construction={props.construction}
        />
      </Top>
      <Chart
        numberEmails={props.numberEmails}
        construction={props.construction}
      />
    </Wrapper>
  )
}
