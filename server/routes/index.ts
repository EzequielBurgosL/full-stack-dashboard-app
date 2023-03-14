import { Request, Response, Router } from "express";
import database from "../db";

const routes = Router();

// app.get('/api/articles', (req: Request, res: Response) => {
//   console.log('trafficData[0]: ', trafficData[0]);
//   try {
//     res.send(trafficData[0]);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

routes.get('/api/articles/:id/:timeRange', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const timeRange = req.params.timeRange;
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