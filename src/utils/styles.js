import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const themes = {
  default: {
    name: 'Clair',
    colors: {
      main: '#E01B0B',
      mainLight: '#F6BFC3',
      second: '#32337B',
      secondLight: '#E5EDF5',
      background: '#ffffff',
      footer: '#F6F7F9',
      text: '#383838',
      error: 'red',
    },
    fonts: {
      body: '"Marianne", sans-serif',
      title: '"Marianne", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${40}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
  night: {
    name: 'Sombre',
    colors: {
      main: '#F6BFC3',
      second: '#E5EDF5',
      secondLight: '#383838',
      background: '#1e1e1e',
      footer: '#383838',
      text: '#ffffff',
      error: 'red',
    },
    fonts: {
      body: '"Marianne", sans-serif',
      title: '"Marianne", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${40}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: ${(props) => props.theme.fonts.body};
    line-height: 1.4;
    text-rendering: geometricPrecision;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  } 

  *, *:before, *:after {
    margin-top: 0;
    box-sizing: inherit;
  }

  #root {
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-family: ${(props) => props.theme.fonts.title};
    color: ${(props) => props.theme.colors.second};
    font-weight: bold;
    line-height: 1.2;
  }

  h2 {
    font-size: 2rem;

    ${(props) => props.theme.mq.small} {
      font-size: 1.5rem;
    }
  }

  a {
    color: ${(props) => props.theme.colors.main};
  }

  option {
    color: #010101;
  }
`
