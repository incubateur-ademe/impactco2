import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  margin-bottom: 2rem;
  height: 1.05rem;
  font-size: 0.75rem;
  font-weight: 300;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function BreadCrumb(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper>
          {props.breadcrumb && props.breadcrumb.type === 'equivalent' && (
            <>
              <MagicLink to='/categories'>Catégories</MagicLink>
              {' > '}{' '}
              {props.breadcrumb.equivalent ? (
                <>
                  <MagicLink
                    to={`/categories/${props.breadcrumb.category.slug}`}
                  >
                    {props.breadcrumb.category.name.fr}
                  </MagicLink>
                  {' > '}
                  {props.breadcrumb.equivalent.name.fr}
                </>
              ) : (
                props.breadcrumb.category.name.fr
              )}
            </>
          )}
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
