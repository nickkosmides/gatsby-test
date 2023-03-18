import React from "react"
import { graphql } from "gatsby"


const TagPage = ({ data, pageContext }) => {
  const { tagSlug } = pageContext
  console.log(pageContext);
  const { edges: posts } = data.allWpPost

  return (
    <div>
      <h1>Posts tagged with {tagSlug}</h1>
      {posts.map(({ node: post }) => (
       <div></div>
      ))}
    </div>
  )
}

export default TagPage

export const query = graphql`
  query TagPageQuery($tagSlug: String!) {
    allWpPost(
      filter: { tags: { nodes: { elemMatch: { slug: { eq: $tagSlug } } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          title
          excerpt
          date(formatString: "MMMM DD, YYYY")
          uri
          tags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 800, height: 400, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
  }
`
