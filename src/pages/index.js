import * as React from "react";

import { gql } from '@apollo/client';

import { useQuery } from '@apollo/client';
import { Layout } from "../components/Layout";
const IndexPage = () => {
  const GET_ALL_POSTS = gql`
  query AllPosts {
    posts {
      nodes {
        uri
        id
       date
       
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
`;

  const { loading, error, data } = useQuery(GET_ALL_POSTS);
   if (loading) return <p className="h-screen fixed top-0  bg-gray-custom w-full z-50 flex items-center justify-center"><div className="pixel  text-primary pb-10">Gamebit</div></p>;
 if (error) return <p>Error :(</p>;
  const post = data.posts.nodes;
  return (
  // <Layout>
  <div className="element">
    <div className="  container mx-auto px-4 py-20">
      <div class="first-grid grid grid-cols-2 gap-1 xl:grid-cols-4 xl:h-[600px]">
  <div className="img-overlay col-span-2 md:col-span-2"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`${post[0].uri}`} className="py-2 px-2 first-grid-links bg-primary">{post[0].uri}</a></div><img className="  h-full w-full object-cover" src={post[0].featuredImage.node.sourceUrl}/></div>
  {/* <div class="col-span-2  sm:col-span-1 gap-1 grid grid-rows-2">
    <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[1].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[2].featuredImage.node.sourceUrl} /></div>
  </div>
  <div class="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2">
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[3].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[4].featuredImage.node.sourceUrl} /></div>
  </div> */}
</div>
</div>
</div>
  // </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
