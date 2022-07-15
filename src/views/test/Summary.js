import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'utils/RulesContext'
import { formatNumber } from 'utils/formatters'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`
const Category = styled.button`
  position: relative;
  padding: 0 0 0.0625rem;
  font-size: 0.875rem;
  color: ${(props) => props.color || props.theme.colors.main};
  background: transparent;
  border: none;
  overflow: hidden;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.125rem;
    transform: translateX(${(props) => (props.current ? 0 : -100)}%);
    background-color: ${(props) => props.color || props.theme.colors.main};
  }
  &:hover {
    &:before {
      transform: translateX(100%);
      transition: transform 500ms ease-out;
    }
  }
  &:focus {
    &:before {
      transform: translateX(0);
    }
  }
`
const Transition = styled.div`
  padding-bottom: 0.0625rem;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.2;
`
const Number = styled.span`
  font-size: 1rem;
  font-weight: bold;
`
const Unit = styled.span`
  font-size: 0.75rem;
  white-space: nowrap;
`
export default function Summary() {
  const { engine, categories, curCategory, setCurCategory } =
    useContext(RulesContext)

  return (
    <Wrapper>
      {categories.map((category) => (
        <>
          <Category
            onClick={() => setCurCategory(category)}
            current={category === curCategory}
            color={category.rawNode['couleur']}
          >
            {category.title}
          </Category>
          <Transition>{'>'}</Transition>
        </>
      ))}
      <Category
        onClick={() => setCurCategory('end')}
        current={curCategory === 'end'}
      >
        <Number>{formatNumber(engine.evaluate('bilan').nodeValue)}</Number>
        <Unit>
          {' '}
          kg CO
          <sub>2</sub>e
        </Unit>
      </Category>
    </Wrapper>
  )
}
