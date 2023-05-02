import express, { Express, NextFunction, Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
const DB = require("../schemas").DB;
// const Todo = require("../schemas/todo");

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일이 저장될 디렉토리 경로 설정
    cb(null, path.join(__dirname, "../..", "./uploads/"));
  },
  filename: function (req, file, cb) {
    // 파일 이름 설정
    const uniqueSuffix = uuidv4();
    const fileExt = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExt}`);
  },
});
const upload = multer({ 
  storage: storage, 
  // limits: { fileSize: 5 * 1024 * 1024 } , //5MB
});

const router = express.Router();

router.post(
  "/v2/todos",
  upload.fields([{ name: "icon" }, { name: "todo" }]),
  (req: Request, res: Response, next:NextFunction) => {
    try {
      let icon: string = "";

      if (Array.isArray(req.files)) {
        // console.log("array ; ", req.files);
      } else if (req.files === undefined) {
        // console.log("undefined");
      } else {
        // console.log("map, ", req.files["icon"]);
        icon = req.files["icon"][0].path;
      }

      const reqData: any = JSON.parse(req.body.todo);
      //넘어온 데이터가 정상인지 확인
      if (reqData.title === undefined) {throw new Error("title is undefined");}
      if (reqData.content === undefined) {throw new Error("content is undefined");}
      if (reqData.calenderId === undefined) {throw new Error("calenderId is undefined");}

      const startDt = new Date();
      startDt.setHours(0);
      startDt.setMinutes(0);
      startDt.setSeconds(0);
      startDt.setMilliseconds(0);
      const endDt = new Date();
      endDt.setHours(23);
      endDt.setMinutes(59);
      endDt.setSeconds(59);
      endDt.setMilliseconds(999);

      const todo = DB.Todo.create({
        ...{ startDt, endDt, icon },
        ...reqData,
      });

      res.redirect(201, `/v2/todos/${todo.id}`);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/v2/todos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await DB.Todo.find().exec();
      res.json(todo);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);

      next(error);
    }
  }
);
router.get("/v2/todos/:id", async (req: Request, res: Response) => {
  try {
    console.log("params : ", req.params);
    const todo = await DB.Todo.findOne({ _id: req.params.id }).exec();
    console.log("todo : ", todo);
    res.json(todo);
  } catch (e) {
    console.error(e);
    res.status(404).send("undefined id");
  }
});

router.delete("/v2/todos/:id", (req: Request, res: Response) => {
  DB.Todo.deleteOne({ _id: req.params.id });
  console.log("delete ok");
  res.redirect(200, "/v2/todos");
});
router.put(
  "/v2/todos/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedTodo = await DB.Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json(updatedTodo);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);
router.patch(
  "/v2/todos/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await DB.Todo.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.json(result);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
