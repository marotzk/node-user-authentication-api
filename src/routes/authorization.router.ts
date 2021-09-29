import { Router, Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";
require('dotenv').config();

const authorizationRouter = Router();

authorizationRouter.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('Usuário não informado.');
    }

    const jwtPayload = { email: user.email };
    const jwtOptions = { subject: user?.uuid }
    const secretKey =  ''//process.env.JWT_SECRET_KEY;
    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

    res.status(200).json({ token: jwt });

  } catch (err) {
    next(err);
  }
})

export default authorizationRouter;