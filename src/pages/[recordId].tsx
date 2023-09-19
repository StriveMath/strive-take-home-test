import BaseLayout from "@/components/BaseLayout";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import MainApp from '@/components/MainApp'
import axios from 'axios'

export default function Lesson(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <BaseLayout> <MainApp record={props.record} records={props.records}/> </BaseLayout>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // server side code here
  const { recordId } = ctx.params as { recordId: string };
  let record,records;
  try{
    let res2 = await axios(`${process.env.SERVER_URL}/lessons`);
    if(res2.status===200){
      records=res2.data.data.map((rec: { id: string; fields: { Name: string; }; })=>({id: rec.id, name: rec.fields.Name}))
    }
    if(recordId){
      let res = await axios(`${process.env.SERVER_URL}/lesson?recordId=${recordId}`);
      if(res.status===200){
        record = res.data
      }
      }
    }
    catch(error){
        console.log(error)
    }
  return {
    props: { record, records },
  };
};
