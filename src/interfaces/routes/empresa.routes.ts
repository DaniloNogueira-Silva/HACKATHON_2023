import { PrismaClient } from '@prisma/client';
import { EmpresaRepository } from '../../repositories/empresa.repository';
import { EmpresaController } from '../controllers/empresa.controller';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

const empresaRepository = new EmpresaRepository();
const empresaController = new EmpresaController(empresaRepository);

const EmpresaRouter = (server: FastifyInstance, options: any, done: () => void) => {
  
    server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await empresaController.index(req, reply);
      done();
  });

  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
      await empresaController.create(req, reply);
      reply.status(201).send(`Empresa created`)
      done();
  });

  server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await empresaController.update(req, reply);
      reply.status(200).send(`Empresa updated`);
      done();
  });

  server.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
      await empresaController.delete(req, reply);
      reply.status(200).send(`Empresa deleted`);
      done();
  });

  server.get('/:id', async (req: FastifyRequest, reply: FastifyReply) => {
      await empresaController.findById(req, reply);
      reply.status(201).send(`Empresa encontrada`)
      done();
  });
  done();
};

export default EmpresaRouter;
