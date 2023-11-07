import React from 'react'
import {
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  LinkWrapper,
  Small,
  StyledMagicLink,
  Title,
} from './Visualization.styles'
import configs, { VisualizationCategories, VisualizationTypes, categoryLinks } from './config'

const CenterLink = ({ category }: { category: VisualizationCategories }) => {
  const config = categoryLinks[category]
  return (
    <LinkWrapper>
      <StyledMagicLink to={config.to} className='noscreenshot'>
        {config.label}
      </StyledMagicLink>
    </LinkWrapper>
  )
}

const Visualization = ({ type }: { type: VisualizationTypes }) => {
  const config = configs[type]
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        {config.equivalents
          .flatMap((equivalent) => [
            <Equivalent key={equivalent.slug} size={equivalent.size}>
              <Emojis xsmall={equivalent.xsmall} small={equivalent.small} large={equivalent.large}>
                {[...Array(equivalent.value)].map(() => equivalent.emoji).join('')}
              </Emojis>
              <Label>{equivalent.label}</Label>
            </Equivalent>,
            <Equals key={`${equivalent.slug}-eq`}>=</Equals>,
          ])
          .slice(0, config.equivalents.length * 2 - 1)}
      </Equivalents>
      <Small>
        {config.equivalents
          .flatMap((equivalent) => [
            <div key={equivalent.slug}>{equivalent.label}</div>,
            <div key={`${equivalent.slug}-eq`}>=</div>,
          ])
          .slice(0, config.equivalents.length * 2 - 1)}
        <br />
      </Small>
      <CenterLink category={config.category} />
    </>
  )
}

export default Visualization
