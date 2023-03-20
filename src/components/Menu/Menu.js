import React from "react";
import { graphql,useStaticQuery } from "gatsby";
import { Link } from "gatsby";

export const Menu = () => {
  // const data = useStaticQuery(graphql`
  // query MyQuery {
  //   wp {
  //     acfOptionsMainMenu {
  //       mainMenu {
  //         menuItems {
  //           root {
  //             destination {
  //               url
  //             }
  //             label
  //           }
  //           subMenuItems {
  //             destination {
  //               url
  //             }
  //             label
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // `);
  // console.log("Main menu", data);
  // const {menuItems} = data.wp.acfOptionsMainMenu.mainMenu
  return (
  <div>sd</div>
//   <div className="sticky top-0 z-30">
//   <div className="bg-white border-b-[1px] border-gray-300 flex items-center text-black px-4 font-bold   h-20 ">
//     <div className=" container mx-auto px-4">
//   <div className="pixel flex justify-center items-center text-primary">Gamebit</div>
//   </div>
// </div>
// <div className="bg-white border-b-[1px] border-gray-300 hidden lg:flex items-center box  text-black px-4  h-16 ">
//     <div className=" container mx-auto px-4">
//     <div className="flex h-full justify-center">
//       {(menuItems || []).map((menuItem, index) => (
//       <div key={index} className="group relative flex h-full cursor-pointer ">
//         <Link to={menuItem.root.destination.url} className="px-4 flex h-full items-center text-black hover:text-primary uppercase text-lg no-underline navbar-font-family">
//         {menuItem.root.label}
//         </Link>
//         {!!menuItem.subMenuItems?.length && 
//         <div className="group-hover:block hidden bg-emerald-800 text-right absolute top-full right-0">
//           {menuItem.subMenuItems.map((subMenuItem, index) => (
//             <Link className="block whitespace-nowrap text-white p-4 no-underline " to={subMenuItem.destination.url} key={index}>
//               {subMenuItem.label}
//             </Link>
//           ))}
// </div>
//         }
//       </div>
//     ))}
//       </div>
//   </div>
// </div>
// </div>
)
  
  
  
}