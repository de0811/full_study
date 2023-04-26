import express, { Express, NextFunction, Request, Response } from "express";

const Calender = require("../schemas/calender");

const router = express.Router();

router.post(
  "/v2/calenders",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await Calender.create(req.body);
      res.redirect(201, `/v2/calenders/${calender.id}`);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/v2/calenders",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calenders = await Calender.find();
      res.json(calenders);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/v2/calenders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await Calender.findOne({ _id: req.params.id });
      res.json(calender);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  "/v2/calenders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await Calender.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.json(calender);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.put(
  "/v2/calenders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await Calender.replaceOne(
        { _id: req.params.id },
        req.body
      );
      res.json(calender);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/v2/calenders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await Calender.deleteOne({ _id: req.params.id });
      res.json(calender);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);