"use client";
import { Post } from "@/pages/api/post";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  params: {
    id: string;
  };
}

export default async function PostDetail({ params }: Props) {
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

  return (
    <>
      <h4>{findData.title}</h4>
      <p>{findData.content}</p>
      <Link href={`/post/${params.id}/modify`}>
        <button>수정</button>
      </Link>
      <button
        onClick={async () => {
          fetch(`http://localhost:3000/api/post/${params.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res1) => {
            // console.log("res.headers : ", res1.headers);
            // console.log(res1.headers.get("Location"));
          });
          // useRouter().push( res1.headers.get("Location")?.toString() || "/" );
          // console.log("DELETE End point");
        }}
      >
        삭제
      </button>
    </>
  );
}
