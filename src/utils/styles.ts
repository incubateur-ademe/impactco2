import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import slick from './slick'

export const MEDIA = {
  LT: {
    XSMALL: '@media screen and (max-width: 30em)',
    SMALL: '@media screen and (max-width: 36em)',
    IFRAME_MEDIUM: '@media screen and (max-width: 42em)',
    MEDIUM: '@media screen and (max-width: 48em)',
    LARGE: '@media screen and (max-width: 60em)',
    XLARGE: '@media screen and (max-width: 72em)',
  },
}

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  ${slick}
  .slick-dots  {
    li {
      button {
        border: 0.125rem solid var(--primary-50);
      }

      &.slick-active {
        button {
          background: var(--primary-50);
        }
      }
    }
  }

  .slick-prev {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='white'/%3E%3C/svg%3E%0A");
  }

  .slick-next {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='white'/%3E%3C/svg%3E%0A");
  }

  html {
    box-sizing: border-box;
  }

  body {
    font-family: "Marianne", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    background-color: var(--neutral-00);
    color: var(--neutral-70);
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

  .title-h1,
  h1 {
    font-size: 2.5rem;
    line-height: 3.25rem;
    margin-bottom: 1.5rem;
  }
  
  .title-h2,
  h2 {
    font-size: 2rem;
    line-height: 2.75rem;
    margin-bottom: 1.25rem;
  }

  .title-h3,
  h3 {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  .title-h4,
  h4 {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .title-h5,
  h5 {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }

  .title-h6,
  h6 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  a {
    color: var(--primary-50);
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
