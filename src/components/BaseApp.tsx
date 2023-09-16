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

  const contents = record ? record.Content : " "

  const formattedContents = contents

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
