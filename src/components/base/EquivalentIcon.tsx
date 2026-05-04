import { ComputedEquivalent } from 'types/equivalent'
import { getEquivalentIcon } from 'utils/Equivalent/icons'

const EquivalentIcon = ({
  equivalent,
  height,
  alt,
  customTheme,
}: {
  equivalent: Pick<ComputedEquivalent, 'slug' | 'carpool'>
  height?: number
  alt?: string
  customTheme?: string | null
}) => {
  const [slug] = equivalent.slug.split('+')

  return (
    <img
      src={getEquivalentIcon(slug, equivalent.carpool, customTheme)}
      width={(height || 1) * 16}
      height={(height || 1) * 16}
      alt={alt || ''}
    />
  )
}

export default EquivalentIcon
