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
    <ul className='steps w-4/5'>
      {listItems?.map((item, idx) => (
        <Link
          href={""}
          onClick={() => setActive && setActive(idx)}
          key={idx}
          className={`${activeNumber >= idx ? "step step-primary" : "step"}`}
        >
          <li>{item.name}</li>
        </Link>
      ))}
    </ul>
  )
}

export default Header
