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
const category = await graphql(`
query {
  allWpCategory {
    nodes {
      id
      name
      slug
    }
  }
}
`)
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
    // result.data.allWpPost.nodes.forEach(post => {
    //   let slug = post.slug;
    //   if (slug !== decodeURIComponent(slug)) {
    //     // slug is already encoded, so don't encode it again
    //   } else {
    //     // slug is not encoded, so encode it now
    //     slug = encodeURIComponent(slug);
    //   }
    //   createPage({
    //     path: `/article/${slug}`,
    //     component: require.resolve(`./src/templates/article.js`),
    //     context: {
    //       slug: post.slug,
    //       blocks
    //     },
    //   });
    // });
  //   result.data.allWpPost.nodes.forEach(post => {
  //     let path = `${post.categories.nodes[0].slug}/${post.slug}`; // default path
  
  //     if (post.categories.nodes.length > 1) {
  //       // check if a child category exists
  //       path = `${post.categories.nodes[0].slug}/${post.categories.nodes[1].slug}/${post.slug}`;
  //     }
  
  //     createPage({
  //       path,
  //       component: require.resolve(`./src/templates/article.js`),
  //       context: {
  //         slug: post.slug,
  //       },
  //     })
  //   })

  const result = await graphql(`
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

// Create a page for each post and its category/subcategory combination
result.data.allWpPost.nodes.forEach(post => {
  const { slug, categories } = post

  categories.nodes.forEach(category => {
    const { slug: childSlug, wpParent } = category
    const { node: parentCategory } = wpParent || {}
    const { slug: parentSlug, wpParent: grandparent } = parentCategory || {}
    const { node: grandparentCategory } = grandparent || {}
    const { slug: grandparentSlug } = grandparentCategory || {}

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
    } else if (parentSlug && childSlug) {
      createPage({
        path: `${parentSlug}/${childSlug}/${slug}`,
        component: path.resolve('./src/templates/article.js'),
        context: {
          slug,
          childSlug,
          parentSlug,
        },
      })
    } else if (childSlug) {
      createPage({
        path: `${childSlug}/${slug}`,
        component: path.resolve('./src/templates/article.js'),
        context: {
          slug,
          childSlug,
        },
      })
    } else {
      createPage({
        path: `${slug}`,
        component: path.resolve('./src/templates/article.js'),
        context: {
          slug,
        },
      })
    }
  })
})

   

    category.data.allWpCategory.nodes.forEach(category => {
      createPage({
        path: `/category/${category.slug}`,
        component: require.resolve("./src/templates/category.js"),
        context: {
          categorySlug: category.slug,
        },
      })
    })
    tags.data.allWpTag.nodes.forEach(tag => {
      createPage({
        path: `/tag/${tag.slug}`,
        component: require.resolve("./src/templates/tags.js"),
        context: {
          tagSlug: tag.slug,
        },
      })
    })

  //   const result = await graphql(`
  //   {
  //     allWpCategory {
  //       nodes {
  //         id
  //         slug
  //       }
  //     }
  //     allWpPost {
  //       nodes {
  //         id
  //         slug
  //         categories {
  //           nodes {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
    
  // `)

  // // Create a page for each post with a nested URL structure based on its categories
  // result.data.allWpPost.nodes.forEach(node => {
  //   console.log(node)
  //   const categorySlugs = node.categories.map(category => category.slug)
  //   const categoryPath = categorySlugs.length > 0 ? `${categorySlugs.join("/")}/` : ""
  //   createPage({
  //     path: `/${categoryPath}${node.slug}/`,
  //     component: path.resolve(`./src/templates/article.js`),
  //     context: {
  //       id: node.id,
  //       categoryId: node.categories[0].id,
  //     },
  //   })
  // })

  // // Create a page for each category archive with a nested URL structure
  // result.data.allWpCategory.nodes.forEach(node => {
  //   const categorySlugs = [node.slug]
  //   let parent = node.parent
  //   while (parent !== null) {
  //     const parentCategory = result.data.allWpCategory.nodes.find(category => category.id === parent)
  //     categorySlugs.unshift(parentCategory.slug)
  //     parent = parentCategory.parent
  //   }
  //   createPage({
  //     path: `/${categorySlugs.join("/")}/`,
  //     component: path.resolve(`./src/templates/category.js`),
  //     context: {
  //       id: node.id,
  //     },
  //   })
  // })

  
    // createPage({
    //   path: page.uri,
    //   component: pageTemplate,
    //   context: {
    //     databaseId: page.databaseId,
    //     blocks,
    //   }
    // });
  }
}