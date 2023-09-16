"use client"

import Header from "./Header"
import {useState} from "react"
import ContentBox from "./ContentBox"
import {lessonsProps} from "@/types"

type BaseAppProps = {
  records?: lessonsProps[]
  record?: lessonsProps
}

const BaseApp = ({records, record}: BaseAppProps) => {
  const [activeNumber, setActive] = useState(0)

  console.log("records:", records)
  const contents = records?.map((record) => record.Content)

  console.log("coennt", contents)

  const formattedContents = contents?.slice(activeNumber, activeNumber + 1)[0]
  console.log("formattedContents", formattedContents)

  const content =
    "# UFOs\n\nIn this lesson we are going to create UFOs,\n\n# Code\n\nThis is another slide\n\n## UFO Code\n\n```python\ndef ufo():\n    # this should display as a pre block\n    circle(100, 200, 100)\n```\n\nWe can make the UFO dynamic with\n\n```\ndef ufo2(x,y):\n    cirlce(x, y, 200)\n```\n\n# Conclusion\n\nWell done, you've learnt how to draw a ufo"
  return (
    <div className=''>
      <Header
        listItems={records?.map((record) => ({
          id: record?.id,
          name: record?.Name,
        }))}
        activeNumber={activeNumber}
        setActive={(idx) => setActive(idx)}
      />
      <ContentBox content={formattedContents as string} />
    </div>
  )
}

export default BaseApp
