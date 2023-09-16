"use client"
import Link from "next/link"
import {useRouter} from "next/router"
import React from "react"

type HeaderProps = {
  activeNumber: number
  listItems?: {id: string; name: string}[]
  setActive?: (value: any) => void
}

const Header = ({activeNumber, listItems, setActive}: HeaderProps) => {
  const router = useRouter()
  return (
    <ul className='steps w-full'>
      {listItems?.map((item, idx) => (
        <li
          onClick={() => {
            router.push(`/${item.id}`)
            setActive && setActive(idx)
          }}
          key={idx}
          className={`${activeNumber >= idx ? "step step-primary" : "step"}`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default Header
