import { css } from 'styled-components'

export const hideon = css`
  ${(props) => {
    if (!props.hideon) {
      return true
    } else {
      return props.theme.mq[props.hideon]
    }
  }} {
    display: none;
  }
`
