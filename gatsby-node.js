const path = require('path');
const {assignIds, assignGatsbyImage} = require("@webdeveducation/wp-block-tools");
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const fs = require('fs');



// gatsby-node.js






const removeTrailingSlashes = (url) => {
  const [baseUrl, queryParams] = url.split('?');
  const sanitizedQueryParams = queryParams ? queryParams.replace(/\//g, '') : '';
  return sanitizedQueryParams ? `${baseUrl}?${sanitizedQueryParams}` : baseUrl;
};
exports.createPages = async ({actions, graphql}) => {
  const pageTemplate = path.resolve("src/templates/page.js")
  const {createPage} = actions;

  const {data} = await graphql(`
  query AllPagesQuery {
    wp {
      themeStylesheet
    }
    allWpPage {
      nodes {
        blocks
        databaseId
        uri
      }
    }
  }
  `)
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/home.js"),
    
  })

  
  // const allPages = data.allWpPage.nodes
  // for(let i = 0; i < allPages.length; i++) {
  //   const page  = allPages[i];
  //   let blocks = page.blocks;

  //   blocks = assignIds(blocks);
  //   blocks = await assignGatsbyImage({
  //     blocks,
  //     graphql,
  //     coreMediaText: true,
  //     coreImage: true,
  //     coreCover: true,
  //   });
  //   createPage({
  //     path: page.uri,
  //     component: pageTemplate,
  //     context: {
  //       databaseId: page.databaseId,
  //       blocks,
  //     }
  //   });
  // }

//   const result = await graphql(`
//   query {
//     allWpPost {
//       nodes {
//         slug
//         categories {
//           nodes {
//             slug
//           }
//         }
//       }
//     }
//   }
// `);

// // Query all categories from WordPress
// const category = await graphql(`
// query AllCategories {
//   allWpCategory {
//     nodes {
//       id
//       name
//       slug
//       wpParent {
//         node {
//           slug
//           wpParent {
//             node {
//               slug
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `)
// if (category.errors) {
//   throw category.errors
// }

// const categories = category.data.allWpCategory.nodes

// // Create a new page for each category
// categories.forEach((category) => {

// console.log(categories)
//   // Create pages for each grandchild category
//   if (category.wpParent && category.wpParent.node.wpParent) {
//     createPage({
//       path: `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}/${category.slug}/`,
//       component: require.resolve("./src/templates/category.js"),
//       context: {
//         slug: category.slug,
//       },
//     })
//     createPage({
//       path: `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}/`,
//       component: require.resolve("./src/templates/category.js"),
//       context: {
//         slug: category.wpParent.node.slug,
//       },
//     })
//     createPage({
//       path: `/${category.wpParent.node.wpParent.node.slug}/`,
//       component: require.resolve("./src/templates/category.js"),
//       context: {
//         slug: category.wpParent.node.wpParent.node.slug,
//       },
//     })
//   }  else if (category.wpParent && !category.wpParent.node.wpParent){
    
//       createPage({
//         path: `/${category.wpParent.node.slug}/${category.slug}`,
//         component: require.resolve("./src/templates/category.js"),
//         context: {
//           slug: category.slug,
//         },
//       })
//     }
// })
const categoriesgraph = await graphql(`
    query AllCategories {
      allWpCategory {
        nodes {
          id
          name
          slug
          count
          wpParent {
            node {
              slug
              count
              wpParent {
                node {
                  slug
                  count
                }
              }
            }
          }
        }
      }
    }
  `);

  if (categoriesgraph.errors) {
    throw categoriesgraph.errors;
  }

  const categories = categoriesgraph.data.allWpCategory.nodes;
  const postsPerPage = 2;

  // Create a new page for each category
  categories.forEach((category) => {
    // Create paginated pages for each grandchild category
    if (category.wpParent && category.wpParent.node.wpParent) {
      const numPagesGrandchild = Math.ceil(category.count / postsPerPage);
      Array.from({ length: numPagesGrandchild }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}/${category.slug}`
              : `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}/${category.slug}/page/${i +
                  1}`,
          component: require.resolve("./src/templates/category.js"),
          context: {
            slug: category.slug,
            limit: postsPerPage,
            offset: i * postsPerPage,
          },
        });
      });

      const numPagesParent = Math.ceil(category.wpParent.node.count / postsPerPage);
      Array.from({ length: numPagesParent }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}`
              : `/${category.wpParent.node.wpParent.node.slug}/${category.wpParent.node.slug}/page/${i + 1}`,
          component: require.resolve("./src/templates/category.js"),
          context: {
            slug: category.wpParent.node.slug,
            limit: postsPerPage,
            offset: i * postsPerPage,
          },
        });
      });

      const numPagesTop = Math.ceil(category.wpParent.node.wpParent.node.count / postsPerPage);
      Array.from({ length: numPagesTop }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? `/${category.wpParent.node.wpParent.node.slug}`
              : `/${category.wpParent.node.wpParent.node.slug}/page/${i + 1}`,
          component: require.resolve("./src/templates/category.js"),
          context: {
            slug: category.wpParent.node.wpParent.node.slug,
            limit: postsPerPage,
            offset: i * postsPerPage,
          },
        });
      });
    }
    else if (category.wpParent && !category.wpParent.node.wpParent){
      const numPagesTop = Math.ceil(category.count / postsPerPage);
      Array.from({ length: numPagesTop }).forEach((_, i) => {
        createPage({
          path: removeTrailingSlashes(
            i === 0
              ? `/${category.wpParent.node.slug}/${category.slug}`
              : `/${category.wpParent.node.slug}/${category.slug}/page/${i + 1}`),
          component: require.resolve("./src/templates/category.js"),
          context: {
            slug:  category.slug,
            limit: postsPerPage,
            offset: i * postsPerPage,
          },
        });
      });
    
    }
  })
// Query all tags from WordPress
const tagsGraphQL = await graphql(`
query {
  allWpTag {
    nodes {
      id
      name
      slug
      count
    }
  }
}
`);

if (tagsGraphQL.errors) {
  throw tagsGraphQL.errors;
}

const postsPerPageTags = 2; // Set the number of posts per page
const tags = tagsGraphQL.data.allWpTag.nodes;

tags.forEach((tag) => {
  const numPages = Math.ceil(tag.count / postsPerPageTags);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/tag/${tag.slug}` : `/tag/${tag.slug}/page/${i + 1}`,
      component: path.resolve("./src/templates/tags.js"),
      context: {
        slug: tag.slug,
        limit: postsPerPageTags,
        offset: i * postsPerPageTags,
      },
    });
  });
});

  try {
    fs.writeFileSync("./public/themeStylesheet.css", data.wp.themeStylesheet);
  }catch(e) {

  }
  // const allPages = [...data.allWpPage.nodes, ...data.allWpCar.nodes];
  for(let i = 0; i < data.allWpPage.nodes.length; i++) {
    const page  = data.allWpPage.nodes[i];
    let blocks = page.blocks;

    blocks = assignIds(blocks);
    blocks = await assignGatsbyImage({
      blocks,
      graphql,
      coreMediaText: true,
      coreImage: true,
      coreCover: true,
    });
  }

  const article = await graphql(`
  {
    allWpPost {
      nodes {
        slug
        categories {
          nodes {
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
`)
if (article.errors) {
  throw new Error("Error fetching WordPress data");
}

const posts = article.data.allWpPost.nodes;

const createPostPage = (post, grandparentSlug, parentSlug, childSlug) => {
  const postPath = grandparentSlug
    ? `/${grandparentSlug}/${parentSlug}/${childSlug}/${post.slug}`
    : `/${parentSlug}/${childSlug}/${post.slug}`;

  createPage({
    path: postPath,
    component: path.resolve("./src/templates/article.js"),
    context: {
      grandparentSlug,
        parentSlug,
        childSlug,
        slug: post.slug,
    },
  });
};

posts.forEach(post => {
  const categories = post.categories.nodes;

  let grandparentCategoryFound = false;

  categories.forEach(childCategory => {
    if (childCategory.wpParent) {
      const parentCategory = childCategory.wpParent.node;
      const grandparentCategory = parentCategory.wpParent && parentCategory.wpParent.node;

      if (grandparentCategory) {
        grandparentCategoryFound = true;
        createPostPage(post, grandparentCategory.slug, parentCategory.slug, childCategory.slug);
      }
    }
  });

  if (!grandparentCategoryFound) {
    categories.forEach(childCategory => {
      if (childCategory.wpParent) {
        const parentCategory = childCategory.wpParent.node;
        createPostPage(post, null, parentCategory.slug, childCategory.slug);
      }
    });
  }
});
};










// const processedCategories = new Set()

// result.data.allWpPost.nodes.forEach(post => {
//   const { slug, categories } = post

//   categories.nodes.forEach(category => {
//     const { slug: childSlug, wpParent } = category
//     const { node: parentCategory } = wpParent || {}
//     const { slug: parentSlug, wpParent: grandparent } = parentCategory || {}
//     const { node: grandparentCategory } = grandparent || {}
//     const { slug: grandparentSlug } = grandparentCategory || {}

//     const categoryPath = grandparentSlug
//       ? `${grandparentSlug}/${parentSlug}/${childSlug}`
//       : parentSlug
//       ? `${parentSlug}/${childSlug}`
//       : childSlug

//     if (!processedCategories.has(categoryPath)) {
//       processedCategories.add(categoryPath)

//       if (parentSlug && grandparentSlug && childSlug) {
//         createPage({
//           path: `${grandparentSlug}/${parentSlug}/${childSlug}/${slug}`,
//           component: path.resolve('./src/templates/article.js'),
//           context: {
//             slug,
//             childSlug,
//             parentSlug,
//             grandparentSlug,
//           },
//         })
//       } else if (parentSlug && childSlug) {
//         createPage({
//           path: `${parentSlug}/${childSlug}/${slug}`,
//           component: path.resolve('./src/templates/article.js'),
//           context: {
//             slug,
//             childSlug,
//             parentSlug,
//           },
//         })
//       } else if (childSlug) {
//         createPage({
//           path: `${childSlug}/${slug}`,
//           component: path.resolve('./src/templates/article.js'),
//           context: {
//             slug,
//             childSlug,
//           },
//         })
//       } else {
//         createPage({
//           path: `${slug}`,
//           component: path.resolve('./src/templates/article.js'),
//           context: {
//             slug,
//           },
//         })
//       }
//     }
//   })
// })