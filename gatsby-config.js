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
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
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
    // `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
  ],
}
