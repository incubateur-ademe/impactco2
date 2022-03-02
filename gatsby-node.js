const axios = require(`axios`)

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return axios
    .get(
      `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&size=1000&sampling=neighbors`
    )
    .then((res) => res.data.results)
    .then((wasteRes) =>
      axios
        .get(
          'https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-liens/lines?format=json&q_mode=simple&size=1000&sampling=neighbors'
        )
        .then((res) => res.data.results)
        .then((linkRes) => {
          let tempWaste = [...wasteRes]

          for (let result of wasteRes) {
            if (result['Synonymes_existants']) {
              const synonyms = result['Synonymes_existants'].split(' / ')
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste['Nom'] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    ID: result['ID'] + '_' + i,
                    Nom: synonyms[i],
                    parent: result['Nom'],
                  })
                }
              }
            }
          }
          return tempWaste.map((waste) => ({
            ...waste,
            slug: waste[`Nom`]
              .toLowerCase()
              .replace(/\s/g, '-')
              .replace(/'/g, '-')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
            map:
              waste['Bdd'] === 'sinoe' ||
              waste['Bdd'] === 'google' ||
              waste['Bdd'] === 'ocad3e' ||
              waste['Code'] === 'ADEME_DASRI',
            links: linkRes.filter((link) =>
              link['Produits_associes']
                .split('; ')
                .includes(waste['ID'].split('_')[0])
            ),
          }))
        })
    )
    .then((res) =>
      res.forEach((product) => {
        createPage({
          path: `/dechet/${product.slug}/`,
          component: require.resolve('./src/templates/product.js'),
          context: { product },
        })
      })
    )
}
