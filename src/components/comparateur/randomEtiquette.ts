const defaultEquivalents = {
  all: [
    { max: 1_000, equivalents: [['tgv'], ['eaudurobinet'], ['pomme'], ['email']] },
    {
      max: 50_000,
      equivalents: [
        ['friends', 'game-of-thrones'],
        ['tgv-paris-berlin', 'tgv-paris-marseille', 'voiturethermique'],
        ['repasvegetarien', 'repasvegetalien'],
        ['tomate', 'abricot', 'avocat'],
      ],
    },
    {
      min: 50000,
      max: 500_000,
      equivalents: [
        ['repasavecduboeuf'],
        ['voiture-lille-nimes', 'voiturethermique'],
        ['smartphone', 'tabletteclassique'],
      ],
    },
    {
      min: 500_000,
      max: 10_000_000,
      equivalents: [['avion-pny'], ['francais'], ['ordinateurfixeparticulier', 'ordinateurportable']],
    },
  ],
  transport: [],
  voiture: [
    {
      min: 1_000,
      max: 10_000_000,
      equivalents: [['voiturethermique']],
    },
    {
      min: 10_000_000,
      max: 10_000_000_000,
      equivalents: [['terre-voiture']],
    },
  ],
  numerique: [],
  custom: [],
}

export type RandomCategory = keyof typeof defaultEquivalents

export const getRandomEquivalentForValue = (value: number, category?: RandomCategory) => {
  const equivalents = defaultEquivalents[category || 'all'].find(
    (equivalent) => (!equivalent.min || equivalent.min < value) && (!equivalent.max || equivalent.max >= value)
  )

  return !equivalents
    ? []
    : equivalents.equivalents
        .sort(() => Math.random() - Math.random())
        .map((equivalent) => equivalent[Math.floor(Math.random() * equivalent.length)])
        .slice(0, 3)
}
