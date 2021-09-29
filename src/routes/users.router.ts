import { Router, Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/user.repository';

const userRoutes = Router();

userRoutes.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const users = await userRepository.findAllUsers();
    res.status(200).send({ users });
  }catch(err){
    next(err);
  }
});

userRoutes.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  try {
    const user = await userRepository.findById(uuid);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

userRoutes.post('/users', async (req: Request<{ body: string }>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    res.status(400).send('Bad Request');
  } else {
    try {
      await userRepository.create(email, password);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
});

userRoutes.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const modify = req.body;
  modify.uuid = uuid;

  try {
    await userRepository.update(modify);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

userRoutes.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;

  try {
    await userRepository.destroy(uuid);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default userRoutes;