import React, { Dispatch, SetStateAction, useState } from 'react'
import formatName from 'utils/formatName'
import { Equivalents, NonEmptyResult, Result, ResultDescription, ResultValue } from './Defi.styles'
import EmptyResult from './EmptyResult'
import Equivalent from './Equivalent'
import Question from './Question'
import { ModalType } from './modals/Modal'

const shoesImpact = 16.5

const Defi = ({ setModal }: { setModal: Dispatch<SetStateAction<ModalType | undefined>> }) => {
  const [thinkingValue, setThinkingValue] = useState<number | undefined>()
  const [realValue, setRealValue] = useState<number | undefined>()
  const [newValue, setNewValue] = useState<number | undefined>()

  return (
    <div>
      <Question
        data-testid='question-avis'
        title='🧠 À votre avis...'
        description={
          <>
            De combien de paires de chaussures <b>pensez-vous avoir besoin ?</b>
          </>
        }
        value={thinkingValue}
        setValue={setThinkingValue}
      />
      <Question
        data-testid='question-vraie'
        title='👉 Dans ma penderie'
        description={
          <>
            Combien de chaussures <b>possédez-vous réellement ?</b>
          </>
        }
        value={realValue}
        setValue={setRealValue}
        tag={
          thinkingValue !== undefined &&
          realValue !== undefined &&
          `${realValue > thinkingValue ? '+' : ''}${realValue < thinkingValue ? '-' : ''}${Math.abs(
            realValue - thinkingValue
          )} ${formatName('paire[s]', Math.abs(realValue - thinkingValue))}`
        }
      />
      <Question
        data-testid='question-neuf'
        title='✨ Vos achats de neuf'
        source={() => setModal('hypothesis')}
        description={
          <>
            Combien de paires de <b>chaussures neuves</b> avez-vous acheté cette année ?
          </>
        }
        value={newValue}
        setValue={setNewValue}
        tag={newValue ? `+${(newValue * shoesImpact).toLocaleString('fr-FR')}kg CO2e` : false}
        customBorderRadius={!!newValue}>
        <Result>
          <NonEmptyResult $visible={!!newValue}>
            <ResultValue data-testid='defi-result-title'>
              {(newValue || 0).toLocaleString('fr-FR')} {formatName('paire[s] de chaussure[s] neuve[s]', newValue || 0)}{' '}
              (+
              {((newValue || 0) * shoesImpact).toLocaleString('fr-FR')}kg de CO2e)
            </ResultValue>
            <ResultDescription>C’est autant d’émissions que pour fabriquer ou consommer...</ResultDescription>
            <Equivalents>
              <Equivalent type='tshirt' value={(newValue || 0) * shoesImpact} />
              <Equivalent type='smartphone' value={(newValue || 0) * shoesImpact} />
              <Equivalent type='vegetarian' value={(newValue || 0) * shoesImpact} />
            </Equivalents>
          </NonEmptyResult>
          <EmptyResult hidden={!!newValue} />
        </Result>
      </Question>
    </div>
  )
}

export default Defi
