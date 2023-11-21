import React from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import Select from 'components/base/Select'
import Code from './configurator/Code'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  max-width: 73.5rem;
  padding: 2rem;

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  ${(props) => props.theme.mq.large} {
    text-align: left;
  }
`
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  ${(props) => props.theme.mq.large} {
    grid-template-columns: repeat(1, 1fr);
  }
`
const GridItem1 = styled.div``
const GridItem2 = styled.div``
const GridItem3 = styled.div``
export default function Configurator(props) {
  return (
    <Wrapper>
      <Title>Configurez votre iframe</Title>
      <Grid>
        <GridItem1>
          <Select
            onChange={(e) => props.setSlug(e.value)}
            value={props.type === 'category' ? 'numerique' : props.type === 'equivalent' ? 'abricot' : 'convertisseur'}
            label={`1) Choisissez le type d'iframe que vous souhaitez intégrer.`}
            name='type'>
            <option value='convertisseur'>Comparateur</option>
            <option value='numerique'>Thématique</option>
            <option value='abricot'>Equivalent</option>
          </Select>
          {props.type === 'category' && (
            <>
              <Select onChange={(e) => props.setSlug(e.value)} value={props.slug.split('/')[0]} name='type'>
                {props.categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {props.slug.includes('transport') && (
                <Select onChange={(e) => props.setSlug(e.value)} value={props.slug} name='transport'>
                  <option key={'transport'} value={'transport'}>
                    Distance
                  </option>
                  <option key={'transport/itineraire'} value={'transport/itineraire'}>
                    Itinéraire
                  </option>
                  <option key={'transport/teletravail'} value={'transport/teletravail'}>
                    Téletravail
                  </option>
                </Select>
              )}
            </>
          )}
          {props.type === 'equivalent' && (
            <Select onChange={(e) => props.setSlug(e.value)} value={props.slug} name='type'>
              {props.equivalents
                .sort((a, b) => (a.slug > b.slug ? 1 : -1))
                .map((equivalent) => (
                  <option key={equivalent.slug} value={equivalent.slug}>
                    {formatName(equivalent.name, 1, true).replace('(ou trottinette)', '')}
                  </option>
                ))}
            </Select>
          )}
        </GridItem1>
        <GridItem2>
          <Select
            onChange={({ value }) => props.setTheme(value)}
            label={`2) Choisissez la palette de couleurs de votre iframe.`}
            name='theme'>
            <option value='default'>Clair</option>
            <option value='night'>Sombre</option>
          </Select>
        </GridItem2>
        <GridItem3>
          <Code type={props.path} theme={props.theme} />
        </GridItem3>
      </Grid>
    </Wrapper>
  )
}
