'use client'
//게시글 수정 페이지

import { useEffect, useState } from "react";

export default function ModifyPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  useEffect(() => {
    //http:localhost:3000/post/[id]/modify GET Method를 통해서 데이터를 가져온다.
    console.log("modify start" );
    const id = window.location.pathname.split("/")[2];
    console.log("window.location.pathname : ", window.location.pathname);
    console.log("id : ", id);
    fetch(`http://localhost:3000/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
        console.log("modify end");
      });
    });
  }, []);
  
  function onClick() {
    console.log("submit ::: ", title, content);
    const id = window.location.pathname.split("/")[2];
    fetch(`http://localhost:3000/api/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    }).then((res) => {
      console.log(res);
    });
  }
  
  return (
    <>
      <div className="panel">
        <input type="text" name="title" id="" defaultValue={title} placeholder="title" onChange={(e)=>{setTitle(e.target.value)}} />
        <input type="text" name="content" id="" defaultValue={content} placeholder="content" onChange={(e)=>{setContent(e.target.value)}} />
        <button onClick={(e) => {onClick()}}>수정</button>
      </div>
    </>
  )

}
  