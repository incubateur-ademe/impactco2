import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { computedEquivalents } from 'components/providers/equivalents'
import EquivalentSquareChecked from './tilesModal/EquivalentSquareChecked'

export default function ActualChoices(props) {
  useEffect(() => {
    if (props.eqvArray && props.eqvArray.length >= 2) {
      props.setEqvError('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.eqvArray])

  const removeChoice = (slug) => {
    const newArray = props.eqvArray.filter((ticked) => ticked !== slug)
    props.setEqvArray(newArray)
  }

  const getPluralOf = (word) => {
    let res = word
    if (props.eqvArray.length > 1) {
      res += 's'
    }
    return res
  }

  const eqOf = (ticked) => {
    return computedEquivalents.find((e) => e.slug === ticked)
  }

  return (
    <Wrapper>
      <SelectionBox>
        <UpperSide data-testid='eqs-title'>
          <UpperSideCounting>
            <Count>{props.eqvArray.length}</Count>/<MaxCount>3</MaxCount>
          </UpperSideCounting>{' '}
          <strong>{getPluralOf('équivalence')}</strong> {getPluralOf('sélectionnée')}
        </UpperSide>
        <Choices>
          {props.eqvArray.length > 0 ? (
            <>
              {props.eqvArray.map((ticked) => {
                return (
                  <EquivalentSquareChecked
                    key={ticked}
                    equivalent={eqOf(ticked)}
                    checked={false}
                    data-testid={`checked-eq-${ticked}`}
                    setChecked={() => removeChoice(ticked)}
                  />
                )
              })}
            </>
          ) : (
            <>
              <EmptyChoice data-testid='emptyChoice'>
                Veuillez choisir au moins 2 items ci-
                <ShowMobile>dessous</ShowMobile>
                <ShowDesktop>contre</ShowDesktop>.
              </EmptyChoice>
            </>
          )}
        </Choices>
      </SelectionBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 1.5rem;
  margin-right: 1rem;
`

const SelectionBox = styled.div`
  background-color: var(--primary-10);
  border-radius: 1rem;
  padding: 1rem;
`

const Choices = styled.div`
  margin-top: 1.25rem;
`

const UpperSide = styled.div`
  border-bottom: 1px solid var(--primary-20);
  color: var(--neutral-70);
  padding-bottom: 1rem;
`

const UpperSideCounting = styled.div`
  background-color: var(--primary-20);
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.125rem 0.5rem;
`

const Count = styled.strong`
  margin-right: 0.1rem;
`

const MaxCount = styled.span`
  margin-left: 0.1rem;
`

const EmptyChoice = styled.div`
  font-style: italic;
  margin-top: 1rem;
  ${MEDIA.LT.LARGE} {
    font-size: 0.9rem;
  }
`

const ShowMobile = styled.span`
  display: none;
  ${MEDIA.LT.MEDIUM} {
    display: inline;
  }
`
const ShowDesktop = styled.span`
  display: inline;
  ${MEDIA.LT.MEDIUM} {
    display: none;
  }
`
