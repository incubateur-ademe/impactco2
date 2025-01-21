import { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentAlimentationInfographyValues } from 'components/shareable/overScreens/Values'
import styles from './AlimentationInfography.module.css'

const AlimentationInfography = ({
  image,
  alt,
  equivalent,
}: {
  image: string
  alt: string
  equivalent: ComputedEquivalent
}) => {
  const overScreens = useMemo(() => overScreenEquivalentAlimentationInfographyValues(equivalent), [equivalent])

  return (
    <Shareable
      slug='alimentation-infographie'
      tracking={`${getName('fr', equivalent)} alimentation infographie`}
      overScreens={overScreens}
      secondary=''
      withoutIntegration>
      <img src={`/images/${image}`} alt={alt} className={styles.image} />
    </Shareable>
  )
}

export default AlimentationInfography
