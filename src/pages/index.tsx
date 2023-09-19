import BaseLayout from '@/components/BaseLayout'
import { Inter } from 'next/font/google'
import axios from 'axios'
import {useEffect, useState} from 'react'
import LoadingScreen from '@/components/LoadingScreen';
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";


const inter = Inter({ subsets: ['latin'] })

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <BaseLayout>
      <LoadingScreen firstId={props.firstId}/>
    </BaseLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // server side code here
  let firstId = ''
  try{
    const res = await axios(`${process.env.SERVER_URL}/lessons`);
    if(res.status===200){
      firstId = res['data']['data'][0]['id'];
      // setFirstRecord(id)
    }
    }
    catch(error){
        console.log(error)
    }
  return {
    props: { firstId },
  };
};
