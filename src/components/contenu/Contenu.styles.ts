import styled from 'styled-components'

export const Background = styled.div`
  background-color: var(--primary-10);
  height: 320px;
`

export const Content = styled.div`
  margin: -200px auto 0 auto;
  max-width: 62.5rem;

  .notion-frame {
    padding: 0;
  }

  .notion-page-no-cover {
    margin-top: 0 !important;
    padding-bottom: 0;
  }

  button.notion-link {
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }
`

export const Breadcrumb = styled.div`
  background-color: var(--neutral-00);
  padding: 2rem 0 1.5rem 0;
`
