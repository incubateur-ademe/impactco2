import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import ShareButton from 'components/misc/ShareButton'
import Category from './categories/Category'

const Title = styled.h1`
  margin-bottom: 1.25rem;
  text-align: left;
`
const Text = styled.p`
  max-width: 30rem;
  margin: 0 ${(props) => (props.main ? 0 : 'auto')} 1.5rem;
  font-weight: ${(props) => (props.main ? 'normal' : 300)};
  text-align: ${(props) => (props.main ? 'left' : 'center')};
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function Categories(props) {
  const { categories } = useContext(DataContext)

  return (
    <>
      {props.main && (
        <Section>
          <Section.Content flex>
            <Title>Catégories</Title>
            <ShareButton title />
          </Section.Content>
        </Section>
      )}
      <Section>
        <Section.Content>
          {props.main ? (
            <Text main>
              Selectionnez une catégorie pour visualiser facilement l’empreinte
              carbone des objets et gestes de votre quotidien.
            </Text>
          ) : (
            <Text>Vous pouvez aussi naviguer par catégorie :</Text>
          )}
          <List>
            {categories.map((category) => (
              <Category key={category.slug} category={category} />
            ))}
          </List>
        </Section.Content>
      </Section>
    </>
  )
}
