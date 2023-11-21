import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

const FormatText = styled.div`
  margin-bottom: 10rem;
  h1 {
    font-size: 3rem;
  }
`

export default function Documentation() {
  return (
    <Web title='Documentation'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Documentation</h1>
            <ul>
              <li>
                <Link href='/documentation/livraison-colis'>Livraison de colis</Link>
              </li>
              <li>
                <Link href='/documentation/livraison-colis-par-avion'>Livraison de colis par avion</Link>
              </li>
            </ul>
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}
