import React from 'react'
import styled from 'styled-components'

import ModeSelector from './search/ModeSelector'
import Equivalents from './search/Equivalents'
import Categories from './search/Categories'
import Co2 from './search/Co2'

const Wrapper = styled.div``
const Content = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
export default function Search(props) {
  return (
    <Wrapper>
      <ModeSelector />
      <Content>
        {props.type === 'equivalents' && <Equivalents />}
        {props.type === 'categories' && <Categories />}
        {props.type === 'co2' && <Co2 />}
      </Content>
    </Wrapper>
  )
}
