import React, { Dispatch, SetStateAction, useState } from 'react'
import { formatName } from 'utils/formatters'
import { Equivalents, Result, ResultValue } from './Defi.styles'
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
            De combien de paires de chaussures <b>pensez vous avoir besoin ?</b>
          </>
        }
        value={thinkingValue}
        setValue={setThinkingValue}
      />
      <Question
        data-testid='question-vraie'
        title='👉 Dans la vraie vie'
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
        {newValue ? (
          <Result data-testid='defi-result'>
            <ResultValue data-testid='defi-result-title'>
              {newValue.toLocaleString('fr-FR')} {formatName('paire[s] de chaussure[s] neuve[s]', newValue)} (+
              {(newValue * shoesImpact).toLocaleString('fr-FR')}kg de CO2e)
            </ResultValue>
            C’est autant d’émissions que pour fabriquer, consommer ou parcourir...
            <Equivalents>
              <Equivalent type='tshirt' value={newValue * shoesImpact} />
              <Equivalent type='smartphone' value={newValue * shoesImpact} />
              <Equivalent type='vegetarian' value={newValue * shoesImpact} />
            </Equivalents>
          </Result>
        ) : (
          <EmptyResult />
        )}
      </Question>
    </div>
  )
}

export default Defi
