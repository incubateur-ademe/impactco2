import fullSentenceFormat from 'utils/fullSentenceFormat'
import { computedEquivalents } from 'components/providers/equivalents'

describe('fullSentenceFormat', () => {
  test("transforme un objet 'Equivalent' en une phrase", () => {
    const res = fullSentenceFormat(getRealisticObject())
    expect(res).toEqual('38.5 heures de streaming vidéo')
  })
})

function getRealisticObject() {
  return {
    position: 2,
    equivalent: computedEquivalents.find((x) => x.slug === 'streamingvideo'),
    weight: 2.4633303715484383,
    nbCol: 3,
  }
}
