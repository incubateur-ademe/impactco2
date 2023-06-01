import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'

import MagicLink from 'components/base/MagicLink'
import Section2 from 'components/base/Section2'

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 1.05rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`
export default function BreadCrumb2(props) {
  return (
    <Section2>
      <Section2.InnerMargin>
        <Wrapper>
          {props.breadcrumb && props.breadcrumb.type === 'equivalent' && (
            <>
              <MagicLink to='/categories'>Catégories</MagicLink>
              {' > '}{' '}
              {props.breadcrumb.equivalent ? (
                <>
                  <MagicLink to={`/${props.breadcrumb.category.slug}`}>
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
      </Section2.InnerMargin>
    </Section2>
  )
}
