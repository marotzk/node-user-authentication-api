import { Router, Request, Response, NextFunction } from "express";

const statusRouter = Router()

statusRouter.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200)
});

export default statusRouter;