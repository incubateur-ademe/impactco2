import { Equivalent } from 'types/equivalent'

export const flattenEquivalents = (equivalents: Equivalent[]) =>
  equivalents.flatMap((equivalent) =>
    'ecvs' in equivalent && equivalent.ecvs
      ? equivalent.ecvs.map((ecv) => ({
          ...equivalent,
          ...ecv,
          slug: `${equivalent.name} ${ecv.subtitle}`.replace(/ /g, '').toLowerCase(),
        }))
      : [equivalent]
  )
