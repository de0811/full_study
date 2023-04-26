import express, { Express, NextFunction, Request, Response } from "express";
const User = require("../schemas/user");

const router = express.Router();

router.post(
  "/v2/users",
  async (req: Request, res: Response, nex: NextFunction) => {
    const user = await User.create(req.body);
    res.redirect(201, `/v2/users/${user.id}`);
  }
);

router.get(
  "/v2/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/v2/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json(user);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  "/v2/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.json(user);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.put(
  "/v2/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json(user);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/v2/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      res.json(user);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);
