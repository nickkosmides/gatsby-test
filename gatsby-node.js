const path = require('path');
const {assignIds, assignGatsbyImage} = require("@webdeveducation/wp-block-tools");
const fs = require('fs');
exports.createPages = async ({actions, graphql}) => {
  const pageTemplate = path.resolve("src/templates/page.js")
  const {createPage} = actions;
  // wp {
  //   themeStylesheet
  // }
  // allWpCar {
  //   nodes {
  //     blocks
  //     databaseId
  //     uri
  //   }
  // }
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

// Query all categories from WordPress
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
// Query all tags from WordPress
const tags = await graphql(`
query {
  allWpTag {
    nodes {
      id
      name
      slug
    }
  }
}
`)
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

const processedCategories = new Set()

article.data.allWpPost.nodes.forEach(post => {
  const { slug, categories } = post

  categories.nodes.forEach(category => {
    const { slug: childSlug, wpParent } = category
    const { node: parentCategory } = wpParent || {}
    const { slug: parentSlug, wpParent: grandparent } = parentCategory || {}
    const { node: grandparentCategory } = grandparent || {}
    const { slug: grandparentSlug } = grandparentCategory || {}

    const categoryPath = grandparentSlug
      ? `${grandparentSlug}/${parentSlug}/${childSlug}`
      : parentSlug
      ? `${parentSlug}/${childSlug}`
      : childSlug

  

      if (parentSlug && grandparentSlug && childSlug) {
        createPage({
          path: `${grandparentSlug}/${parentSlug}/${childSlug}/${slug}`,
          component: path.resolve('./src/templates/article.js'),
          context: {
            slug,
            childSlug,
            parentSlug,
            grandparentSlug,
          },
        })
      } 
    
  })
})

   

  }
}







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