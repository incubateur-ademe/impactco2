import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(${(props) => (props.column === 2 ? 50 : 33.3333)}% - 1rem);
  padding-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;

  ${(props) => props.theme.mq.medium} {
    width: calc(${(props) => (props.column === 2 ? 50 : 33.3333)}% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(${(props) => (props.column === 2 ? 50 : 100)}% - 0.5rem);
  }
`
const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledEmoji = styled(Emoji)`
  margin: 1.25rem 0 0;
  font-size: 2rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.875rem 0.5rem 0.625rem;
  font-size: ${(props) => (props.small ? 1 : 1.125)}rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Text = styled.p`
  margin: 0 0.5rem 0.625rem;
  font-size: 0.875rem;
  text-align: center;
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Svg = styled.svg`
  width: 1em;
  height: auto;
`
export default function SimpleTile(props) {
  return (
    <Wrapper column={props.column}>
      <Top>
        {props.emoji && <StyledEmoji>{props.emoji}</StyledEmoji>}
        {props.children}
        <Title small={props.small}>{props.title}</Title>
        {props.text && <Text>{props.text}</Text>}
      </Top>
      <StyledButton to={props.url}>
        {props.button || (
          <>
            Découvrir
            <Svg x='0px' y='0px' viewBox='0 0 283.178 283.178'>
              <path
                d='M254.812,140.713h-20c-4.142,0-7.5,3.358-7.5,7.5v91.186c0,4.84-3.939,8.778-8.779,8.778H43.776
		c-4.839,0-8.775-3.938-8.775-8.778V64.645c0-4.841,3.936-8.78,8.775-8.78h95.855c4.142,0,7.5-3.358,7.5-7.5v-20
		c0-4.142-3.358-7.5-7.5-7.5H43.776c-24.138,0-43.775,19.64-43.775,43.78v174.755c0,24.14,19.638,43.778,43.775,43.778h174.756
		c24.14,0,43.779-19.639,43.779-43.778v-91.186C262.312,144.071,258.954,140.713,254.812,140.713z'
              />
              <path
                d='M275.677,0h-79.553c-4.142,0-7.5,3.358-7.5,7.5v20c0,4.142,3.358,7.5,7.5,7.5h27.304
		L120.683,137.743c-2.929,2.929-2.929,7.677,0,10.607l14.142,14.143c1.407,1.407,3.314,2.197,5.304,2.197
		c1.989,0,3.897-0.79,5.303-2.197L248.177,59.748v27.303c0,4.142,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.358,7.5-7.5V7.5
		C283.177,3.358,279.819,0,275.677,0z'
              />
            </Svg>
          </>
        )}
      </StyledButton>
    </Wrapper>
  )
}

SimpleTile.Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
