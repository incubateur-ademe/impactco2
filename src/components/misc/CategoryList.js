import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { formatTotal } from 'utils/formatters'
import ModalContext from 'utils/ModalContext'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import Checkbox from 'components/base/Checkbox'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'
import Equivalent from './categoryList/Equivalent'

const StyledSection = styled(Section)`
  margin-bottom: 4.5rem;
`
const Equivalents = styled.div`
  margin: 0 auto 1rem;
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
const InstructionWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Instruction = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 300;
  text-align: center;
`
const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 200ms;
`

const StyledCheckbox = styled(Checkbox)`
  font-size: 0.875rem;
`
export default function Category(props) {
  const { setCo2e } = useContext(ModalContext)

  const { equivalents } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const [equivalentsOfCategory, setEquivalentsOfCategory] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfCategory(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => equivalent.default || displayAll)
          .map((equivalent) => ({
            ...equivalent,
            total: formatTotal(equivalent),
          }))
          .sort((a, b) => (a.total > b.total ? 1 : -1))
      )
  }, [equivalents, props.category, displayAll])

  return (
    <StyledSection>
      <Section.Content>
        <CheckboxWrapper
          visible={equivalents
            .filter((equivalent) => equivalent.category === props.category.id)
            .find((equivalent) => !equivalent.default)}
        >
          <StyledCheckbox
            name='displayAll'
            checked={displayAll}
            onChange={() => {
              setDisplayAll((prevDisplayAll) => !prevDisplayAll)
              window?._paq?.push([
                'trackEvent',
                'Interaction',
                'Voir tous les équivalents',
                props.category.name.fr,
              ])
            }}
          >
            Voir tous les équivalents
          </StyledCheckbox>
        </CheckboxWrapper>
        <InstructionWrapper>
          <Instruction>
            Cliquez sur un équivalent pour voir le détail.
          </Instruction>
        </InstructionWrapper>

        <Equivalents small={props.small}>
          {equivalentsOfCategory.map((equivalent) => (
            <Equivalent
              equivalent={equivalent}
              category={props.category}
              max={
                equivalentsOfCategory[equivalentsOfCategory.length - 1].total
              }
              key={equivalent.slug}
              displayAll={displayAll}
            />
          ))}
        </Equivalents>
        {!props.title && (
          <Bottom>
            <Disclaimer>
              Valeurs exprimées en kg{' '}
              <ButtonLink onClick={() => setCo2e(true)}>
                CO<sub>2</sub>e
              </ButtonLink>{' '}
              émis {props.category?.unit}.
            </Disclaimer>
            <Button
              onClick={() => {
                alert('Bientôt disponible')
                window?._paq?.push([
                  'trackEvent',
                  'Interaction',
                  'Comparer catégories',
                  props.category.name.fr,
                ])
              }}
              hollow
            >
              Comparer toutes les catégories
            </Button>
          </Bottom>
        )}
      </Section.Content>
    </StyledSection>
  )
}
