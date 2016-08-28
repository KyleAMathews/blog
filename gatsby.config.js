const config = {
  siteMetadata: {
    title: "Bricolage",
    author: "Kyle Mathews",
    homeCity: "San Francisco",
  },
  development: {
    port: 8000,
  },
  sources: `${__dirname}/pages/`,
  //sources: [
    //{
      //register: GatsbyDirectorySource,
      //options: {
        //directory: './content',
      //},
      //plugins: [
        //{
          //register: GatsbyMarkdownSourcePlugin,
          //options: {},
        //},
      //],
    //},
  //],
  //plugins: [
    //{
      //register: require('gatsby-blog-posts'),
      //options: {
        //rssFeed: true,
      //},
    //},
  //],
}

export default config
