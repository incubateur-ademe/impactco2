import fullSentenceFormat from 'utils/fullSentenceFormat'

describe('fullSentenceFormat', () => {
  test("transforme un objet 'Equivalent' en une phrase", () => {
    let res = fullSentenceFormat(getRealisticObject())
    expect(res).toEqual('39 heures de streaming vidéo')
  })
})

function getRealisticObject() {
  return {
    position: 2,
    equivalent: {
      name: 'Streaming vidéo',
      prefix: 'Heure[s] de ',
      subtitle: '',
      slug: 'streamingvideo',
      emoji: '🎬',
      unit: '',
      category: 10,
      ecv: [
        {
          value: 0.0327361035,
          id: 13,
        },
        {
          value: 0.002903607,
          id: 14,
        },
        {
          value: 0.02780804,
          id: 15,
        },
        {
          value: 0.000236636,
          id: 16,
        },
        {
          value: 0.00033236641,
          id: 17,
        },
      ],
      default: true,
      tile: false,
      meta: {
        title: '',
        description: '',
      },
      source: 'https://negaoctet.org/',
      id: 'streamingvideo',
    },
    weight: 2.4633303715484383,
    nbCol: 3,
  }
}
