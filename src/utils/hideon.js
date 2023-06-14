import { css } from 'styled-components'

/**
 *
 * Allow to hide a component below a given media query.
 *
 * Usage : <MySearchBar hideon={'large'} />
 *
 * Definition:
 *
 * import hideon from 'utils/hideon.js'
 * const Wrapper = styled.form`${hideon}`
 * export default function MySearchBar(props) {return (<Wrapper hideon={props.hideon}></Wrapper>
 *
 */
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
