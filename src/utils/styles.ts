'use client'

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
  `
