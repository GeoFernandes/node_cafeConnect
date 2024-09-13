import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import { connectWithRetry } from './src/config/database/database';
import UsuarioController from './src/controllers/usuario/UsuarioController'

dotenv.config();

const app = createExpressServer({
  controllers: [UsuarioController],
});

app.use(express.json())

const startServer = () => {
  app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
  });
};

connectWithRetry().then(() => {
  console.log('Conectado ao MongoDB');
  startServer();
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
  process.exit(1);
});

export default app;
