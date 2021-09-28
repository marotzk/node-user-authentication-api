import { Router, Request, Response, NextFunction } from 'express';

const userRoutes = Router();

userRoutes.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{}];
  res.status(200).send({ users });
});

userRoutes.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  /** tratamento de caracteres não numericos e ponto flutuantes */
  const uuid = parseInt(req.params.uuid);

  if (isNaN(uuid)) {
    res.status(400).send({ uuid });
  } else {
    res.status(200).send('{user}');
  }
});

userRoutes.post('/users', (req: Request<{ body: string }>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    res.status(400).send('Bad Request');
  } else {
    res.sendStatus(201)
  }
});

userRoutes.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  /** tratamento de caracteres não numericos e ponto flutuantes */
  const uuid = parseInt(req.params.uuid);

  if (isNaN(uuid)) {
    res.status(400).send({ uuid });
  } else {
    res.sendStatus(200);
  }
});

userRoutes.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  /** tratamento de caracteres não numericos e ponto flutuantes */
  const uuid = parseInt(req.params.uuid);

  if (isNaN(uuid)) {
    res.status(400).send({ uuid });
  } else {
    res.sendStatus(200);
  }
});

export default userRoutes;