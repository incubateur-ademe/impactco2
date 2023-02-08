import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

export const Title = styled.h3`
  font-weight: normal;
  margin-bottom: 2rem;
  text-align: center;
`
export const Equivalents = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4.5rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
  }
`
export const Equivalent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: ${(props) => props.size[0]}rem;

  ${(props) => props.theme.mq.medium} {
    width: ${(props) => props.size[1]}rem;
  }
  ${(props) => props.theme.mq.small} {
    width: ${(props) => props.size[2]}vw;
  }
`
export const Emojis = styled(Emoji)`
  align-items: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  font-size: ${(props) => (props.small ? 1 : props.xsmall ? 0.5 : 2)}rem;
  gap: ${(props) =>
    props.small ? '0.125rem 0.25rem' : props.xsmall ? 0 : '0.25rem 0.75rem'};
  justify-content: center;
  margin: 0 auto 0.75rem;
  text-align: center;
  width: ${(props) => (props.margin ? props.margin : 100)}%;

  ${(props) => props.theme.mq.medium} {
    font-size: ${(props) =>
      props.small ? 0.75 : props.xsmall ? 0.375 : 1.5}rem;
    gap: ${(props) => (props.xsmall ? 0 : 0.25)}rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.small ? 3.5 : props.xsmall ? 1.5 : 7)}vw;
    gap: ${(props) => (props.small ? 0.5 : props.xsmall ? 0 : 1)}vw;
  }
`
export const Label = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 100%;

  strong {
    font-weight: normal;
  }

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export const Equals = styled.div`
  align-items: center;
  display: flex;
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 1rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 2.5rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 8vw;
  }
`
export const Small = styled.p`
  display: none;
  text-align: center;
  ${(props) => props.theme.mq.small} {
    display: block;
  }
`
export const LinkWrapper = styled.div`
  text-align: center;
  width: 100%;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
  }
`
export const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
  position: relative;
  z-index: 12;
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
