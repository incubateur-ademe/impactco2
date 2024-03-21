import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useParamContext from 'components/providers/ParamProvider'
import Modal4 from 'components/base/Modal4'
import Button from 'components/base/buttons/Button'
import ActualChoices from './ActualChoices'
import AllSearch from './AllSearch'

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>d'autres équivalences</GreenText>
    </Title>
  )
}

export default function EqModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const {
    livraison: { equivalents, setEquivalents },
  } = useParamContext()

  const [eqvArray, setEqvArray] = useState(equivalents)
  const [eqvError, setEqvError] = useState('')

  const validateEqv = () => {
    if (eqvArray.length >= 2) {
      setEquivalents(eqvArray)
      setEqvError('')
      setOpen(false)
    } else {
      setEqvError('Merci de sélectionner au moins deux objets pour effectuer une comparaison.')
    }
  }

  const dismiss = () => {
    setEqvArray(equivalents)
    setOpen(false)
  }

  return (
    <Modal4 setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width='55rem'>
      <div data-testid='EqModal'>
        <Intro data-testid='eqs_modal_intro'>
          {!eqvError ? (
            <>
              Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.
            </>
          ) : (
            <>
              <ShowDesktop>
                Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.
              </ShowDesktop>
              <div>
                <EqvError>⚠️ {eqvError}</EqvError>
              </div>
            </>
          )}
        </Intro>
        <GridSplit>
          <GridSplitLeft>
            <ActualChoices setEqvError={setEqvError} eqvArray={eqvArray} setEqvArray={setEqvArray} />
          </GridSplitLeft>
          <GridSplitRight>
            <Scroll>
              <AllSearch open eqvArray={eqvArray} setEqvArray={setEqvArray} />
            </Scroll>
            <ValidationZone>
              <ValidationMsg>
                {eqvError ? (
                  <>
                    <EqvError data-testid='validationError'>⚠️ {eqvError}</EqvError>
                  </>
                ) : (
                  <></>
                )}
              </ValidationMsg>
              <ValidationButtons>
                <Button onClick={validateEqv}>
                  <ShowDesktop data-testid='validateAndClose'>Valider et fermer</ShowDesktop>
                  <ShowMobile>Valider</ShowMobile>
                </Button>
                <ButtonCancel onClick={dismiss}>
                  <ShowDesktop data-testid='cancelEqs'>Annuler</ShowDesktop>
                  <ShowMobile>X</ShowMobile>
                </ButtonCancel>
              </ValidationButtons>
            </ValidationZone>
          </GridSplitRight>
        </GridSplit>
      </div>
    </Modal4>
  )
}
const Scroll = styled.div`
  height: 600px;
  overflow: auto;
  padding-bottom: 100px;
  &:after {
    content: '';
    display: block;
    height: 0px;
    ${MEDIA.LT.MEDIUM} {
      height: 120px;
    }
    ${MEDIA.LT.SMALL} {
      height: 150px;
    }
    ${MEDIA.LT.XSMALL} {
      height: 190px;
    }
    width: 100%;
  }
`

const Title = styled.h2`
  font-size: 22px;
  margin: 1rem 0;
`

const GreenText = styled.span`
  color: var(--primary-50);
`

const Intro = styled.div`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0em;
  line-height: 24px;
  margin: 1rem 0;
  padding-left: 1.5rem;
`

const ButtonCancel = styled.button`
  background-color: var(--neutral-00);
  border-color: #b5abb2;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #564d53;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 24px;
  margin-left: 0.5rem;
  padding: 8px 16px 8px 16px;
  text-align: center;
`

const ValidationZone = styled.div`
  background-color: var(--neutral-00);
  bottom: 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  left: 0;
  position: fixed;
  width: 100%;
`

const ValidationButtons = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
  padding: 1rem 0;
`

const GridSplit = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${MEDIA.LT.MEDIUM} {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-rows: 1fr;
`

const GridSplitLeft = styled.div``

const GridSplitRight = styled.div``

const ValidationMsg = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  padding: 1rem 1rem 1rem 2rem;
  ${MEDIA.LT.SMALL} {
    font-size: 0.75rem;
    padding-right: 0.25rem;
  }
  ${MEDIA.LT.XSMALL} {
    padding-left: 0.2rem;
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

const EqvError = styled.div`
  color: red;
  font-weight: bold;
`
