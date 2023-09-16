"use client"
import Link from "next/link"
import React from "react"

type HeaderProps = {
  activeNumber: number
  listItems?: {id: string; name: string}[]
  setActive?: (value: any) => void
}

const Header = ({activeNumber, listItems, setActive}: HeaderProps) => {
  return (
    <ul className='steps w-3/5'>
      {listItems?.map((item, idx) => (
        <Link href={""} key={idx}>
          <li
            className={`${activeNumber >= idx ? "step step-primary" : "step"}`}
            onClick={() => setActive && setActive(idx)}
          >
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Header
