import React from 'react'
import { useRouter } from 'next/router';

type NavigationProps = {
    RecordItems?: {id: string; name: string}[]
    currentPage: number
    setActive: (value: any) => void
}

export const Navigation = ({RecordItems, currentPage, setActive}: NavigationProps) => {
    const router = useRouter()
  return (
    <div>
        <ul className='flex justify-center text-white w-[100%]'>
            {RecordItems?.map((item, index)=>(
                <div key={index}>
                    <div className='flex items-center'>
                    {index>0?
                    <div className={currentPage>=index+1?'relative mx-[-40px] z-1 w-80 h-2 bg-[#641AE6] mb-6 rounded-full transition-all ease-in-out duration-300':'relative mx-[-40px] z-0 w-80 h-2 bg-[#15191E] mb-6 rounded-full transition-all ease-in-out duration-300'}>
                    </div>:<p></p>}
                    <div className='relative z-[2] flex flex-col items-center'>
                    <li onClick={()=>{
                        router.push(`/${item.id}`)
                        setActive(index+1)
                    }} className={currentPage>= index+1?'bg-[#641AE6] w-11 px-4 py-2 text-xl rounded-full cursor-pointer transition-all ease-in-out duration-300': 'relative z-2 bg-[#15191E] w-11 px-4 py-2 text-xl rounded-full cursor-pointer transition-all ease-in-out duration-300'}>{index+1}</li>
                    <p>{item.name}</p>
                    </div>
                    </div>
                </div>
            ))}
        </ul>
    </div>
  )
}
