import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import slick from './slick'

export const themes = {
  default: {
    name: 'Clair',
    colors: {
      main: '#26827C',
      main2: '#39a69e',
      main3: '#1C9B93',
      main4: '#34A59E',
      mainLight: '#DFECEB',
      mainWhite: '#ffffff',
      mainDark: '#1D625E',
      second: '#EFF4F9',
      secondDark: '#B1D4F6',
      sky: '#b5d0fa',
      firstBlue: '#457be7',
      background: '#ffffff',
      darkBackground: '#F9F7F8',
      text: 'var(--neutral-70)',
      persistentText: '#383838',
      textLight: '#FBFBFC',
      textLight2: '#f9f7f8',
      linkGray: '#110D10',
      textGray: '#847881',
      textGray2: '#746770',
      deepDark: '#272124',
      deepDarkReversible: '#272124',
      error: '#ce0500',
      errorLight: '#ffdddd',
      warning: '#fc5d00',
    },
    mq: {
      never: `@media screen and (max-width: ${0}em)`, // HACK
      xsmall: `@media screen and (max-width: ${30}em)`,
      small: `@media screen and (max-width: ${36}em)`,
      iframemedium: `@media screen and (max-width: ${42}em)`,
      medium: `@media screen and (max-width: ${48}em)`,
      large: `@media screen and (max-width: ${60}em)`,
      xlarge: `@media screen and (max-width: ${72}em)`,
      xxlarge: `@media screen and (max-width: ${90}em)`, // 1440px
    },
  },
  night: {
    name: 'Sombre',
    colors: {
      main: '#E8F8F7',
      main2: '#dcf8f6',
      main3: '#26827C',
      main4: '#dcf8f6',
      mainLight: '#17635E',
      mainWhite: '#DFECEB26827C',
      mainDark: '#1D625E',
      firstBlue: '#457be7',
      second: '#383838',
      background: '#000',
      darkBackground: '#F9F7F8',
      footer: '#383838',
      footerLight: '#1e1e1e',
      text: '#ffffff',
      persistentText: '#383838',
      textLight: '#939699',
      textLight2: '#a6a8ab',
      textGray: '#eceef0',
      linkGray: '#eceef0',
      textGray2: '#746770',
      deepDark: '#272124',
      deepDarkReversible: '#eceef0',
      error: '#ff5655',
      sky: '#383838',
      warning: '#fc5d00',
    },
    mq: {
      never: `@media screen and (max-width: ${0}em)`, // HACK
      xsmall: `@media screen and (max-width: ${30}em)`,
      small: `@media screen and (max-width: ${36}em)`,
      iframemedium: `@media screen and (max-width: ${42}em)`,
      medium: `@media screen and (max-width: ${48}em)`,
      large: `@media screen and (max-width: ${60}em)`,
      xlarge: `@media screen and (max-width: ${72}em)`,
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

  .slick-prev {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='%23${(
      props
    ) => props.theme.colors.background.replace('#', '')}'/%3E%3C/svg%3E%0A");
  }

  .slick-next {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='%23${(
      props
    ) => props.theme.colors.background.replace('#', '')}'/%3E%3C/svg%3E%0A");
  }

  html {
    box-sizing: border-box;
  }

  body {
    font-family: "Marianne", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  *, *:before, *:after {
    margin-top: 0;
    box-sizing: inherit;
  }

  #__next {
    overflow: hidden;
    width: 100%;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    line-height: 3.25rem;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 2rem;
    line-height: 2.75rem;
  }

  h3 {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  h5 {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }

  h6 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  a {
    color: ${(props) => props.theme.colors.main};
  }

  option {
    color: #383838;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  button, input, optgroup, select, textarea {
    line-height: 1;
  }

  .text-secondary {
    color: var(--primary-50)
  }

  .text-xl {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .text-xs {
    font-size: 0.75rem;
    line-height: 1.25rem;
  }
`
