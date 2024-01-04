import React from 'react'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import useDataContext from 'components/providers/DataProvider'
import Emoji from 'components/base/Emoji'
import { Bar, Card, Value, Values } from './HypotesisCard.styles'

const HypotesisCard = ({ slug }: { slug: string }) => {
  const { equivalents } = useDataContext()
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
            <Value>{Math.round(ecv)}</Value> kg CO<sub>2</sub>e
          </div>
        </Values>
      </div>
    </Card>
  )
}

export default HypotesisCard
