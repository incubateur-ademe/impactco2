import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'
import Link from 'components/base/buttons/Link'

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
  margin-bottom: 3rem;

  ${MEDIA.LT.SMALL} {
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

export const Emojis = styled(Emoji)<{ small?: boolean; xsmall?: boolean; margin?: number }>`
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

  ${MEDIA.LT.MEDIUM} {
    font-size: ${(props) => (props.small ? 0.75 : props.xsmall ? 0.375 : 1.5)}rem;
    gap: ${(props) => (props.xsmall ? 0 : 0.25)}rem;
  }
  ${MEDIA.LT.SMALL} {
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

  ${MEDIA.LT.SMALL} {
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

  ${MEDIA.LT.MEDIUM} {
    font-size: 2.5rem;
  }
  ${MEDIA.LT.SMALL} {
    font-size: 8vw;
  }
`

export const Small = styled.div`
  display: none;
  text-align: center;
`

export const LinkWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
`

export const StyledLink = styled(Link)`
  color: var(--primary-60);
  font-size: 0.875rem;
  position: relative;
  z-index: 12;
`
