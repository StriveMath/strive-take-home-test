"use client"
import Image from "next/image"
import {Inter} from "next/font/google"
import Header from "@/components/Header"
import {useState} from "react"

export default function Home() {
  const [activeNumber, setActive] = useState(0)
  return (
    <div className=''>
      <Header
        listItems={["Olumide", "bola", "ade", "tolu"]}
        activeNumber={activeNumber}
        setActive={(idx) => setActive(idx)}
      />
    </div>
  )
}
