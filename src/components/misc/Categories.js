import React, { useContext } from 'react'
import styled from 'styled-components'
import DataContext from 'components/providers/DataProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import ShareButton from 'components/base/ShareButton'
import Category from './categories/Category'

const Title = styled.h1`
  margin-bottom: 1.25rem;
  text-align: left;
`
const Text = styled.p`
  font-weight: ${(props) => (props.$main ? 'normal' : 300)};
  margin: 0 ${(props) => (props.$main ? 0 : 'auto')} 1.5rem;
  max-width: 30rem;
  text-align: ${(props) => (props.$main ? 'left' : 'center')};
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function Categories(props) {
  const { categories } = useContext(DataContext)

  return (
    <>
      {props.main && (
        <Section $withoutPadding>
          <SectionWideContent $flex>
            <Title>Thématiques</Title>
            <ShareButton title />
          </SectionWideContent>
        </Section>
      )}
      <Section>
        <SectionWideContent>
          {props.main ? (
            <Text $main>
              Sélectionnez une thématique pour visualiser facilement l’impact carbone des objets et gestes de votre
              quotidien.
            </Text>
          ) : (
            <Text>Vous pouvez aussi naviguer par thématique :</Text>
          )}
          <List>
            {categories
              .filter((category) => category.display)
              .map((category) => (
                <Category key={category.slug} category={category} />
              ))}
          </List>
        </SectionWideContent>
      </Section>
    </>
  )
}
