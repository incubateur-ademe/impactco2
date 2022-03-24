import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import MagicLink from 'components/base/MagicLink'
import Button from 'components/base/Button'
import Equivalent from './category/Equivalent'

const Wrapper = styled.div`
  margin-top: 1rem;
`
const Title = styled.h3`
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const Equivalents = styled.div`
  margin-bottom: 1rem;
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
          .sort((a, b) => (a.total > b.total ? 1 : -1))
      )
  }, [equivalents, props.category])

  return (
    <Wrapper>
      {props.title && (
        <Title>
          Le situer dans sa categorie (
          <MagicLink to={`/categories#${props.category.slug}`} internal>
            {props.category.name.fr}
          </MagicLink>
          )
        </Title>
      )}
      <Equivalents>
        {equivalentsOfCategory.map((equivalent) => (
          <Equivalent
            equivalent={equivalent}
            category={props.category}
            max={equivalentsOfCategory[equivalentsOfCategory.length - 1].total}
            current={props.equivalent?.id === equivalent.id}
            key={equivalent.id}
          />
        ))}
      </Equivalents>
      {!props.title && (
        <Bottom>
          <Disclaimer>
            Valeurs exprimées en kg CO2e émis {props?.category?.unit}.
          </Disclaimer>
          <Button onClick={() => alert('soon')} hollow>
            Comparer avec d'autres catégories
          </Button>
        </Bottom>
      )}
    </Wrapper>
  )
}
