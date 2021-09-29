import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas.');
    }

    const [authType, token] = authorizationHeader.split(' ');
    if (authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido.');
    }

    const tokenPayload = JWT.verify(token, '');

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token Invalido!');
    }

    const uuid = tokenPayload.sub;

    const user = { uuid: tokenPayload.sub, email: tokenPayload.email };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default bearerAuthenticationMiddleware;