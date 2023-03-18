import React from "react";

import { graphql,useStaticQuery } from "gatsby";

import { gql } from '@apollo/client';
import { navigate } from "gatsby";
import { useQuery } from '@apollo/client';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { formatDistance, parseISO, format,  formatDistanceToNow  } from 'date-fns';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CategoryTabsHomepage } from "../CategoryTabsHomepage";

export const Gallery = ({ style, className }) => {

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  };
  

    

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

//  console.log("DATA:", data.posts.nodes[0], error, loading)
 
 if (loading) return <p className="h-screen fixed top-0  bg-gray-custom w-full z-50 flex items-center justify-center"><div className="pixel  text-primary pb-10">Gamebit</div></p>;
 if (error) return <p>Error :(</p>;
  const post = data.posts.nodes;

  return (
    <div className="">
   
     

      

      {/* {data.posts.nodes.map(post => (
        <div className="" key={post.id}>
          <h2>{post.title}</h2>
          {post.featuredImage && (
            <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      ))} */}
    <div className="element">
    <div className="  container mx-auto px-4 py-20">
      <div class="first-grid grid grid-cols-2 gap-1 xl:grid-cols-4 xl:h-[600px]">
  <div className="img-overlay col-span-2 md:col-span-2"><div className="absolute bottom-0 p-5 text-white text-xl font-bold"><a href={`/article${post[0].uri}`} className="py-2 px-2 first-grid-links bg-primary">{post[0].title}</a></div><img className="  h-full w-full object-cover" src={post[0].featuredImage.node.sourceUrl}/></div>
  <div class="col-span-2  sm:col-span-1 gap-1 grid grid-rows-2">
    <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[1].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[2].featuredImage.node.sourceUrl} /></div>
  </div>
  <div class="col-span-2 sm:col-span-1 gap-1 grid grid-rows-2">
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[3].featuredImage.node.sourceUrl} /></div>
   <div className="img-overlay row-span-1"><img className=" h-full object-cover" src={post[4].featuredImage.node.sourceUrl} /></div>
  </div>
</div>
</div>
</div>
<div className="bg-gray-custom">
 
<div className="  container mx-auto px-4 ">
  <div className="py-20">
<h1 className="heading-pseudo  navbar-font-family text-center text-7xl uppercase">Latest News</h1>


{/* 
<Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      breakpoints={breakpoints}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
     {data.posts.nodes.map(post => (
      <SwiperSlide key={post.id}>
      <div class="md:2/3 relative w-full  shrink-0  bg-orange-500 ">
        <div class="absolute bottom-0 z-10 w-full  px-5 py-10">
          <h2 class="mt-4 text-xl font-bold text-white bg-primary p-3 max-w-80">{post.title}</h2>
          <p class="text-sm text-white/50">{post.category}</p>
        </div>
        <div className="img-overlay  aspect-[2/3] ">
          <img src={post.featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
      </div>
    </SwiperSlide>

))} 
    </Swiper> */}
    </div>

    {/* <div className="py-20">
<h1 className="heading-pseudo mb-20 navbar-font-family text-center text-7xl uppercase">Games</h1>

<div class="grid grid-cols-3 grid-rows-2 gap-4">
{data.posts.nodes.map(post => (
  <div class="bg-gray-100">
  <div class="md:2/3 relative w-full  shrink-0  bg-orange-500 ">
        <div class="absolute bottom-0 z-10 w-full  px-5 py-10">
          <h2 class="mt-4 text-xl font-bold text-white bg-primary p-3 max-w-80">{post.title}</h2>
          <p class="text-sm text-white/50">{post.category}</p>
        </div>
        <div className="img-overlay   ">
          <img src={post.featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
      </div>
  </div>
))} 
</div>

    </div> */}
   
    </div>
   
 
     
   
  
<CategoryTabsHomepage/>



    </div>
    
    </div>
 
  )
};
