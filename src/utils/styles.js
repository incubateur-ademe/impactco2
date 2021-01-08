import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

/*export const colors = {
  main: '#05386B',
  second: '#379683',
  third: '#5CDB95',
  fourth: '#8EE4AF',
  black: 'rgb(33, 33, 33)',
  white: '#fdfdfd',
  // text: '#EDF5E1'
  text: '#ffffdb',
}*/

export const breakpoints = {
  small: 730,
  mediumPortrait: 1000,
  medium: 1260,
  large: 1800,
  xlarge: 2000,
}
export const mq = {
  small: `@media screen and (max-width: ${breakpoints.small}px)`,
  medium: `@media screen and (max-width: ${breakpoints.medium}px)`,
  mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${breakpoints.medium}px)`,
  mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${breakpoints.medium}px)`,
  large: `@media screen and (min-width: ${breakpoints.large}px)`,
  xlarge: `@media screen and (min-width: ${breakpoints.xlarge}px)`,
}

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fonts};
    scroll-behavior: smooth;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.3;

    ${mq.small} {
      font-size: 0.875em;
    }
  } 

  *, *:before, *:after {
    margin-top: 0;
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }

  a {
    color: ${(props) => props.theme.colors.main};
  }
`
