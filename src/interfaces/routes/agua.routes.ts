import { PrismaClient } from '@prisma/client';
import { AguaController } from '../controllers/agua.controller';
import { AguaRepository } from '../../repositories/agua.repository';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { EmpresaRepository } from '../../repositories/empresa.repository';

const prisma = new PrismaClient();

const empresaRepository = new EmpresaRepository();
const aguaRepository = new AguaRepository(empresaRepository);
const aguaController = new AguaController(aguaRepository);

const aguaRouter = (server: FastifyInstance, options: any, done: () => void) => {

    server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        await aguaController.index(req, reply);
        done();
    });

    server.get<{ Params: { id: string } }>('/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        await aguaController.getAllAguaById(req, reply);
        done();
    });

    server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
        await aguaController.create(req, reply);
        reply.status(201).send(`user created`)
        done();
    });

    server.post('/calcularAgua', async (req: FastifyRequest, reply: FastifyReply) => {
        await aguaController.calcularAgua(req, reply);
        reply.status(201).send(`user created`)
        done();
    });

    server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
        await aguaController.update(req, reply);
        reply.status(200).send(`user updated`);
        done();
    });

    server.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        await aguaController.delete(req, reply);
        reply.status(200).send(`user deleted`);
        done();
    });

    done();
};

export default aguaRouter;
