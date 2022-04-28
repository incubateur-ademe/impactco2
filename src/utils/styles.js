import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import slick from './slick'

export const themes = {
  default: {
    name: 'Clair',
    colors: {
      main: '#26827C',
      mainLight: '#DFECEB',
      second: '#004899',
      secondLight: '#EFF4F9',
      secondLighter: '#E0EDFA',
      background: '#ffffff',
      footer: '#F6F7F9',
      footerLight: '#FBFBFC',
      text: '#383838',
      textLight: '#939699',
    },
    fonts: {
      body: '"Marianne", Arial, sans-serif',
      title: '"Marianne", Arial, sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${39}em)`,
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
      main: '#E8F8F7',
      mainLight: '#F6BFC3',
      second: '#E5EDF5',
      secondLight: '#383838',
      background: '#1e1e1e',
      footer: '#383838',
      footerLight: '#1e1e1e',
      text: '#ffffff',
      textLight: '#939699',
    },
    fonts: {
      body: '"Marianne", Arial, sans-serif',
      title: '"Marianne", Arial, sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${39}em)`,
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

  ${slick}
  .slick-dots  {
    li {
      button {
        border: 0.125rem solid ${(props) => props.theme.colors.main};
      }

      &.slick-active {
        button {
          background: ${(props) => props.theme.colors.main};
        }
      }
    }
  }

  html {
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fonts.body};
    line-height: 1.4;
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
    font-weight: bold;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.25rem;
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`
