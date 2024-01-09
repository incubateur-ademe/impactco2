import styled from 'styled-components'
import { useUrl } from 'hooks/useUrl'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1rem 1rem 1rem 0;
`
export default function BreadCrumb3() {
  const { pathname } = useUrl() ?? {}

  return (
    <Section $withoutPadding>
      <SectionWideContent>
        <div aria-label="fil d'ariane">
          <Wrapper>
            <Link href='/'>Accueil</Link>
            {' > '}
            <Link href='/documentation'>Documentation</Link>
            {pathname?.includes('livraison-colis-par-avion') ? (
              <>
                {' > '} <>Livraison d'un colis par avion</>
              </>
            ) : (
              <>
                {' > '} <>Livraison d'un colis</>
              </>
            )}
          </Wrapper>
        </div>
      </SectionWideContent>
    </Section>
  )
}
