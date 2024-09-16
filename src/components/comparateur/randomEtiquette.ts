const defaultEquivalents = [
  { max: 1000, equivalents: [['tgv'], ['eaudurobinet'], ['pomme']] },
  {
    max: 50000,
    equivalents: [
      ['friends', 'game-of-thrones'],
      ['tgv-paris-berlin', 'tgv-paris-marseille'],
      ['repasvegetarien', 'repasvegetalien'],
      ['tomate', 'abricot', 'avocat'],
    ],
  },
  {
    min: 50000,
    max: 500000,
    equivalents: [
      ['repasavecduboeuf'],
      ['voiture-lille-nimes', 'voiturethermique'],
      ['smartphone', 'tabletteclassique'],
    ],
  },
  { min: 500000, equivalents: [['avion-pny'], ['francais'], ['ordinateurfixeparticulier', 'ordinateurportable']] },
]

export const getRandomEquivalentForValue = (value: number) => {
  const equivalents = defaultEquivalents.find(
    (equivalent) => (!equivalent.min || equivalent.min < value) && (!equivalent.max || equivalent.max >= value)
  )

  return !equivalents
    ? []
    : equivalents.equivalents
        .sort(() => Math.random() - Math.random())
        .map((equivalent) => equivalent[Math.floor(Math.random() * equivalent.length)])
        .slice(0, 3)
}
