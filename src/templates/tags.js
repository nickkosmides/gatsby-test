import React from "react";
import { graphql } from "gatsby";
import {Layout} from "../components/Layout";
import { formatDistanceToNow  } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons'
export const query = graphql`
  query($slug: String!, $limit: Int!, $offset: Int!) {
    wpTag(slug: { eq: $slug }) {
      name
      slug
      posts {
        nodes {
          id
          title
          slug
        }
      }
    }
    allWpPost(
      filter: {tags: { nodes: {elemMatch: {slug: {eq: $slug}}}}},
      limit: $limit,
      skip: $offset
    ){
      nodes {
        id
        uri
        date
        slug
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
            id
            name
            slug
            parentId
            wpParent {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

const TagPage = ({ data }) => {
  const tag = data.wpTag;
  const getFullCategoryPathWithPostSlug = (categoryPath, post) => {
    return  `/${categoryPath}/${post.slug}`;
  }

  const getFullCategoryPathSSR = (categories) => {
    const findCategoryPath = (category, categories) => {
      if (!category.wpParent || !category.wpParent.node) {
        return [category.slug];
      }
  
      const parentCategory = categories.find((cat) => cat.id === category.wpParent.node.id);
  
      if (!parentCategory) {
        return [category.slug];
      }
  
      return [...findCategoryPath(parentCategory, categories), category.slug];
    };
  
    let longestPath = [];
    categories.forEach((category) => {
      const path = findCategoryPath(category, categories);
      if (path.length > longestPath.length) {
        longestPath = path;
      }
    });
  
    return longestPath.join("/");
  };
  const getFullTagPathBread = (tag) => {
    return [{ name: tag.name, slug: `tag/${tag.slug}` }];
  };
  
  const tagBread = { name: tag.name, slug: tag.slug }; // Replace this with the actual tag data.
  const tagPath = getFullTagPathBread(tagBread);
  
  const breadcrumbs = tagPath.map((tagItem, index) => {
    const parentTagPath = tagPath.slice(0, index + 1).map(tag => tag.slug).join("/");
  
    return (
      <li className="flex space-x-3 items-center" key={parentTagPath}>
        <FontAwesomeIcon className="text-base" icon={faChevronRight} />
        <a href={`/${parentTagPath}`}>{tagItem.name}</a>
      </li>
    );
  });
  return (
    <div>
      <Layout>
          <div className="bg-gray-custom py-20">
            <div className="container px-4">
              <div className="text-5xl mb-20 text-center navbar-font-family">{tag.name}</div>
            <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-9 col-span-12">
          <ul className="breadcrumb bg-white text-black shadow-md navbar-font-family p-4 mb-5 flex text-base items-center space-x-3"><li className=""><a href="/">Home</a> </li>{breadcrumbs}</ul>

             
             <div className="flex flex-col space-y-10">
           { data.allWpPost.nodes.map((post) => (
                 <div key={post.id} class="bg-gray-100 flex flex-wrap w-full">
                 <div class="w-full md:w-4/12 relative  ">
                 {/* <pre>{JSON.stringify(post.categories.nodes)}</pre>
                 <h2>{post.categories.nodes[0].name}</h2> */}
                       <div className="img-overlay   ">
                         <img src={post.featuredImage.node.sourceUrl} alt="image" class=" h-auto  w-full  " />
                       </div>
                       
                     </div>
                     <div className="flex w-full md:w-8/12 flex-col space-y-4 py-2 px-5">
                     <h1 class=" text-xl font-bold text-black  "><a href={getFullCategoryPathWithPostSlug(getFullCategoryPathSSR(post.categories.nodes),post)}>{post.title}</a></h1>
                     <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    
                     <div className="flex space-x-5">
                     <div className="text-gray-500 text-sm uppercase">posted by {post.author.node.name}</div>
                    
                     <div className="text-gray-500 text-sm">{ formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
                     </div>
                     </div>
                  
                 </div>
                ))}
            </div>
            {/* <ul id="page-numbers" className="container px-4 mt-10 pagination flex flex-wrap space-x-5 ">
          {renderPageNumbers}
        </ul> */}
          </div>
          <div className="lg:col-span-3 col-span-12 bg-red-500 h-96"></div>
            </div>
          
          </div>
        
              </div>
          
        </Layout>
    </div>
  );
};

export default TagPage;
