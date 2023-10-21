import { FastifyInstance } from 'fastify';
import userRouter from './user.routes'
import EmpresaRouter from './empresa.routes';
import energiaRouter from './energia.routes';
import aguaRouter from './agua.routes';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = fastify();
server.register(fastifyCors);

const routes = (server: FastifyInstance): void => {
  server.register(userRouter, { prefix: '/user' });
  server.register(EmpresaRouter, { prefix: '/empresa' });
  server.register(energiaRouter, { prefix: '/energia' });
  server.register(aguaRouter, { prefix: '/agua' });
};

export default routes