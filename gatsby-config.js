module.exports = {
  siteMetadata: {
    title: `Mon Convertisseur CO2`,
    author: `Datagir`,
    description: `Découvrez l'impact sur le climat de votre quotidien. Comparez des objets et gestes entre-eux et visualisez facilement leurs émissions de CO2e.`,
    siteUrl: `https://mcc-v2.netlify.app`,
    image: 'metaimage.png',
    twitterUsername: '_datagir',
  },
  plugins: [
    //`gatsby-plugin-preact`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Marianne:n3,n5,n7,n8'],
          urls: ['/fonts/fonts.css'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '199',
        matomoUrl: 'https://stats.data.gouv.fr',
        siteUrl: 'https://quefairedemesdechets.fr',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mon Convertisseur CO2`,
        short_name: `Convertisseur CO2`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#26827C`,
        display: `minimal-ui`,
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
}
