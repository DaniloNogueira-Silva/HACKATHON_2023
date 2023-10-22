import { PrismaClient } from "@prisma/client";
import { ResiduosController } from "../controllers/residuos.controller";
import { ResiduosRepository } from "../../repositories/residuos.repository";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { EmpresaRepository } from "../../repositories/empresa.repository";

const prisma = new PrismaClient();

const empresaRepository = new EmpresaRepository();
const residuosRepository = new ResiduosRepository(empresaRepository);
const residuosController = new ResiduosController(residuosRepository);

const residuosRouter = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  server.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    await residuosController.index(req, reply);
    done();
  });

  server.get("/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    await residuosController.findAllByEmpresa(req, reply);
    done();
  });

  server.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    await residuosController.create(req, reply);
    reply.status(201).send(`user created`);
    done();
  });

  server.put<{ Params: { id: string } }>("/:id", async (req, reply) => {
    await residuosController.update(req, reply);
    reply.status(200).send(`user updated`);
    done();
  });

  server.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    await residuosController.delete(req, reply);
    reply.status(200).send(`user deleted`);
    done();
  });

  done();
};

export default residuosRouter;
