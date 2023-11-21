import styled from 'styled-components'
import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'

export const Title = styled.h2`
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 2rem;
  text-align: center;
`
export const Equivalents = styled.div`
  align-items: center;
  display: flex;
  gap: 32px;
  justify-content: space-around;
  margin-bottom: 4.5rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
  }
`
export const Equivalent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
`
export const Emojis = styled(Emoji)`
  align-items: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  font-size: ${(props) => (props.small ? 1 : props.xsmall ? 0.5 : 2)}rem;
  gap: ${(props) => (props.xsmall ? '2px' : '2px 8px')};
  justify-content: center;
  margin: 0 auto 0.75rem;
  text-align: center;
  width: ${(props) => (props.margin ? props.margin : 100)}%;

  ${(props) => props.theme.mq.medium} {
    font-size: ${(props) => (props.small ? 0.75 : props.xsmall ? 0.375 : 1.5)}rem;
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
  height: 20px;
  max-width: 130px;
  text-align: center;
  top: 100%;
  width: max-content;

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
  margin-bottom: 2rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 2.5rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 8vw;
  }
`
export const Small = styled.div`
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
