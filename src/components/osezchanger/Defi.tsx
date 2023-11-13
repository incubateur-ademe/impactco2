import React, { useState } from 'react'
import habillement from '../../data/categories/habillement.json'
import { Equivalents, Result, ResultValue } from './Defi.styles'
import Equivalent from './Equivalent'
import Question from './Question'

const shoesImpact = (
  habillement.find((equivalent) => equivalent.slug === 'chaussuresentissu')?.ecv || [{ value: 16.5 }]
).reduce((sum, ecv) => sum + ecv.value, 0)

const Defi = () => {
  const [thinkingValue, setThinkingValue] = useState<number | undefined>()
  const [realValue, setRealValue] = useState<number | undefined>()
  const [newValue, setNewValue] = useState<number | undefined>()

  return (
    <div>
      <Question
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
          `${realValue > thinkingValue ? '+ ' : ''}${realValue < thinkingValue ? '- ' : ''}${Math.abs(
            realValue - thinkingValue
          )}`
        }
      />
      <Question
        title='✨ Vos achats de neuf'
        withSource
        description={
          <>
            Combien de paires de <b>chaussures neuves</b> avez-vous acheté cette année ?
          </>
        }
        value={newValue}
        setValue={setNewValue}
        tag={newValue ? `+ ${(newValue * shoesImpact).toFixed(2)}kg CO2e` : false}
        customBorderRadius={!!newValue}
      />

      {newValue && (
        <Result>
          <ResultValue>
            {newValue} paires de chaussures neuves ({(newValue * shoesImpact).toFixed(2)}kg de CO2e)
          </ResultValue>
          C’est autant d’émissions que pour fabriquer, consommer ou parcourir...
          <Equivalents>
            <Equivalent type='tshirt' value={newValue * shoesImpact} />
            <Equivalent type='smartphone' value={newValue * shoesImpact} />
            <Equivalent type='vegetarian' value={newValue * shoesImpact} />
          </Equivalents>
        </Result>
      )}
    </div>
  )
}

export default Defi
