import React from 'react'
import styled from 'styled-components'
import { formatName } from 'utils/formatters'
import MagicLink from 'components/base/MagicLink'
import Section2 from 'components/base/Section2'

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  padding: 1rem 1rem 1rem 0;
`
export default function BreadCrumb2(props) {
  const naming = props?.breadcrumb?.category?.breadcrumb || props?.breadcrumb?.category?.name

  return (
    <>
      {props?.breadcrumb ? (
        <Section2>
          <Section2.InnerMargin>
            <nav aria-label="fil d'ariane">
              <Wrapper>
                {props.breadcrumb && props.breadcrumb.type === 'equivalent' && (
                  <>
                    <MagicLink to='/categories'>Thématique</MagicLink>
                    {' > '}{' '}
                    {props.breadcrumb.equivalent ? (
                      <>
                        <MagicLink to={`/${props.breadcrumb.category.slug}`}>{naming}</MagicLink>
                        {' > '}
                        {formatName(naming, 1, true)}
                      </>
                    ) : (
                      naming
                    )}
                  </>
                )}
              </Wrapper>
            </nav>
          </Section2.InnerMargin>
        </Section2>
      ) : (
        <></>
      )}
    </>
  )
}
