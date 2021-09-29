import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas.');
    }

    const [authType, token] = authorizationHeader.split(' ');
    if (authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido.');
    }

    try {
      const tokenPayload = JWT.verify(token, ''); //process.env.JWT_SECRET_KEY

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token Invalido!');
      }

      const uuid = tokenPayload.sub;

      const user = { uuid: tokenPayload.sub, email: tokenPayload.email };
      req.user = user;
      next();

    } catch (err) {
      throw new ForbiddenError('Token Invalido!');
    }
  } catch (err) {
    next(err);
  }
}

export default jwtAuthenticationMiddleware;