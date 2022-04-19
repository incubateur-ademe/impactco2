import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'
import ModeSelector from 'components/misc/search/ModeSelector'
import Ecv from './details/Ecv'
import Share from './details/Share'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 0.5rem;
  font-size: 3rem;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
  }
`
const Title = styled.h1`
  margin: 0.25rem 0 0.5rem;
  font-size: 1.5rem;
  font-weight: normal;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
  }
`
const Value = styled.div`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.second};
  line-height: 1.1;
`
const Number = styled.span`
  font-size: 3rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.5rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`
export default function Details(props) {
  return (
    <>
      <ModeSelector />

      <Wrapper>
        <Header>
          <Title>
            1 {props.equivalent.name.fr.replaceAll('[s]', '').toLowerCase()}
          </Title>
          <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
        </Header>
        <Value>
          <Number>{props.equivalent.total}</Number>{' '}
          <Unit>
            kg <Big>CO2</Big>e
          </Unit>
        </Value>
        <Ecv equivalent={props.equivalent} />
        <Bottom>
          <Share />
          <MagicLink to='#sources' internal>
            Sources
          </MagicLink>
        </Bottom>
      </Wrapper>
    </>
  )
}
