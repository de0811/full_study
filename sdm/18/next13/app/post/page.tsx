import styles from "./page.module.css";
import Link from "next/link";
import post, { Post } from "../../pages/api/post";
import Create from "../write/page";

interface Props {
  _id: string;
  title: string;
  content: string;
}

function Post(props: Props) {
  return (
    <>
      <div className={`${"panel"} ${styles.postItem}`}>
        <div>{props._id}</div>
        <div>{props.title}</div>
        <div>{props.content}</div>
      </div>
    </>
  );
}

export async function List() {
  // http://localhost:3000/post GET Method를 통해서 데이터를 가져온다.
  // 데이터를 캐시하면 안된다
  const res = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const findData: Post[] = await res.json();

  return (
    <>
      <div className={styles.posts}>
        {findData.map((item: Post) => {
          return (
            <Link
              href={`/post/${item._id.toString()}`}
              key={item._id.toString()}
            >
              <Post
                key={item._id.toString()}
                _id={item._id.toString()}
                title={item.title}
                content={item.content}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default List;
