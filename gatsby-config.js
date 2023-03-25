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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-NR7DHTPH59",
        ],
      },
    },
    

    `gatsby-plugin-twitter`,
  
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: 'https://base.moviesandtv.gr/graphql',
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
        url: 'https://base.moviesandtv.gr/graphql',
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



