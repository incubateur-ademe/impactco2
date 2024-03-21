import { useMemo } from 'react'
import styled from 'styled-components'
import formatNumber from 'utils/formatNumber'
import { MEDIA } from 'utils/styles'
import { evaluateNumber } from 'hooks/useSituation'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import Tile from 'components/misc/tiles/Tile'

const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`
const Text = styled.div`
  font-size: 1.125rem;
  text-align: center;

  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
`
const Big = styled.span`
  font-size: 1.375rem;
  font-weight: bold;

  ${MEDIA.LT.SMALL} {
    display: block;
    font-size: 1.25rem;
  }
`
const Color = styled.span`
  color: var(--primary-50);
`
const Disclaimer = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
`
const Tiles = styled.div`
  display: flex;
  gap: 1.5rem;

  ${MEDIA.LT.MEDIUM} {
    gap: 0.75rem;
  }
`
const equivalentsToShow = computedEquivalents.filter((equivalent) =>
  ['voiturethermique', 'repasavecduboeuf', 'tshirtencoton'].includes(equivalent.slug)
)

export default function Total() {
  const {
    usageNumerique: { engine, situation, numberEmails },
  } = useParamContext()

  const total = useMemo(
    () =>
      evaluateNumber(engine, 'email') * numberEmails +
      (evaluateNumber(engine, 'streaming . durée') ? evaluateNumber(engine, 'streaming') : 0) +
      (evaluateNumber(engine, 'visio . durée') ? evaluateNumber(engine, 'visio') : 0) -
      (evaluateNumber(engine, 'email . terminaux . construction') * numberEmails +
        evaluateNumber(engine, 'streaming . terminaux . construction') +
        evaluateNumber(engine, 'visio . terminaux . construction')),
    [engine, situation, numberEmails]
  )

  return engine ? (
    <Wrapper>
      <Text>
        Vos usages émettent{' '}
        <Big data-testid='impactNumeriqueTotal'>
          {formatNumber(total / 1000)} kg CO<sub>2</sub>e <Color>par semaine</Color>
        </Big>{' '}
        <Disclaimer>
          Cette valeur comprend l’utilisation de vos appareils, la transmission de la donnée et la construction et
          l’usage des data-centers.
          <br />
          <strong>
            L’impact de la construction de vos appareils n’est pas incluse mais est abordée plus bas dans la page.{' '}
          </strong>
        </Disclaimer>
      </Text>
      <Text>
        Soit{' '}
        <Big>
          {formatNumber((total / 1000) * 52)} kg CO<sub>2</sub>e <Color>par an</Color>{' '}
        </Big>
        <div>ce qui représente autant d’émissions que pour fabriquer, consommer ou parcourir :</div>
      </Text>
      <Tiles>
        {equivalentsToShow.map((equivalent) => (
          <Tile key={equivalent.slug} equivalent={equivalent} weight={(total / 1000) * 52} />
        ))}
      </Tiles>
    </Wrapper>
  ) : null
}
