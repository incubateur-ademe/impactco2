const axios = require(`axios`)

const equivalents = require('./src/data/equivalents.json')
const categories = require('./src/data/categories.json')

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return equivalents.map((equivalent) => {
    createPage({
      path: `/equivalents/${equivalent.slug}/`,
      component: require.resolve('./src/templates/equivalent.js'),
      context: {
        equivalent,
        category: categories.find(
          (category) => category.id === equivalent.category
        ),
      },
    })
  })
}
