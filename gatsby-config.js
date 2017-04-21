module.exports = {
  siteMetadata: {
    title: "Bricolage",
    author: "Kyle Mathews",
    homeCity: "San Francisco",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-typegen-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-typegen-remark-responsive-image`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-typegen-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-typegen-remark-prismjs",
          "gatsby-typegen-remark-copy-linked-files",
          "gatsby-typegen-remark-smartypants",
        ],
      },
    },
    `gatsby-typegen-filesystem`,
    `gatsby-typegen-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-774017-3`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Bricolage",
        short_name: "Bricolage",
        icons: [
          {
            src: "/logo.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        start_url: "/",
        background_color: "white",
        theme_color: "white",
        display: "minimal-ui",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-preact`,
  ],
}
