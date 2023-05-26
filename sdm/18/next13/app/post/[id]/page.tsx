import { Post } from "@/pages/api/post";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function postDetail({ params }: Props) {
  //http:localhost:3000/post/[id] GET Method를 통해서 데이터를 가져온다.
  console.log("[params.id] : ", params.id);
  const res = await fetch(`http://localhost:3000/api/post/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const findData: Post = await res.json();
  console.log("[findData] : ", findData);
  console.log(findData);
  
  const onDelete = () => {
    fetch(`http://localhost:3000/api/post/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <h4>{findData.title}</h4>
      <p>{findData.content}</p>
      <Link href={`/post/${params.id}/modify`}>
        <button>수정</button>
      </Link>
      <Link href={`/api/post/${params.id}`}>
        <button>삭제</button>
      </Link>
      

    </>
  );
}
