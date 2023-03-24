import * as React from "react";

import { gql } from '@apollo/client';
import {CategoryTabsHomepage} from '../components/CategoryTabsHomepage';
import { useQuery } from '@apollo/client';
import { Layout } from "../components/Layout";
import { graphql } from "gatsby";
import { Fragment } from "react";


const GridItem = ({ post, categoryPath }) => {
  const postUrl = `/${categoryPath}/${post.slug}`;

  return (
    <div className="img-overlay h-full">
      <div className="absolute bottom-0 p-5 text-white text-xl font-bold">
        <a href={postUrl} className="py-2 px-2 first-grid-links bg-primary">
          {post.title}
        </a>
      </div>
      <img className="h-full w-full object-cover" src={post.featuredImage.node.sourceUrl} />
    </div>
  );
};

export default ({ data, pageContext }) => {
  console.log(data,'asd')



const getFullCategoryPath = (categories) => {
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
const posts = data.all.nodes;
const firstFivePosts = posts.slice(0, 5);
  return (
   
  <Layout>
  <div className="element w-full">
    <div className="  container mx-auto px-4 py-20">
    {/* <div>
      {posts.map((post) => {
        const categoryPath = getFullCategoryPath(post.categories.nodes);
        const postUrl = `/${categoryPath}/${post.slug}`;

        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Post URL: {postUrl}</p>
            <a href={postUrl}>aa</a>
          </div>
        );
      })}
    </div> */}
    <div className="">
    <div className="first-grid grid grid-cols-2 gap-1 xl:grid-cols-4">
      {firstFivePosts.map((post, index) => {
        const categoryPath = getFullCategoryPath(post.categories.nodes);
        
        if (index === 0) {
          return (
            <div key={post.id} className="col-span-2 md:col-span-2 h-[250px] md:h-[500px]">
              <GridItem post={post} categoryPath={categoryPath} />
            </div>
          );
        } else if (index === 1  ) {
          return (
            <div key={post.id} className="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
              <GridItem post={firstFivePosts[1]} categoryPath={getFullCategoryPath(firstFivePosts[1].categories.nodes)} />
              <GridItem post={firstFivePosts[2]} categoryPath={getFullCategoryPath(firstFivePosts[2].categories.nodes)} />
            </div>
          );
        }  
        else if (index > 3 ) {
          return (
            <div key={post.id} className="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
              <GridItem post={firstFivePosts[3]} categoryPath={getFullCategoryPath(firstFivePosts[3].categories.nodes)} />
              <GridItem post={firstFivePosts[4]} categoryPath={getFullCategoryPath(firstFivePosts[4].categories.nodes)} />
            </div>
          );
        } 
      })}
    </div>
    </div>


      {/* <div class="first-grid grid grid-cols-2 gap-1 xl:grid-cols-4 ">
  <div className="img-overlay col-span-2 md:col-span-2 h-[250px] md:h-[500px]"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href="#" className="py-2 px-2 first-grid-links bg-primary">{posts[0].title}</a></div><img className="w-full h-full   object-cover" src={posts[0].featuredImage.node.sourceUrl}/></div>
  <div class="col-span-2  sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
    <div className="img-overlay row-span-1"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`#`} className="py-2 px-2 first-grid-links bg-primary">{posts[1].title}</a></div><img className=" h-full w-full object-cover" src={posts[1].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`#`} className="py-2 px-2 first-grid-links bg-primary">{posts[2].title}</a></div><img className=" h-full w-full object-cover" src={posts[2].featuredImage.node.sourceUrl} /></div>
  </div>
  <div class="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2 h-[500px]">
   <div className="img-overlay row-span-1"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`#`} className="py-2 px-2 first-grid-links bg-primary">{posts[3].title}</a></div><img className=" h-full w-full object-cover" src={posts[3].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`#`} className="py-2 px-2 first-grid-links bg-primary">{posts[4].title}</a></div><img className=" h-full w-full object-cover" src={posts[4].featuredImage.node.sourceUrl} /></div>
  </div>
</div> */}
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
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      slug
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
  `

;


// const findMostNestedCategory = (category, path = []) => {
//   if (!category.wpParent || !category.wpParent.node) {
//     path.unshift(category.slug)
//     return {
//       category: category,
//       path: path.join("/")
//     }
//   } else {
//     const parentCategory = category.wpParent.node
//     const result = findMostNestedCategory(parentCategory, [category.slug, ...path])
//     if (!result.category && parentCategory !== category) {
//       return {
//         category: null,
//         path: null
//       }
//     } else {
//       return result
//     }
//   }
// }