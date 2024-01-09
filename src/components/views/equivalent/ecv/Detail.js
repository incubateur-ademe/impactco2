import React, { useState } from 'react'
import styled from 'styled-components'
import formatNumberPrecision from 'utils/formatNumberPrecision'
import formatPercent from 'utils/formatPercent'
import { MEDIA } from 'utils/styles'
import Button from 'components/base/buttons/Button'

const Toggle = styled(Button)`
  align-self: center;
  font-size: 0.875rem;
  font-weight: 300;

  ${MEDIA.LT.SMALL} {
    margin-bottom: 2rem;
  }
`
const Wrapper = styled.table`
  background-color: var(--secondary-10);
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;

  ${MEDIA.LT.SMALL} {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
`
const Item = styled.tr`
  td {
    padding: 0.5rem;
    white-space: nowrap;
    border-bottom: 0.0675rem solid var(--secondary-80);

    ${MEDIA.LT.SMALL} {
      padding: 0.5rem 0.25rem;
    }
  }
  &:last-child {
    td {
      border: none;
    }
  }
`
const Label = styled.td``
const Value = styled.td`
  font-size: 0.625em;
  font-weight: 300;
  text-align: right;

  strong {
    font-size: 1.6em;
  }
`
const Percent = styled.td`
  text-align: right;
`
export default function Detail(props) {
  const [details, setDetails] = useState(false)

  const order = [
    'Agriculture',
    'Transformation',
    'Emballage',
    'Transport',
    'Supermarché et distribution',
    'Consommation',
  ]

  return (
    <>
      <Toggle asLink onClick={() => setDetails((prevDetails) => !prevDetails)} className='noscreenshot'>
        {details ? 'Cacher' : 'Voir'} le détail
      </Toggle>
      {details && (
        <Wrapper>
          <tbody>
            {props.ecv
              .sort((a, b) => {
                let res = a.value < b.value ? 1 : -1
                if (a.label && b.label) {
                  res = order.indexOf(a.label) > order.indexOf(b.label) ? 1 : -1
                }
                return res
              })
              .map((item) => (
                <Item key={item.label}>
                  <Label>{item.label}</Label>
                  <Percent>{formatPercent(item.value, props.total)} %</Percent>
                  <Value>
                    <strong>{formatNumberPrecision(item.value)}</strong> CO
                    <sub>2</sub>e
                  </Value>
                </Item>
              ))}
            <Item>
              <Label>
                <strong>Total</strong>
              </Label>
              <Percent />
              <Value>
                <strong>{formatNumberPrecision(props.total)}</strong> CO
                <sub>2</sub>e
              </Value>
            </Item>
          </tbody>
        </Wrapper>
      )}
    </>
  )
}
