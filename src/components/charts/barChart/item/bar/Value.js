import React from 'react'
import styled from 'styled-components'
import formatNumber from 'utils/formatNumber'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  align-items: baseline;
  color: ${(props) => (props.$inside ? 'var(--neutral-00)' : 'var(--primary-60)')};
  display: flex;
  left: ${(props) => (props.$inside ? 'auto' : '100%')};
  line-height: 0.7;
  padding-left: ${(props) => (props.$noBar ? 0 : 0.5)}rem;
  position: absolute;
  right: ${(props) => (props.$inside ? '1rem' : 'auto')};
  top: 50%;
  transform: translateY(-50%);
`
const Number = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  margin-right: 0.6rem;

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }
`
const Unit = styled.span`
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
`
export default function Value(props) {
  return (
    <Wrapper $noBar={props.value / props.max === 0} $inside={props.value / props.max > 0.7}>
      <Number data-testid='bar-chart-item-value'>{formatNumber(props.value)}</Number>
      <Unit>
        {' '}
        kg CO
        <sub>2</sub>e
      </Unit>
    </Wrapper>
  )
}
