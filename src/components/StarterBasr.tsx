import {useRouter} from "next/router"
import React, {useEffect} from "react"

type StaterProps = {
  id: string
}

const StarterBase = ({id}: StaterProps) => {
  const router = useRouter()

  useEffect(() => {
    if (id) {
      router.push(`/${id}`)
    }
  }, [id, router])
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      Please be patient, we are taking you there ...
    </div>
  )
}

export default StarterBase
