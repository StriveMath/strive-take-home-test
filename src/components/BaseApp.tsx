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
  console.log("record:", record)

  // this method used prefetch content before routing to detail page (/recordId)
  // because i need all records names to load navigation labels
  const contents = record
    ? record.Content
    : records?.map((record) => record.Content)

  const formattedContents = Array.isArray(contents)
    ? contents?.slice(activeNumber, activeNumber + 1)[0]
    : contents

  return (
    <div className=''>
      <Header
        listItems={records?.map((record) => ({
          id: record?.id,
          name: record?.Name,
        }))}
        activeNumber={activeNumber}
        setActive={(idx) => setActive(idx)}
        recordId={record?.id}
      />
      <ContentBox content={formattedContents as string} />
    </div>
  )
}

export default BaseApp
