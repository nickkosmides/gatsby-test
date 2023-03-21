import * as React from "react";

import { gql } from '@apollo/client';
import {CategoryTabsHomepage} from '../components/CategoryTabsHomepage';
import { useQuery } from '@apollo/client';
import { Layout } from "../components/Layout";
import { graphql } from "gatsby";
export default ({ data, pageContext }) => {
  console.log(data,'asd')

//   const GET_ALL_POSTS = gql`
//   query AllPosts {
//     posts {
//       nodes {
//         uri
//         id
//        date
//        slug
//        categories {
//         nodes {
//           slug
//           ancestors {
//             nodes {
//               slug
//             }
//           }
//         }
//       }
//         title
//         excerpt
//         author {
//           node {
//             name
//           }
//         }
//         content
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//       }
//     }
//   }
// `;

//   const { loading, error, data } = useQuery(GET_ALL_POSTS);
 
//    if (loading) return <p className="h-screen fixed top-0  bg-gray-custom w-full z-50 flex items-center justify-center"><div className="pixel  text-primary pb-10">Gamebit</div></p>;
//  if (error) return <p>Error :(</p>;
// const GET_ALL_POSTS = gql`
// query AllPosts {
//   posts {
//     nodes {
//       uri
//       id
//      date
//      slug
//      categories {
//       nodes {
//         slug
//         ancestors {
//           nodes {
//             slug
//           }
//         }
//       }
//     }
//       title
//       excerpt
//       author {
//         node {
//           name
//         }
//       }
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//     }
//   }
// }
// `;

// const { loading, error, data } = useQuery(GET_ALL_POSTS);
// console.log(data,'asd')
// if (loading) return <p className="bg-black h-[1000px]">Loading...</p>
// if (error) return <p>Error: {error.message}</p>
console.log(data)
const posts = data.all.nodes
// console.log(posts.nodes[0])
// //  const post = data.posts.nodes[0]
// //  console.log(post)
//     const { slug, categories } = posts.nodes[0]
//     console.log(categories)
//   console.log(slug)
    
//       const { slug: childSlug, wpParent } = categories.nodes[0]
//       const { slug: parentCategory } = categories.nodes[1]
//       const { slug: grandParentCategory } = categories.nodes[2]
     
    
  
//     console.log(childSlug,parentCategory)
  
    
  
        
      
  
 
  return (
   
  <Layout>
  <div className="element">
    <div className="  container mx-auto px-4 py-20">
      <div class="first-grid grid grid-cols-2 gap-1 xl:grid-cols-4 ">
  <div className="img-overlay col-span-2 md:col-span-2 h-[250px] md:h-[500px]"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href="#" className="py-2 px-2 first-grid-links bg-primary">{posts[0].uri}</a></div><img className="w-full h-full   object-cover" src={posts[0].featuredImage.node.sourceUrl}/></div>
  <div class="col-span-2  sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
    <div className="img-overlay row-span-1"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`#`} className="py-2 px-2 first-grid-links bg-primary">{posts[1].uri}</a></div><img className=" h-full w-full object-cover" src={posts[1].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full w-full object-cover" src={posts[2].featuredImage.node.sourceUrl} /></div>
  </div>
  <div class="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
   <div className="img-overlay row-span-1"><img className=" h-full w-full object-cover" src={posts[3].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full w-full object-cover" src={posts[4].featuredImage.node.sourceUrl} /></div>
  </div>
</div>
</div>
</div>
<div className="bg-gray-custom">

<CategoryTabsHomepage latestnews={data}/>
</div>

  </Layout>
  );
};

export const Head = () => <title>Home Page</title>;
export const query = graphql`
query AllPosts {
  allWpPost(
    filter: {categories: {nodes: {elemMatch: {slug: {eq: "latest-news"}}}}}
    sort: {date: DESC}
  ) {
    nodes {
      uri
      id
      date
      slug
      categories {
        nodes {
          slug
          ancestors {
            nodes {
              slug
            }
          }
        }
      }
      title
      excerpt
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  all: allWpPost(sort: {date: DESC}) {
    nodes {
      uri
      id
      date
      slug
      categories {
        nodes {
          slug
          ancestors {
            nodes {
              slug
            }
          }
        }
      }
      title
      excerpt
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
  `

;