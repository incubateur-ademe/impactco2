import React, { Dispatch, SetStateAction, useState } from 'react'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import { Equivalents, NonEmptyResult, Result, ResultDescription, ResultValue } from './Defi.styles'
import EmptyResult from './EmptyResult'
import Equivalent from './Equivalent'
import Question from './Question'
import { OverScreenOsezChanger } from './overScreens/Type'

const shoesImpact = 16.5

const Defi = ({ setOverScreen }: { setOverScreen: Dispatch<SetStateAction<OverScreenOsezChanger | undefined>> }) => {
  const [thinkingValue, setThinkingValue] = useState<number | undefined>()
  const [realValue, setRealValue] = useState<number | undefined>()
  const [newValue, setNewValue] = useState<number | undefined>()

  return (
    <div>
      <Question
        id='avis'
        tracking='avis'
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
        id='penderie'
        tracking='penderie'
        data-testid='question-vraie'
        title='👉 Dans vos placards'
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
        id='neuf'
        tracking='neuf'
        data-testid='question-neuf'
        title='✨ Vos achats récents'
        source={() => {
          track('OsezChanger', 'Hypotheses', 'osez_changer_hypotheses')
          setOverScreen('hypothesis')
        }}
        description={
          <>
            Combien de paires de <b>chaussures neuves</b> avez-vous acheté cette année ?
          </>
        }
        value={newValue}
        setValue={setNewValue}
        tag={
          newValue ? (
            <>
              {`+${(newValue * shoesImpact).toLocaleString('fr-FR')}`}kg CO
              <sub>2</sub>e
            </>
          ) : (
            false
          )
        }
        customBorderRadius={!!newValue}>
        <Result>
          <NonEmptyResult $visible={!!newValue}>
            <ResultValue data-testid='defi-result-title'>
              {(newValue || 0).toLocaleString('fr-FR')} {formatName('paire[s] de chaussure[s] neuve[s]', newValue || 0)}{' '}
              (+
              {((newValue || 0) * shoesImpact).toLocaleString('fr-FR')}kg de CO<sub>2</sub>e)
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
