import express, { Express, NextFunction, Request, Response } from "express";
import { Todo, db, isTodo } from "./db";

import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

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
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/v2/todos",
  upload.fields([{ name: "icon" }, { name: "todo" }]),
  (req: Request, res: Response) => {
    let icon: string = "";

    if (Array.isArray(req.files)) {
      // console.log("array ; ", req.files);
    } else if (req.files === undefined) {
      // console.log("undefined");
    } else {
      // console.log("map, ", req.files["icon"]);
      icon = req.files["icon"][0].path;
    }

    const id = db.get("todos").length + 1;
    const reqData: any = JSON.parse(req.body.todo);
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

    const injectData = {
      ...{ id, groupId: id, startDt, endDt, icon },
      ...reqData,
    } as Todo;
    if (isTodo(injectData)) {
      console.log("todo 맞음");
      db.get("todos").push(injectData);
      
      //!DB Todo push
      
    } else {
      console.log("todo 아님");
      // console.log('inject Todo : ', custom);
      console.log("origin todo : ", req.body.todo);
    }

    res.redirect(201, "/v2/todos");
  }
);

router.get("/v2/todos", (req: Request, res: Response) => {
  res.json(db.get("todos"));
});
router.get("/v2/todos/:id", (req: Request, res: Response) => {
  let bCheck = false;
  db.get("todos").forEach((todo: Todo, idx: number) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      res.json(todo);
      bCheck = true;
      return;
    }
  });
  if (bCheck) {
  } else {
    res.status(404).send("undefined id");
    // throw Error('Undefined Data');
  }
});
router.post("/v2/todos", (req: Request, res: Response) => {
  let id = db.get("todos").length + 1;
  let custom = { ...{ id, groupId: id }, ...req.body };
  if (isTodo(custom)) {
    db.get("todos").push(custom);
  } else {
    console.log("todo 아님");
  }

  res.redirect(201, "/v2/todos");
});
router.delete("/v2/todos/:id", (req: Request, res: Response) => {
  db.set(
    "todos",
    new Array<Todo>(
      ...db.get("todos").filter((todo: Todo) => {
        return todo.id !== Number.parseInt(req.params.id);
      })
    )
  );
  console.log(db.get("todos"));
  console.log("delete ok");
  res.redirect(200, "/v2/todos");
});
router.put("/v2/todos/:id", (req: Request, res: Response) => {
  db.set(
    "todos",
    new Array<Todo>(
      ...db.get("todos").filter((todo: Todo) => {
        if (todo.id === Number.parseInt(req.params.id)) {
          todo.title = req.body.title;
          todo.content = req.body.content;
          todo.startDt =
            req.body.startDt !== undefined ? req.body.startDt : todo.startDt;
          todo.endDt =
            req.body.endDt !== undefined ? req.body.endDt : todo.endDt;
          todo.icon = req.body.icon !== undefined ? req.body.icon : undefined;
          todo.tag = req.body.tag !== undefined ? req.body.tag : undefined;
          res.json(todo);
          return;
        }
      })
    )
  );
});

module.exports = router;
