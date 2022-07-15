import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { Flipper, Flipped } from 'react-flip-toolkit'

import RulesContext from 'utils/RulesContext'
import { formatNumber } from 'utils/formatters'
import Button from 'components/base/Button'
import Equivalent from './questions/chart/Equivalent' // Nope nope nope

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;
`
const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`
const Value = styled.span`
  font-size: 3rem;
`
const Number = styled.span`
  font-weight: bold;
`
const Unit = styled.span`
  font-size: 1rem;
  white-space: nowrap;
`
const StyledFlipper = styled(Flipper)`
  margin-bottom: 1.5rem;
`
//WTF
const dictionary = {
  alimentation: 'alimentation',
  transport: 'transport . empreinte',
  logement: 'logement . impact',
  divers: 'divers',
  numérique: 'numérique',
}
export default function CategoryEnd(props) {
  const { engine, categories, curCategory, setCurCategory } =
    useContext(RulesContext)

  const somme = useMemo(
    () =>
      (curCategory
        ? engine.getRule(dictionary[curCategory.dottedName]).rawNode?.formule
            ?.somme
        : []
      )
        .map((value) =>
          engine.getRule(
            Object.keys(dictionary).find((entry) => value.includes(entry))
              ? value
              : `${curCategory.dottedName} . ${value}`
          )
        )
        .map((question) => ({
          id: question.dottedName,
          title: question.title,
          total: engine.evaluate(question.dottedName).nodeValue,
          color: curCategory.rawNode['couleur'],
        }))
        .filter((question) => question.total)
        .sort((a, b) => (a.total < b.total ? 1 : -1)),
    [engine, curCategory]
  )

  return (
    <Wrapper>
      <Title>
        {curCategory.title}
        <br />
        <Value>
          <Number>
            {formatNumber(
              engine.evaluate(
                curCategory.dottedName === 'transport'
                  ? 'transport . empreinte'
                  : curCategory.dottedName
              ).nodeValue
            )}
          </Number>
          <Unit>
            {' '}
            kg CO
            <sub>2</sub>e
          </Unit>
        </Value>
      </Title>
      {somme && (
        <StyledFlipper flipKey={somme.map((item) => item.id).join()}>
          {somme.map((item) => (
            <Flipped flipId={item.id} key={item.id}>
              <Equivalent equivalent={item} max={somme[0].total} />
            </Flipped>
          ))}
        </StyledFlipper>
      )}
      <Button.Wrapper right>
        <Button
          onClick={() =>
            setCurCategory(
              categories.indexOf(curCategory) + 1 < categories.length
                ? categories[categories.indexOf(curCategory) + 1]
                : 'end'
            )
          }
        >
          Continuer
        </Button>
      </Button.Wrapper>
    </Wrapper>
  )
}
