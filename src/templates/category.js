import React from "react"
import { graphql } from "gatsby"
// import Layout from "../components/layout"


const CategoryPage = ({ data, pageContext }) => {
  const { categorySlug } = pageContext
  const { edges: posts } = data.allWpPost
console.log(pageContext)
  return (
    <div>
      <h1>Posts in {categorySlug}</h1>
      {posts.map(({ node: post }) => (
        <div>{post}</div>
      ))}
    </div>
  )
}

export default CategoryPage

export const query = graphql`
  query CategoryPageQuery($categorySlug: String!) {
    allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: $categorySlug } } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          title
          excerpt
          date(formatString: "MMMM DD, YYYY")
          uri
          categories {
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