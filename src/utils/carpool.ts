import { ComputedEquivalent } from 'types/equivalent'

export const getEquivalentWithCarpool = (equivalent: ComputedEquivalent) =>
  equivalent.withCarpool
    ? [
        ...Array.from({ length: 4 }).map((_, index) => ({
          ...equivalent,
          carpool: index + 1,
          slug: `${equivalent.slug}+${index + 1}`,
          link: `${equivalent.link}+${index + 1}`,
        })),
        equivalent,
      ]
    : [equivalent]
