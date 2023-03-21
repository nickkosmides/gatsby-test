import React from "react";
import { BlockRenderer,getStyles, getClasses } from "@webdeveducation/wp-block-tools";

import { MediaText,Cover, Gallery } from "../components/index";
import { GatsbyImage } from "gatsby-plugin-image";


import numeral from "numeral";


export const BlockRendererComponents = (block) => {
  console.log('asd')
  switch(block.name){
case "core/media-text": {
  console.log("render component2: ", block.attributes.gatsbyImage);
  return (<MediaText key={block.id} className={getClasses(block)} style={getStyles(block)}
  verticalAlignment={block.attributes.verticalAlignment}
  gatsbyImage={block.attributes.gatsbyImage}
  mediaPosition={block.attributes.mediaPosition}
  >
    <BlockRenderer blocks={block.innerBlocks}/>
  </MediaText>
  );
}
// case "core/cover": {
//   return <Cover key={block.id} style={getStyles(block)}
//   className={getClasses(block)}
//   gatsbyImage={block.attributes.gatsbyImage}>
//   <BlockRenderer blocks={block.innerBlocks}/>
//   </Cover>
// }
case "core/gallery": {
  return <Gallery key={block.id} 
  verticalAlignment={block.attributes.verticalAlignment}
  gatsbyImage={block.attributes.gatsbyImage}
  mediaPosition={block.attributes.mediaPosition}
  
  >
  <BlockRenderer blocks={block.innerBlocks}/>
  </Gallery>
}

default:
  return null
  }
}