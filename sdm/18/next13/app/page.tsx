import Image from "next/image";
import styles from "./page.module.css";
import { getCollection } from "@/util/db/database";


export default async function Home() {

// const findData = await (await getCollection("post")).find().toArray();
// console.log('findData');

// console.log(findData);



  return (
    <>
      <div>hello</div>
    </>
  );
}
