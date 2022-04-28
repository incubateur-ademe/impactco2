const axios = require(`axios`)

const equivalents = require('./src/data/equivalents.json')
const categories = require('./src/data/categories.json')

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const equivalentsPages = equivalents.map((equivalent) => {
    const category = categories.find(
      (category) => category.id === equivalent.category
    )
    createPage({
      path: `/categories/${category.slug}/${equivalent.slug}/`,
      component: require.resolve('./src/templates/equivalent.js'),
      context: {
        equivalent,
        category,
      },
    })
  })
  const categoriesPagse = categories.map((category) => {
    createPage({
      path: `/categories/${category.slug}/`,
      component: require.resolve('./src/templates/category.js'),
      context: {
        category,
      },
    })
  })
  return Promise.all([equivalentsPages, categoriesPages])
}
