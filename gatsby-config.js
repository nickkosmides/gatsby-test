require("dotenv").config({
  path: ".env",
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The Gatsby Garage`,
    siteUrl: `localhost:8000`,
  },
  plugins: [
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-twitter`,
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: process.env.WPGRAPHQL_URL,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    `gatsby-transformer-sharp`, // Needed for dynamic images,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        includedRoutes: [
          "**/article/",
        ],
        url: process.env.WPGRAPHQL_URL,
        permalinks: {
          // Use the post slug as is (i.e. in Greek characters)
          // and ensure that non-latin characters are properly encoded
          // as per the RFC 3986 standard.
          // For example, "Δοκιμή" will become "%CE%94%CE%BF%CE%BA%CE%B9%CE%BC%CE%AE".
          format: `/%slug%/`,
          encode: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/favicon.png",
      },
    },
    "gatsby-transformer-sharp",
  ],
};
