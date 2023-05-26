"use client"

import { useState } from "react";

//글 작성해서 보내는 페이지


export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function onClick() {
    console.log("submit ::: ", title, content);
    fetch("http://localhost:3000/api/post", {
      method: "POST",
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
        <input type="text" name="title" id="" value={title} placeholder="title" onChange={(e)=>{setTitle(e.target.value)}} />
        <input type="text" name="content" id="" value={content} placeholder="content" onChange={(e)=>{setContent(e.target.value)}} />
      </div>
      <button onClick={(e) => {onClick()}}>작성</button>
    </>
  );
}
