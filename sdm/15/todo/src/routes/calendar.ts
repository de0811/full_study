import express, { Express, NextFunction, Request, Response } from "express";
const DB = require("../schemas").DB;

// const Calender = require("../schemas/calender");

const router = express.Router();

router.post(
  "/v2/calenders",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calender = await DB.Calender.create(req.body);
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
      const calenders = await DB.Calender.find();
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
      const calender = await DB.Calender.findOne({ _id: req.params.id });
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
      const calender = await DB.Calender.updateOne(
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
      const calender = await DB.Calender.replaceOne(
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
      const calender = await DB.Calender.deleteOne({ _id: req.params.id });
      res.json(calender);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;