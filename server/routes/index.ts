import { Request, Response, Router } from "express";
import database from "../db";
import { TimeRange } from "../types/timeRange";

const routes = Router();

routes.get('/api/articles/:timeRange', (req: Request, res: Response) => {
  try {
    const timeRange = req.params.timeRange as TimeRange;
    const result = database.findByTimeRange(timeRange);

    if (!result) {
      res.status(404).send({});
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/api/articles/:timeRange/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const timeRange = req.params.timeRange as TimeRange;
    const result = database.findOneByTimeRange(id, timeRange);

    if (!result) {
      res.status(404).send({});
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default routes;