import React,{useEffect} from 'react'
import { useRouter } from 'next/router';

type LoadingScreenProps={
    firstId: string
}

const LoadingScreen = ({firstId}: LoadingScreenProps) => {
    const router = useRouter();
    useEffect(()=>{
        if(firstId.length>0){
            router.push(`/${firstId}`)
        }
    }, [firstId,router])
  return (
    <div className='w-[100%] h-[90vh] flex items-center justify-center'>
        <h1 className='text-2xl'>Loading...</h1>
    </div>
  )
}

export default LoadingScreen