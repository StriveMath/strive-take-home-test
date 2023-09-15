"use client"
import React from "react"

type HeaderProps = {
  activeNumber: number
  listItems?: string[]
  setActive?: (value: any) => void
}

const Header = ({activeNumber, listItems, setActive}: HeaderProps) => {
  return (
    <ul className='steps w-3/5'>
      {listItems?.map((item, idx) => (
        <li
          key={idx}
          className={`${activeNumber >= idx ? "step step-primary" : "step"}`}
          onClick={() => setActive && setActive(idx)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Header
