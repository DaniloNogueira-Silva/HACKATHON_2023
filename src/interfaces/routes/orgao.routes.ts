import { PrismaClient } from '@prisma/client';
import { OrgaoController } from '../controllers/orgao.controller';
import { OrgaoRepository } from '../../repositories/orgao.repository';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

const orgaoRepository = new OrgaoRepository();
const orgaoController = new OrgaoController(orgaoRepository);

const orgaoRouter = (server: FastifyInstance, options: any, done: () => void) => {
  
    server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await orgaoController.index(req, reply);
      done();
  });

  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await orgaoController.create(req, reply);
      reply.status(201).send(`user created`)
      done();
  });

  server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await orgaoController.update(req, reply);
      reply.status(200).send(`user updated`);
      done();
  });

  server.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await orgaoController.delete(req, reply);
      reply.status(200).send(`user deleted`);
      done();
  });

  done();
};

export default orgaoRouter;
