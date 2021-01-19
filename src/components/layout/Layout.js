import React, { useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'

import Header from 'components/layout/Header'
import Footer from '@bit/datagir.simulateurs.footer'
import Embed from 'components/misc/Embed'
import Comparator from 'views/Comparator'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
export default function Layout() {
  const { setConfiguratorOpen } = useContext(UXContext)

  return (
    <Wrapper>
      <Content>
        <Header />
        <Comparator />
        <Footer
          setConfiguratorOpen={setConfiguratorOpen}
          sources={[
            {
              label: 'Base carbone®',
              href: 'https://data.ademe.fr/datasets/base-carbone(r)',
            },
          ]}
        />
      </Content>
      <Embed />
    </Wrapper>
  )
}
