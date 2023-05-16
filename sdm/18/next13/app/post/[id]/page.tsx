import { getCollection } from "@/util/db/database";
import { ObjectId } from "mongodb";

interface Props {
  params: {
    id: string;
  }
};

export default async function postDetail({params}: Props) {
  const findData = await (await getCollection("post")).findOne({ _id: new ObjectId(params.id) });
  
  return (
    <>
      <h4>{findData?.title}</h4>
      <p>{findData?.content}</p>
    </>
  );
}