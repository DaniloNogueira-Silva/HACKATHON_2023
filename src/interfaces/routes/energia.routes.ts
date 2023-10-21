import { PrismaClient } from '@prisma/client';
import { EnergiaController } from '../controllers/energia.controller';
import { EnergiaRepository } from '../../repositories/energia.repository';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

const energiaRepository = new EnergiaRepository();
const energiaController = new EnergiaController(energiaRepository);

const energiaRouter = (server: FastifyInstance, options: any, done: () => void) => {
  
    server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await energiaController.index(req, reply);
      done();
  });

  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await energiaController.create(req, reply);
      reply.status(201).send(`user created`)
      done();
  });

  server.post('/calculate', async (req: FastifyRequest, reply: FastifyReply) => {
    await energiaController.calcularEnergia(req, reply);
    reply.status(201).send(`calculo realizado`)
    done();
});

  server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await energiaController.update(req, reply);
      reply.status(200).send(`user updated`);
      done();
  });

  server.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await energiaController.delete(req, reply);
      reply.status(200).send(`user deleted`);
      done();
  });

  done();
};

export default energiaRouter;
