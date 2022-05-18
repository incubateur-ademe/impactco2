const boisson = require('./src/data/categories/boisson.json')
const deplacement = require('./src/data/categories/deplacement.json')
const electromenager = require('./src/data/categories/electromenager.json')
const habillement = require('./src/data/categories/habillement.json')
const mobilier = require('./src/data/categories/mobilier.json')
const numerique = require('./src/data/categories/numerique.json')
const repas = require('./src/data/categories/repas.json')
const categories = require('./src/data/categories.json')

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const equivalents = [
    ...boisson,
    ...deplacement,
    ...electromenager,
    ...habillement,
    ...mobilier,
    ...numerique,
    ...repas,
  ]
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
  const categoriesPages = categories.map((category) => {
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
