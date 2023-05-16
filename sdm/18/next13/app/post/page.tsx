import { getCollection } from "@/util/db/database";
import styles from "./page.module.css";
import Link from "next/link";

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
  const findData = await (await getCollection("post")).find().toArray();

  return (
    <>
      <div className={styles.posts}>
        {findData.map((item) => {
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
