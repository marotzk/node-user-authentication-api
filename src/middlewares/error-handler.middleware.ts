import { NextFunction, Request, Response } from "express";
import DatabaseError from "../models/errors/database.error.model";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
  if(err instanceof DatabaseError){
    res.sendStatus(400);
  }else{
    res.sendStatus(500);
  }
}

export default errorHandler;