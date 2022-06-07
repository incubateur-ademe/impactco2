import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
`
export const Equivalents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`
export const Equivalent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.large ? 12 : props.medium ? 10 : 7.5)}rem;
`
export const Emojis = styled(Emoji)`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.large ? 70 : 100)}%;
  min-height: 5.625rem;
  margin: 0 auto 0.25rem;
  font-size: 2rem;
  text-align: center;
`
export const Label = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 300;

  strong {
    font-weight: normal;
  }
`
export const Equals = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
`
export const LinkWrapper = styled.div`
  width: 100%;
  text-align: center;
`
export const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
`
export function CenterLink(props) {
  return (
    <LinkWrapper>
      <StyledMagicLink to={props.to} className='noscreenshot'>
        {props.children}
      </StyledMagicLink>
    </LinkWrapper>
  )
}
