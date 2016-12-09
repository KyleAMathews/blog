const filesystemSourcePlugin = require.resolve(`gatsby-source-filesystem`)

module.exports = {
  siteMetadata: {
    title: 'Bricolage',
    author: 'Kyle Mathews',
    homeCity: 'San Francisco',
  },
  plugins: [
    {
      resolve: filesystemSourcePlugin,
      options: {
        path: `${__dirname}/pages/`,
      },
    },
    require.resolve('gatsby-parser-markdown'),
    require.resolve('gatsby-typegen-remark'),
    require.resolve('gatsby-typegen-filesystem'),
  ],
}
