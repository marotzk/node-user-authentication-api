import express, { Request, Response, NextFunction } from 'express';
const app = express();
const host = 'http://localhost';
const port = 3001;

app.get('/status',(req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({foo: 'barFoo'});
});

app.listen(port, () => {
  console.log(`
    Running : ${host}:${port}
  `);
})