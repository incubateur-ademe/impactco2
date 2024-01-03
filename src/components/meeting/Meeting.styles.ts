import styled from 'styled-components'
import Link from 'components/base/buttons/Link'

export const Arrow = styled.div`
  display: inline-block;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
`
export const StyledLink = styled(Link)`
  width: fit-content;
  &:hover {
    ${Arrow} {
      transform: translateX(0.5rem);
    }
  }
`
