import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
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
export default function Configurator({
  slug,
  setSlug,
  type,
  categories,
  equivalents,
  path,
  theme,
  setTheme,
}: {
  slug: string
  setSlug: Dispatch<SetStateAction<string>>
  type: 'category' | 'equivalent'
  categories: Category[]
  equivalents: Equivalent[]
  path: string
  theme: 'default' | 'night'
  setTheme: Dispatch<SetStateAction<'default' | 'night'>>
}) {
  return (
    <Wrapper>
      <Title>Configurez votre iframe</Title>
      <Grid>
        <div>
          <Select
            onChange={(e) => setSlug(e.value)}
            value={type === 'category' ? 'numerique' : type === 'equivalent' ? 'abricot' : 'convertisseur'}
            label="1) Choisissez le type d'iframe que vous souhaitez intégrer."
            name='type'>
            <option value='convertisseur'>Comparateur</option>
            <option value='numerique'>Thématique</option>
            <option value='abricot'>Equivalent</option>
          </Select>
          {type === 'category' && (
            <>
              <Select onChange={(e) => setSlug(e.value)} value={slug.split('/')[0]} name='type'>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {slug.startsWith('transport') && (
                <Select onChange={(e) => setSlug(e.value)} value={slug} name='type'>
                  <option key='transport' value='transport'>
                    Distance
                  </option>
                  <option key='transport/itineraire' value='transport/itineraire'>
                    Itinéraire
                  </option>
                  <option key='transport/teletravail' value='transport/teletravail'>
                    Téletravail
                  </option>
                </Select>
              )}
              {slug.startsWith('habillement') && (
                <Select onChange={(e) => setSlug(e.value)} value={slug} name='type'>
                  <option key='habillement' value='habillement'>
                    Impact de la mode
                  </option>
                  <option key='habillement/osez-changer' value='habillement/osez-changer'>
                    Challenge chaussures
                  </option>
                </Select>
              )}
            </>
          )}
          {type === 'equivalent' && (
            <Select onChange={(e) => setSlug(e.value)} value={slug} name='type'>
              {equivalents
                .sort((a, b) => (a.slug > b.slug ? 1 : -1))
                .map((equivalent) => (
                  <option key={equivalent.slug} value={equivalent.slug}>
                    {formatName(equivalent.name, 1, true).replace('(ou trottinette)', '')}
                  </option>
                ))}
            </Select>
          )}
        </div>
        <div>
          <Select
            value={theme}
            onChange={({ value }) => setTheme(value)}
            label='2) Choisissez la palette de couleurs de votre iframe.'
            name='theme'>
            <option value='default'>Clair</option>
            {slug !== 'habillement/osez-changer' && <option value='night'>Sombre</option>}
          </Select>
        </div>
        <div>
          <Code type={path} theme={theme} />
        </div>
      </Grid>
    </Wrapper>
  )
}
