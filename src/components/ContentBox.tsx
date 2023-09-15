"use client"
import React, {ReactElement} from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type ContentBoxProps = {
  content: string
}
const ContentBox = ({content}: ContentBoxProps) => {
  return <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
}

export default ContentBox
