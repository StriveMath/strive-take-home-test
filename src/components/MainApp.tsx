import React from 'react'
import { Navigation } from './Navigation'
import MainContent from './MainContent'
import {useState} from "react"

type MainAppProps={
    record: {data: {Content: string; Name: string; RecordID: string}}
    records: {id: string; name: string}[]
}

const MainApp = ({record, records}: MainAppProps) => {
    const [activePage, setActivePage] = useState(1)
  return (
    <div>
        <Navigation RecordItems={records} currentPage={activePage} setActive={(index)=>setActivePage(index)} />
        <MainContent record={record}/>
    </div>
  )
}

export default MainApp