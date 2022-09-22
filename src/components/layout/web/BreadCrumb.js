import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  margin-bottom: 1.75rem;
  height: 1.05rem;
  font-size: 0.75rem;
  font-weight: 300;
`
export default function BreadCrumb(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper>
          {props.breadcrumb && props.breadcrumb.type === 'equivalent' && (
            <>
              <MagicLink to='/empreinte-carbone'>Catégories</MagicLink>
              {' > '}{' '}
              {props.breadcrumb.equivalent ? (
                <>
                  <MagicLink
                    to={`/empreinte-carbone/${props.breadcrumb.category.slug}`}
                  >
                    {props.breadcrumb.category.name}
                  </MagicLink>
                  {' > '}
                  {formatName(props.breadcrumb.equivalent.name, 1, true)}
                </>
              ) : (
                props.breadcrumb.category.name
              )}
            </>
          )}
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
