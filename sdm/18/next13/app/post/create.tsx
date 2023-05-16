import { useRouter } from "next/router";
import { useState } from "react";

export default function Create() {
  // 글 작성 페이지
  // title
  const [title, setTitle] = useState("");
  // content
  const [content, setContent] = useState("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
    });
    return (
      <>
        <div className="panel">
          <input
            type="text"
            name="title"
            id=""
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            name="content"
            id=""
            placeholder="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button onClick={(e) => router.back()}>취소</button>
        <button>작성</button>
      </>
    );
  };
}
