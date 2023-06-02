import { getCollection } from "@/util/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import async from "../../../app/page";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "post";

export default function post(req: NextApiRequest, res: NextApiResponse) {
  //referrer 확인
  console.log("req.headers.referer : ", req.headers.referer);
  switch (req.method) {
    case "GET":
      console.log("req.query.id : ", req.query.id);
      if (req.query.id === undefined) {
        getPost(undefined).then((data) => {
          res.status(200).json(data);
        });
      } else {
        getPost(req.query.id as string).then((data) => {
          res.status(200).json(data);
        });
      }
      break;
    case "POST":
      insertPost(req.body.title, req.body.content).then((data) => {
        res.status(201).redirect("/post/" + data?.insertedId);
      });
      break;
    default:
      res.status(404).json({ text: "Not Found" });
  }
}

export interface Post {
  _id: string;
  title: string;
  content: string;
}

export const posts: Post[] = [
  {
    _id: "1",
    title: "1번글",
    content: "1번글 내용",
  },
  {
    _id: "2",
    title: "2번글",
    content: "2번글 내용",
  },
  {
    _id: "3",
    title: "3번글",
    content: "3번글 내용",
  },
];

function getLocalPost(_id: string | undefined) {
  if (_id === undefined) return posts;
  else {
    const post = posts.find((post) => post._id === _id);
    if (post === undefined) return [];
    else return [post];
  }
}

async function getPost(_id: string | undefined) {
  try {
    if (_id === undefined) {
      const findData = await (await getCollection(COLLECTION_NAME))
        .find()
        .toArray();
      return findData;
    } else {
      const findData = await (
        await getCollection(COLLECTION_NAME)
      ).findOne({ _id: new ObjectId(_id) });
      return findData;
    }
  } catch (error) {
    console.error(error);
    return getLocalPost(_id);
  }
}
function insertLocalPost(title: string, content: string) {
  const _id = (posts.length + 1).toString();
  posts.push({
    _id,
    title,
    content,
  });
  return _id;
}

async function insertPost(title: string, content: string) {
  try {
    const insertData = await (
      await getCollection(COLLECTION_NAME)
    ).insertOne({
      title: title,
      content: content,
    });
    return insertData;
  } catch (error) {
    console.error(error);
    insertLocalPost(title, content);
  }
}

