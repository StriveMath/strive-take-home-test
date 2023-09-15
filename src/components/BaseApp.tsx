"use client"

import Header from "./Header"
import {useState} from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import ContentBox from "./ContentBox"

const BaseApp = () => {
  const [activeNumber, setActive] = useState(0)
  const content =
    "# UFOs\n\nIn this lesson we are going to create UFOs,\n\n# Code\n\nThis is another slide\n\n## UFO Code\n\n```python\ndef ufo():\n    # this should display as a pre block\n    circle(100, 200, 100)\n```\n\nWe can make the UFO dynamic with\n\n```\ndef ufo2(x,y):\n    cirlce(x, y, 200)\n```\n\n# Conclusion\n\nWell done, you've learnt how to draw a ufo"
  return (
    <div className=''>
      <Header
        listItems={["Olumide", "bola", "ade", "tolu"]}
        activeNumber={activeNumber}
        setActive={(idx) => setActive(idx)}
      />
      <ContentBox content={content} />
    </div>
  )
}

export default BaseApp
