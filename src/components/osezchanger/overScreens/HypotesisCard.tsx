import React, { useContext } from 'react'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import DataContext from 'components/providers/DataProvider'
import Emoji from 'components/base/Emoji'
import { Bar, Card, Value, Values } from './HypotesisCard.styles'

const HypotesisCard = ({ slug }: { slug: string }) => {
  const { equivalents } = useContext(DataContext)
  const values = equivalents.find((equivalent) => equivalent.slug === slug)
  if (!values) {
    return null
  }

  const ecv = computeECV(values)
  return (
    <Card href={`/habillement/${slug}`} target='_blank' rel='noreferrer noopener'>
      <Emoji height='40px'>{values.emoji}</Emoji>
      <div>
        <div>
          {formatName(values.name, 1, true)} {values.subtitle?.toLowerCase()}
        </div>
        <Values>
          <Bar $width={(125 * ecv) / 19} />
          <div>
            <Value>{Math.round(ecv)}</Value> Kg CO2e
          </div>
        </Values>
      </div>
    </Card>
  )
}

export default HypotesisCard
