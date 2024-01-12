import styled from 'styled-components'

export const Container = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .visible-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .visible-hidden:focus {
    background-color: var(--neutral-00);
    clip: auto;
    height: auto;
    overflow: auto;
    position: absolute;
    width: auto;
    z-index: 9;
  }
`
