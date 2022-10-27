import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from '../RulesProvider'
import Slider from 'components/base/Slider'
import Select from 'components/base/Select'
import HorizontalRadio from 'components/base/HorizontalRadio'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Column = styled.div``
const Title = styled.h4`
  font-weight: 300;

  strong {
    font-weight: bold;
  }
`
const Color = styled.span`
  color: ${(props) => props.color};
`
const Parameters = styled.div`
  display: flex;
  gap: 1rem;
`
export default function Search() {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <Wrapper>
      <Column>
        <Title>
          <strong>
            350 <Color color='#ff0000'>emails</Color>
          </strong>{' '}
          envoyés
        </Title>
        <Slider color='#ff0000' />
        <Parameters>
          <Select color='#ff0000'>
            <option value={`'smartphone'`}>📱</option>
            <option value={`'tablette'`}>📱</option>
            <option value={`'ordinateur portable'`}>💻</option>
            <option value={`'ordinateur et écran'`}>🖥</option>
            <option value={`'TV'`}>📺</option>
          </Select>
          <HorizontalRadio
            color='#ff0000'
            options={[
              {
                value: `'fixe FR'`,
                label: `Wifi`,
              },
              {
                value: `'mobile FR'`,
                label: `4G`,
              },
            ]}
          />
        </Parameters>
      </Column>
    </Wrapper>
  )
}
