import React, {useState} from "react"
import { useQuery, gql } from "@apollo/client"
import { formatDistance, parseISO, format,  formatDistanceToNow  } from 'date-fns';
const ALL_POSTS_QUERY = gql`
query AllPosts($categoryName: String!) {
  posts(where: {categoryName: $categoryName}) {
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

`

export const CategoryTabsHomepage = () => {
  const [category, setCategory] = useState('playstation')
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY, {
    variables: { categoryName: category },
  })

console.log(loading)

  // if (loading) return <p className="bg-black h-[1000px]">Loading...</p>
  // if (error) return <p>Error: {error.message}</p>
 
  return (
    <div className="container px-4 py-20">
      <div className="grid grid-cols-12 gap-6">
    <div className="col-span-8">
      <div className=" mb-20">
      <div className=" bg-white mx-auto px-4 overflow-x-auto">
        <div className="flex  flex-nowrap items-center space-x-10 navbar-font-family text-lg uppercase h-20">
          <div onClick={(event) => {  event.preventDefault();  event.stopPropagation(); setCategory('latest-news')}} className="h-full whitespace-nowrap bg-primary text-white flex items-center px-10">Latest news</div>
          <div onClick={(event) => {  event.preventDefault();  event.stopPropagation(); setCategory('playstation')}} className="h-full whitespace-nowrap text-black flex items-center px-10">Playstation</div>
          <div onClick={(event) => {  event.preventDefault();  event.stopPropagation(); setCategory('xbox')}} className="h-full whitespace-nowrap  text-black flex items-center px-10">Xbox</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">Nintendo</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">PC</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">Movies & TV</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">tech</div>
        </div>
      </div>
    </div>
    {loading ? (
       <div class="bg-gray-100 pb-10  ">
       <div className="">
         <div class="w-full relative  ">
           <div className="skeleton-img-overlay animate-pulse"><img src="https://dummyimage.com/16:9x1080/"></img></div>
         </div>
         <div class="w-full mt-4 text-xl font-bold text-black max-w-80">
           <div className="skeleton-text animate-pulse"></div>
         </div>
         <div className="flex space-x-5">
           <div className="text-gray-500 uppercase">
             <div className="skeleton-text animate-pulse"></div>
           </div>
           <div className="text-gray-500">
             <div className="skeleton-text animate-pulse"></div>
           </div>
         </div>
       </div>
       <div className=" flex flex-col space-y-10">
         {[1,2,3,4,5].map((num) => (
           <div key={num} class="bg-gray-100 flex w-full">
             <div class="w-6/12 relative  ">
               <div className="skeleton-img-overlay animate-pulse"><img src="https://dummyimage.com/16:9x1080/"></img></div>
             </div>
             <div className="flex w-6/12 flex-col space-y-4 px-2">
               <h2 class="text-xl font-bold text-black">
                 <div className="skeleton-text animate-pulse"></div>
               </h2>
               <div className="skeleton-text animate-pulse"></div>
               <div className="flex space-x-5">
                 <div className="text-gray-500 uppercase">
                   <div className="skeleton-text animate-pulse"></div>
                 </div>
                 <div className="text-gray-500">
                   <div className="skeleton-text animate-pulse"></div>
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
      ) : error ? (
        <p>Error: {error.message}</p>): (
       data && (<div class="bg-gray-100 pb-10  ">
        <div className="">
  <div class="w-full relative  ">
        {/* <div class="absolute bottom-0 z-10 w-full  px-5 py-10">
          <h2 class="mt-4 text-xl font-bold text-white bg-primary p-3 max-w-80">{post.title}</h2>
          <p class="text-sm text-white/50">{post.category}</p>
        </div> */}
        <div className="img-overlay   ">
          <img src={data.posts.nodes[0].featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
      </div>
      <h2 class="w-full mt-4 text-xl font-bold text-black   max-w-80">{data.posts.nodes[0].title}</h2>
      <div className="flex space-x-5">
      <div className="text-gray-500 uppercase">posted by {data.posts.nodes[0].author.node.name}</div>
      <div className="text-gray-500">{ formatDistanceToNow (new Date(data.posts.nodes[0].date), 'MMMM dd, yyyy')} ago</div>
      </div>
      </div>
 
  <div className=" flex flex-col space-y-10">
{data.posts && data.posts.nodes.slice(1).map(post => (
  <div key={post.id} class="bg-gray-100 flex w-full">
  <div class="w-6/12 relative  ">
        {/* <div class="absolute bottom-0 z-10 w-full  px-5 py-10">
          <h2 class="mt-4 text-xl font-bold text-white bg-primary p-3 max-w-80">{post.title}</h2>
          <p class="text-sm text-white/50">{post.category}</p>
        </div> */}
        <div className="img-overlay   ">
          <img src={post.featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
        
      </div>
      <div className="flex w-6/12 flex-col space-y-4 px-2">
      <h2 class=" text-xl font-bold text-black  "><a href="#">{post.title}</a></h2>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0,150) }} />
      <div className="flex space-x-5">
      <div className="text-gray-500 uppercase">posted by {post.author.node.name}</div>
      <div className="text-gray-500">{ formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
      </div>
      </div>
   
  </div>
))} 
</div>
</div>))}
</div>
<div className="col-span-4 bg-red-500">

</div>
    </div>
    </div>
  )
}


// import React, { useState } from "react"
// import { useQuery, gql } from "@apollo/client"

// const CATEGORY_POSTS_QUERY = gql`
//   query CategoryPostsQuery($categorySlug: ID!) {
//     category(id: $categorySlug, idType: SLUG) {
//       id
//       name
//       slug
//       posts(first: 10, where: { status: PUBLISH }) {
//         nodes {
//           id
//           title
//           excerpt
//           date
//           slug
//         }
//       }
//     }
//   }
// `

// export const CategoryTabsHomepage = () => {
//   const [categorySlug, setCategorySlug] = useState("uncategorized") // default category
//   const { loading, error, data } = useQuery(CATEGORY_POSTS_QUERY, {
//     variables: { categorySlug },
//   })

//   const handleCategoryChange = (event, newCategorySlug) => {
//     event.preventDefault()
//     setCategorySlug(newCategorySlug)
//   }

//   if (loading) return <p>Loading..a</p>
//   if (error) return <p>Error: {error.message}</p>

//   return (
//     <div>
//       <h2>Category: {data.category.name}</h2>
//       <div>
//         {data.category.posts.nodes.map(post => (
//           <div key={post.id}>
//             <h3><a href={`/posts/${post.slug}`}>{post.title}</a></h3>
//             <p>{post.excerpt}</p>
//             <p>{new Date(post.date).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h4 className="mt-96">Change Category:</h4>
//         <button onClick={event => handleCategoryChange(event, "uncategorized")}>Uncategorized</button>
//         <button onClick={event => handleCategoryChange(event, "playstation")}>News</button>
//         <button onClick={event => handleCategoryChange(event, "xbox")}>Reviews</button>
//         {/* add more buttons as needed */}
//       </div>
//     </div>
//   )
// }









