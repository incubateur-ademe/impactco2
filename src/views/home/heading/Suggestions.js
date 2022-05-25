import React, { useContext } from 'react'
import styled from 'styled-components'

import suggestions from 'data/suggestions.json'
import { formatName } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  margin: 0 auto 3rem;
`
const Text = styled.p`
  font-weight: 300;
  text-align: center;
`
const StyledButton = styled(Button)`
  font-size: 0.875rem;
`
export default function Suggestions() {
  const { equivalents, categories } = useContext(DataContext)
  return (
    <Wrapper>
      <Text>
        En panne d’inspiration ? Essayez une des suggestions ci‑dessous :
      </Text>
      <Button.Wrapper>
        {suggestions.map((suggestion) => {
          const equivalent = equivalents.find(
            (equivalent) => equivalent.slug === suggestion
          )
          return equivalent ? (
            <StyledButton
              to={`/categories/${
                categories.find(
                  (category) => category.id === equivalent.category
                )?.slug
              }/${equivalent.slug}`}
            >
              <Emoji>{equivalent.emoji}</Emoji>
              <span dangerouslySetInnerHTML={{ __html: '&nbsp&nbsp' }} />
              {formatName(equivalent.name.fr, 1, true)}
            </StyledButton>
          ) : null
        })}
      </Button.Wrapper>
    </Wrapper>
  )
}
