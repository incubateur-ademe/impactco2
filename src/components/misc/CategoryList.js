import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import Button from 'components/base/Button'
import Equivalent from './categoryList/Equivalent'

const StyledSection = styled(Section)`
  margin-bottom: 4.5rem;
`
const Title = styled.h2`
  text-align: center;
`
const Equivalents = styled.div`
  max-width: ${(props) => (props.small ? '32rem' : '100%')};
  margin: 0 auto 1rem;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Disclaimer = styled.p`
  max-width: 23rem;
  font-size: 0.875rem;
  text-align: center;
`
export default function Category(props) {
  const { equivalents } = useContext(DataContext)

  const [equivalentsOfCategory, setEquivalentsOfCategory] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfCategory(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .map((equivalent) => ({
            ...equivalent,
            total: formatTotal(equivalent),
          }))
          .sort((a, b) => (a.total > b.total ? 1 : -1))
      )
  }, [equivalents, props.category])

  return (
    <StyledSection>
      <Section.Content>
        {props.equivalent && (
          <Title>
            Categorie{' '}
            <MagicLink to={`/categories/${props.category.slug}`}>
              {props.category.name.fr}
            </MagicLink>
          </Title>
        )}
        <Equivalents small={props.small}>
          {equivalentsOfCategory.map((equivalent) => (
            <Equivalent
              equivalent={equivalent}
              category={props.category}
              max={
                equivalentsOfCategory[equivalentsOfCategory.length - 1].total
              }
              current={props.equivalent?.id === equivalent.slug}
              key={equivalent.slug}
            />
          ))}
        </Equivalents>
        {!props.title && (
          <Bottom>
            <Disclaimer>
              Valeurs exprimées en kg CO2e émis {props.category?.unit}.
            </Disclaimer>
            <Button onClick={() => alert('Bientôt disponible')} hollow>
              Comparer avec d'autres catégories
            </Button>
          </Bottom>
        )}
      </Section.Content>
    </StyledSection>
  )
}
