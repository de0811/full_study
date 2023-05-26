import { getCollection } from "@/util/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { posts } from ".";

const COLLECTION_NAME = "post";

export default function post(req: NextApiRequest, res: NextApiResponse) {
  //http://localhost:3000/api/post/1 여기서 1만 따로 빼서 const _id 에 넣어줄 예정
  let _id: string | undefined = undefined;
  
  //referrer 확인
  console.log("req.headers.referer : ", req.headers.referer);
  
  {
    let postIdx = req.url?.indexOf("/post/");
    _id = req.url?.substring(postIdx! + 6);
  }
  console.log("!!!!!!!!!!!!!!!!!_id : ", _id);
  if (_id === undefined) {
    res.status(404).json({ text: "Not Found" });
    return;
  }
  switch (req.method) {
    case "GET":
      getPost(_id).then((data) => {
      console.log("DB Result data : ", data);
        res.status(200).json(data);
      });
      break;
    case "PATCH":
      console.log(req.body);
      patchPost(_id, req.body.title, req.body.content).then((data) => {
        res.status(302).redirect("/post/" + _id);
      });
      break;
    case "PUT":
      console.log(req.body);
      updatePost(_id, req.body.title, req.body.content).then((data) => {
        res.status(302).redirect("/post/" + _id);
      });
      break;
    case "DELETE":
      console.log(req.body);
      deletePost(_id, req.body.title, req.body.content).then((data) => {
        res.status(302).redirect("/post");
      });
      break;
    default:
      res.status(404).json({ text: "Not Found" });
  }
}

function getLocalPost(_id: string) {
  const post = posts.find((post) => post._id === _id);
  if (post === undefined) return [];
  else return [post];
}

async function getPost(_id: string) {
  try {
    const findData = await (
      await getCollection(COLLECTION_NAME)
    ).findOne({ _id: new ObjectId(_id) });
    console.log("findData : ", findData);
    return findData;
  } catch (error) {
    console.error(error);
    return getLocalPost(_id);
  }
}

function patchLocalPost(_id: string, title: string, content: string) {
  const post = posts.find((post) => post._id === _id);
  if (post === undefined) return false;
  else {
    post.title = title ? title : post.title;
    post.content = content ? content : post.content;
    return true;
  }
}

async function patchPost(_id: string, title: string, content: string) {
  try {
    const updateData = await (
      await getCollection(COLLECTION_NAME)
    ).updateOne(
      { _id: new ObjectId(_id) },
      { inc: { title: title, content: content } }
    );
    console.log("updateData : ", updateData);
    return updateData;
  } catch (error) {
    console.error(error);
    return patchLocalPost(_id, title, content);
  }
}

function updateLocalPost(_id: string, title: string, content: string) {
  const post = posts.find((post) => post._id === _id);
  if (post === undefined) return false;
  else {
    post.title = title ? title : post.title;
    post.content = content ? content : post.content;
    return true;
  }
}

async function updatePost(_id: string, title: string, content: string) {
  try {
    const updateData = await (
      await getCollection(COLLECTION_NAME)
    ).updateOne(
      { _id: new ObjectId(_id) },
      { $set: { title: title, content: content } }
    );
    console.log("updateData : ", updateData);
    return updateData;
  } catch (error) {
    console.error(error);
    return updateLocalPost(_id, title, content);
  }
}

function deleteLocalPost(_id: string) {
  const index = posts.findIndex((post) => post._id === _id);
  if (index === -1) return false;
  else {
    posts.splice(index, 1);
    return true;
  }
}

async function deletePost(_id: string, title: string, content: string) {
  try {
    const deleteData = await (
      await getCollection(COLLECTION_NAME)
    ).deleteOne({ _id: new ObjectId(_id) });
    console.log("deleteData : ", deleteData);
    return deleteData;
  } catch (error) {
    console.error(error);
    return deleteLocalPost(_id);
  }
}
