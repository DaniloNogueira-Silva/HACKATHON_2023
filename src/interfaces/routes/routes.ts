import { FastifyInstance } from 'fastify';
import userRouter from './user.routes'
import orgaoRouter from './orgao.routes';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = fastify();
server.register(fastifyCors);

const routes = (server: FastifyInstance): void => {
  server.register(userRouter, { prefix: '/user' });
  server.register(orgaoRouter, { prefix: '/orgao' });
};

export default routes