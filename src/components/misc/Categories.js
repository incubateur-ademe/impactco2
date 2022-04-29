import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import ShareButton from 'components/misc/ShareButton'
import Category from './categories/Category'

const Title = styled.h2`
  margin-bottom: ${(props) => (props.main ? 1.25 : 0.75)}rem;
  text-align: ${(props) => (props.main ? 'left' : 'center')};
`
const Text = styled.p`
  max-width: 30rem;
  margin: 0 ${(props) => (props.main ? 0 : 'auto')} 1rem;
  text-align: ${(props) => (props.main ? 'left' : 'center')};
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.75rem;
`
export default function Categories(props) {
  const { categories } = useContext(DataContext)

  return (
    <>
      <Section main={props.main}>
        <Section.Content flex={props.main}>
          <Title as={props.main ? 'h1' : 'h2'} main={props.main}>
            Catégories
          </Title>
          {props.main && <ShareButton title />}
        </Section.Content>
      </Section>
      <Section>
        <Section.Content>
          <Text main={props.main}>
            Selectionnez une catégorie pour visualiser facilement l’empreinte
            carbone des objets et gestes de votre quotidien.
          </Text>
          <List>
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </List>
        </Section.Content>
      </Section>
    </>
  )
}
