import React from 'react'
import ReactMarkdown from 'react-markdown'

type MainContentProps={
    record: {data: {Content: string; Name: string; RecordID: string}}
}

const MainContent = ({record}: MainContentProps) => {
  return (
    <div className='mt-10 px-10 text-white'>
        <div className='markdown-content'>
        <ReactMarkdown>{record.data.Content}</ReactMarkdown>
        </div>
    </div>
  )
}

export default MainContent