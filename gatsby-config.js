require("dotenv").config({
  path: ".env",
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The Gatsby Garage`,
    siteUrl: `https://moviesandtv.gr`,
  },
  plugins: [
  
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-NR7DHTPH59",
        head: true,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        pageTransitionDelay: 0,
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-instagram-embed`,
      options: {
        // ...
        disable: process.env.NODE_ENV !== `production`, // disable during development
      },
    },
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



