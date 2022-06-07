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
  justify-content: space-between;
  margin-bottom: 3rem;
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
    width: ${(props) => props.size[2]}rem;
  }
`
export const Emojis = styled(Emoji)`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.margin ? props.margin : 100)}%;
  margin: 0 auto 0.75rem;
  font-size: 2rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    font-size: 1.5rem;
    gap: 0.25rem;
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
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1;

  ${(props) => props.theme.mq.medium} {
    font-size: 2.5rem;
  }
  ${(props) => props.theme.mq.small} {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 2rem;
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
