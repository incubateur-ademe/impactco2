import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
  margin-bottom: 2rem;
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props.size[0]}rem;

  ${(props) => props.theme.mq.medium} {
    width: ${(props) => props.size[1]}rem;
  }
  ${(props) => props.theme.mq.small} {
    width: ${(props) => props.size[2]}vw;
  }
`
export const Emojis = styled(Emoji)`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) =>
    props.small ? '0.125rem 0.25rem' : props.xsmall ? 0 : '0.25rem 0.75rem'};
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.margin ? props.margin : 100)}%;
  margin: 0 auto 0.75rem;
  font-size: ${(props) => (props.small ? 1 : props.xsmall ? 0.5 : 2)}rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    font-size: ${(props) =>
      props.small ? 0.75 : props.xsmall ? 0.375 : 1.5}rem;
    gap: ;
    ${(props) => (props.xsmall ? 0 : 0.25)}rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.small ? 3.5 : props.xsmall ? 1.5 : 7)}vw;
    gap: ${(props) => (props.small ? 0.5 : props.xsmall ? 0 : 1)}vw;
  }
`
export const Label = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 300;

  strong {
    font-weight: normal;
  }

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export const Equals = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1;

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
  width: 100%;
  text-align: center;
`
export const StyledMagicLink = styled(MagicLink)`
  position: relative;
  z-index: 12;
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
