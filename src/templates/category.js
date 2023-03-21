import React, {useEffect,useState} from "react";
import { graphql } from "gatsby";
import {Layout} from "../components/Layout";
import { formatDistance, parseISO, format,  formatDistanceToNow  } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons'
export default ({ data, pageContext }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  const { allWpPost } = data
  console.log("test",allWpPost.nodes)
  const categories = allWpPost.nodes.reduce((acc, post) => {
    console.log(post)
    const { categories } = post
    if (!categories) {
      return acc
    }
  
   
    const path = categories.nodes.map((category) => category.slug).join("/")
    if (!acc[path]) {
      acc[path] = []
    }
    const mostChild = categories.nodes.reduce((prev, curr) => {
      if (curr.wpParent) {
        return curr
      } else {
        return prev
      }
    }, categories.nodes[0])

   post.mostChild = mostChild.name
   
    
  
    acc[path].push(post)
  
    return acc
  }, {})
  console.log(categories)
  let breadcrumbs;
  if (typeof window !== 'undefined') {
  const categoryPath = window.location.pathname.slice(1).replace(/\/$/, ''); 
  const categoryParts = categoryPath.split("/");
  
  breadcrumbs = categoryParts.map((part, index) => {
    const parentCategoryPath = categoryParts.slice(0, index + 1).join("/");
  
   
    return (
      <li className="flex space-x-3 items-center" key={parentCategoryPath}>
      <FontAwesomeIcon className="text-base"  icon={faChevronRight} />   <a href={`/${parentCategoryPath}`}>{part}</a> 
      </li>
    );
  });
  }

  return (
    <>
      {loading ? (
        <p className="h-screen fixed top-0 bg-gray-custom w-full z-50 flex items-center justify-center">
          <div className="pixel text-primary pb-10">Gamebit</div>
        </p>
      ) : (
        <Layout>
          <div className="bg-gray-custom py-20">
            <div className="container px-4">
            <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-9 col-span-12">
          <ul className="breadcrumb bg-white p-2 mb-5 flex text-base items-center space-x-3"><li className=""><a href="/">Home</a> </li>{breadcrumbs}</ul>

             
             
           { allWpPost.nodes.map((post) => (
                 <div key={post.id} class="bg-gray-100 flex flex-wrap w-full">
                 <div class="w-full md:w-6/12 relative  ">
                 {/* <pre>{JSON.stringify(post.categories.nodes)}</pre>
                 <h2>{post.categories.nodes[0].name}</h2> */}
                       <div className="img-overlay   ">
                         <img src={post.featuredImage.node.sourceUrl} alt="image" class="h-64 w-full object-cover" />
                       </div>
                       
                     </div>
                     <div className="flex w-full md:w-6/12 flex-col space-y-4 px-2">
                     <h2 class=" text-xl font-bold text-black  "><a href={post.uri}>{post.title}</a></h2>
                     <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    
                     <div className="flex space-x-5">
                     <div className="text-gray-500 uppercase">posted by {post.author.node.name}</div>
                    
                     <div className="text-gray-500">{ formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
                     </div>
                     </div>
                  
                 </div>
                ))}
            
           
        
          </div>
          <div className="lg:col-span-3 col-span-12 bg-red-500 h-96"></div>
          </div>
          </div>
              
              </div>
          
        </Layout>
      )}
    </>
  )
}

export const query = graphql`
query($slug: String!) {
    allWpPost(
      filter: {categories: { nodes: {elemMatch: {slug: {eq: $slug}}}}}
    ) {
      nodes {
        id
        uri
        date
      title
      excerpt
      author {
        node {
          name
        }
      }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
          name
          slug
          wpParent {
              node {
                slug
                wpParent {
                  node {
                    slug
                  }
                }
              }
            }
        }
        }
      }
    }
  }
`






