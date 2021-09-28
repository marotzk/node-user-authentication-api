import express, { Request, Response, NextFunction, urlencoded } from 'express';
import statusRouter from './routes/status.router';
import userRoutes from './routes/users.router';


const host = 'http://localhost';
const port = 3001;
const app = express();

/** Configuraçao da aplicação */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Configuraçao das rotas */
app.use(statusRouter, userRoutes);


/** Configuraçao do servidor */
app.listen(port, () => {
  console.log(`
    Running : ${host}:${port}
  `);
});