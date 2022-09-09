import React from 'react'
import styled from 'styled-components'

import { slugs, getMonth } from 'utils/months'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Month = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 3rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: ${(props) =>
    props.theme.colors[props.current ? 'background' : 'main']};
  background-color: ${(props) =>
    props.current ? props.theme.colors.main : 'transparent'};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  transition: background-color 300ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.current ? 'main' : 'mainLight']};
  }
`
export default function MonthSelector(props) {
  return (
    <Wrapper>
      {slugs.map((slug, index) => (
        <Month
          key={slug}
          to={`/empreinte-carbone/fruitsetlegumes/mois/${slug}`}
          current={props.month.slug === slug}
        >
          {getMonth(index).short}
        </Month>
      ))}
    </Wrapper>
  )
}
