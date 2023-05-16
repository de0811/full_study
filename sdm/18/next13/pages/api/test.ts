import { getCollection } from "@/util/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import async from "../../app/page";
import { ObjectId } from "mongodb";

export default function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getPost(req.query.id as string).then((data) => {
        res.status(200).json(data);
      });
      break;
    case "POST":
      break;
    default:
      res.status(200).json({ text: "Hello" });
  }
}

async function getPost(_id: string) {
  if (_id === undefined) {
    const findData = await (await getCollection("post")).find().toArray();
    return findData;
  } else {
    const findData = await (
      await getCollection("post")
    ).findOne({ _id: new ObjectId(_id) });
    return findData;
  }
}
