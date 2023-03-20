import React from "react";

import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { BlockRenderer,getStyles, getClasses } from "@webdeveducation/wp-block-tools";
import { useEffect } from "react";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
  FacebookShareButton
} from "react-share";


const Post = ({ data ,pageContext}) => {
  useEffect(() => {
    // Manually reload Instagram script on component update
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process()
    }
  }, [data])
  console.log('asd', pageContext.blocks)
  const post = data.wpPost;
  console.log('asasd',getClasses(post.blocks[0]))
  // const blockStyles = getStyles(post.content);
  // console.log(blockStyles);

  return (
    <Layout>
      <div className="bg-gray-custom py-20 relative">
        <div className="absolute top-0 z-10 min-w-full opacity-20">
          <div className="relative  ">
          <img className="object-cover h-full w-full" src={post.featuredImage.node.sourceUrl}/>
          <div class="absolute bottom-0 w-full h-64 bg-gradient-to-t from-gray-custom to-transparent opacity-100"></div>
          </div></div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 bg-white py-10">
      <h1 className="text-4xl font-bold my-4">{post.title}</h1>
      <div className="flex mb-4">
        <FacebookShareButton url={post.uri} className="mr-2">
          <span className="sr-only">Share on Facebook</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M20 12.066c0-5.524-4.475-10-10-10-5.522 0-10 4.476-10 10 0 4.946 3.627 9.022 8.369 9.791v-6.955h-2.509v-2.846h2.51v-2.174c0-2.488 1.488-3.849 3.729-3.849 1.082 0 2.015.08 2.283.116v2.583l-1.564.001c-1.232 0-1.473.587-1.473 1.445v1.898h2.942l-.384 2.846h-2.558v6.875c4.512-.793 7.931-4.755 7.931-9.616z"
              clipRule="evenodd"
            />
          </svg>
        </FacebookShareButton>
        {/* <FacebookShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </FacebookShareCount>
        <HatenaShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </HatenaShareCount>
        <OKShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </OKShareCount>
        <PinterestShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </PinterestShareCount>
        <RedditShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </RedditShareCount>
        <TumblrShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </TumblrShareCount>
        <VKShareCount url={post.uri}>
          {(count) => <span className="text-sm">{count} shares</span>}
        </VKShareCount> */}
      </div>
      <div>
      {/* <div className={`text-lg ${post.postClass}`} dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      {post.blocks.map((block, index) => {
        
        return  <div styles={getStyles(block)} className={getClasses(block)} dangerouslySetInnerHTML={{ __html: block.originalContent }} />
      })}
        
      {/* Render the InstagramEmbed component for each Instagram post URL */}
      {/* {post.socialMediaLinks.instagramUrl.map(url => ( */}
       
      {/* ))} */}
    </div>
    </div>
    </div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      id
      title
      content
      uri
      blocks
     
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

