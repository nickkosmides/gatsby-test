import React, {useEffect,useState} from "react";
import { graphql } from "gatsby";
import {Layout} from "../components/Layout";
import { formatDistanceToNow  } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons'
const getParentCategories = (category) => {
  if (!category.wpParent) {
    return [category.slug];
  }

  const parentCategories = getParentCategories(category.wpParent.node);

  if (parentCategories.length === 1) {
    console.log(parentCategories[0], category.slug)
    return [parentCategories[0], category.slug];
  } else if (parentCategories.length === 2) {
    return [parentCategories[0], parentCategories[1], category.slug];
  } else {
    return [category.slug];
  }
};

export default ({data, pageContext }) => {
  const { wpCategory } = data;
  console.log(wpCategory,'current Category')
  const parentCategories = getParentCategories(wpCategory);
  const categoryUrl = parentCategories.join("/");
  console.log(categoryUrl)
  // const [currentPage, setCurrentPage] = useState(1);
  console.log(pageContext,'count')
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [loading, setLoading] = useState(true)
  console.log(pageContext,'testpage2')
  const { currentPage, offset } = pageContext;
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
// Logic for displaying posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = allWpPost.nodes.slice(indexOfFirstPost, indexOfLastPost).slice(0, 2); // Only show first 2 posts


  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.wpCategory.count / postsPerPage); i++) {
    pageNumbers.push(i);
  }
console.log(currentPage,'pagetest')
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        className={` ${
          currentPage === number ? "active" : null
        }`}
      >
        <a
          className={` ${
            offset/postsPerPage + 1 === number ? "bg-white text-primary shadow-lg" : 'bg-primary text-white'
          } page-item cursor-pointer h-10 w-10 flex justify-center items-center `}
          href={
            number === 1
              ? `/${categoryUrl}/`
              : `/${categoryUrl}/page/${number}`
          }
        >
          {number}
        </a>
      </li>
    );
  });

  // const renderPageNumbers = pageNumbers.map((number) => {
  //   return (
  //     <li
  //       key={number}
  //       id={number}
  //       className={`page-item ${
  //         currentPage === number ? "active" : null
  //       }`}
  //     >
  //       <a
  //         className="page-link"
  //         onClick={() => setCurrentPage(number)}
  //         href="#"
  //       >
  //         {number}
  //       </a>
  //     </li>
  //   );
  // });
  // let breadcrumbs;
  // let lastPart;
  // if (typeof window !== 'undefined') {
  //   const categoryPath = window.location.pathname.slice(1).replace(/\/$/, '');
  //   const categoryParts = categoryPath.split("/");
  //   const pageIndex = categoryParts.findIndex(part => part === "page");
  //   const filteredCategoryParts = categoryParts.slice(0, pageIndex === -1 ? categoryParts.length : pageIndex);
  //   lastPart = filteredCategoryParts.slice(-1)[0];
  //   console.log(lastPart)
  //   breadcrumbs = filteredCategoryParts.map((part, index) => {
  //     const parentCategoryPath = filteredCategoryParts.slice(0, index + 1).join("/");
  
  //     return (
  //       <li className="flex space-x-3 items-center" key={parentCategoryPath}>
  //         <FontAwesomeIcon className="text-base" icon={faChevronRight} />
  //         <a href={`/${parentCategoryPath}`}>{part}</a>
  //       </li>
  //     );
  //   });
  // }
  
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
  let lastPart;
  const getFullCategoryPathBread = (categories) => {
    const findCategoryPath = (category, categories) => {
      if (!category.wpParent || !category.wpParent.node) {
        return [{ name: category.name, slug: category.slug }];
      }

      const parentCategory = categories.find((cat) => cat.id === category.wpParent.node.id);

      if (!parentCategory) {
        return [{ name: category.name, slug: category.slug }];
      }

      return [...findCategoryPath(parentCategory, categories), { name: category.name, slug: category.slug }];
    };

    let longestPath = [];
    categories.forEach((category) => {
      const path = findCategoryPath(category, categories);
      if (path.length > longestPath.length) {
        longestPath = path;
      }
    });

    return longestPath;
  };

  const categoryPath = getFullCategoryPathBread(allWpPost.nodes[0].categories.nodes);

  const breadcrumbs = categoryPath.reduce((acc, category, index) => {
    if (acc.stopAdding) {
      return acc;
    }

    if (category.slug === wpCategory.slug) {
      acc.stopAdding = true;
    }

    const parentCategoryPath = categoryPath.slice(0, index + 1).map(cat => cat.slug).join("/");

    const breadcrumb = (
      <li className="flex space-x-3 items-center" key={parentCategoryPath}>
        <FontAwesomeIcon className="text-base" icon={faChevronRight} />
        <a href={`/${parentCategoryPath}`}>{category.name}</a>
      </li>
    );

    acc.push(breadcrumb);
    return acc;
  }, []);
 
  return (
    <>
      {loading ? (
      <div className="fixed bg-black h-screen w-full">
      <h1>Loading...</h1>
    </div>
    ) : (
        <Layout>
          <div className="bg-gray-custom py-20">
            <div className="container px-4">
              <div className="text-5xl mb-20 text-center navbar-font-family">{wpCategory.name}</div>
            <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-9 col-span-12">
          <ul className="breadcrumb bg-white text-black shadow-md navbar-font-family p-4 mb-5 flex text-base items-center space-x-3"><li className=""><a href="/">Home</a> </li>{breadcrumbs}</ul>

             
             <div className="flex flex-col space-y-10">
           { allWpPost.nodes.map((post) => (
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
            <ul id="page-numbers" className="container px-4 mt-10 pagination flex flex-wrap space-x-5 ">
          {renderPageNumbers}
        </ul>
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
query($slug: String!, $limit: Int!, $offset: Int!) {
  wpCategory(slug: {eq: $slug}) {
    name
    count
    slug
    wpParent {
      node {
        name
        slug
        wpParent {
          node {
            name
            slug
          }
        }
      }
    }
  }allWpPost(
      filter: {categories: { nodes: {elemMatch: {slug: {eq: $slug}}}}},
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
`






