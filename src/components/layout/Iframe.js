import React from 'react'
import styled from 'styled-components'

import IframeFooter from 'components/layout/IframeFooter'

const Wrapper = styled.div``
const Content = styled.div`
  position: relative;
  width: 46rem;
  margin: 0 auto;
  padding: 2rem 0.5rem;

  ${(props) => props.theme.mq.small} {
    width: 100%;
  }
`
export default function Iframe(props) {
  useEffect(() => {
    window?._paq?.push(['setCookieSameSite', 'None'])
  }, [])

  return (
    <Wrapper>
      <Content>{props.children}</Content>
      <IframeFooter about={process.env.GATSBY_URL} />
    </Wrapper>
  )
}
