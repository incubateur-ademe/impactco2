import { createGlobalStyle } from 'styled-components'

export const NotionStyles = createGlobalStyle`
.notion {
  font-family: "Marianne", Arial, sans-serif;
}

.notion-page {
  padding: 0;
  max-width: 40rem;
  width: 100%;
}

.notion-title {
  color: var(--neutral-80);
  font-weight: 700;
  text-align: center;
  font-size: 2.5rem;
  line-height: 3.25rem;
  margin-bottom: 2.5rem;
}

.notion-h {
  margin-bottom: 1.5rem;
  padding: 0;
}

.notion-h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.75rem; 
}

.notion-text {
  color: var(--neutral-70);
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.notion-link {
  opacity: 1;
  border: none;
  text-decoration: underline;
}

.notion-toggle {
  padding: 0;
  margin: 0;
  border-bottom: solid 1px var(--neutral-20);

  summary {
    position: relative;

    &::marker {
      content: '';
    }

    &::after {
      content: url(/open-icon.png);
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 6.25rem;
      border: 1px solid var(--primary-30);
      color: var(--primary-50);
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    &:hover {
      &::after {
        background-color: var(--primary-10);
      }
    }
  }

  .notion-toggle {
    summary {
      &::marker {
        content: unset;
      }
      &::after {
        content: '';
        border: none;
        background-color: transparent !important; 
      }
    }
  }

  h1,
  h2,
  h3 {
    margin: 0;
    padding: 1.25rem 2rem 1.25rem 0;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem; 
  }
}

.notion-toggle[open] {
  summary::after {
    transform: translateY(-50%) rotate(45deg);
  }
}

.notion-callout {
  width: fit-content;
  margin: 0 auto 1.5rem auto;
  border-radius: 0.25rem;
  border: 1px solid var(--neutral-20);
  background: var(--neutral-10);
  padding: 0.25rem 0.5rem;

  color: var(--neutral-60);
  font-family: Marianne;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}
`
