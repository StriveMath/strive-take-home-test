"use client"
import React from "react"
import ReactMarkdown from "react-markdown"

type ContentBoxProps = {
  content?: string
}
const ContentBox = ({}: ContentBoxProps) => {
  return (
    <ReactMarkdown>
      This will be a new slide ## This will be a subheading in that slide This
      will be in an editor code block. You’ll be able to use the same syntax
      when creating content for the editor. ```python def draw(): # This will be
      the editor in the a slide ``` You can use multiple code blocks in a slide
      ```python def setup(): # like this ```
    </ReactMarkdown>
  )
}

export default ContentBox
