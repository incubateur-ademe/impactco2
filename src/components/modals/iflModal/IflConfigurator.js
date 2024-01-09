import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Select from 'components/base/Select'
import ReuseBulb from 'components/livraison/ReuseBulb'
import IflCode from './IflCode'

export default function IflConfigurator(props) {
  return (
    <Wrapper>
      <Select
        onChange={({ value }) => props.setTheme(value)}
        label={
          <span>
            1) Choisissez le <strong>thème</strong> de votre iframe.
          </span>
        }
        name='theme'>
        <option value='default'>Clair</option>
        <option value='night'>Sombre</option>
      </Select>
      <IflCode type={props.path} theme={props.theme} />
      <br />
      <ReuseBulb />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2rem;
  padding: 1.5rem;
  padding-bottom: 0;
  ${MEDIA.LT.MEDIUM} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`
