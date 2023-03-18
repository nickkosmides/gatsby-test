import React, { useState, useEffect } from "react"

export const InstagramEmbed = ({ url }) => {
  const [html, setHtml] = useState("")

  useEffect(() => {
    fetch(`https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`)
      .then((res) => res.json())
      .then((data) => {
        setHtml(data.html)
      })
      .catch((err) => {
        console.error("Error loading Instagram post", err)
      })
  }, [url])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}