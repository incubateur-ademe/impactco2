import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import MagicLink from 'components/base/MagicLink'
import Equivalent from './category/Equivalent'

const Wrapper = styled.div`
  margin-top: 1rem;
`
const Title = styled.h3`
  text-align: center;
  color: ${(props) => props.theme.colors.text};
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
      {equivalentsOfCategory.map((equivalent) => (
        <Equivalent
          equivalent={equivalent}
          category={props.category}
          key={equivalent.id}
          max={equivalentsOfCategory[equivalentsOfCategory.length - 1].total}
        />
      ))}
    </Wrapper>
  )
}
