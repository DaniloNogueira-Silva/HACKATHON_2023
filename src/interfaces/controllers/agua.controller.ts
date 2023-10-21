import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { AguaRepository } from "../../repositories/agua.repository";
import { Agua } from "@prisma/client";

import { apiErrorResponse } from "../../helpers/errors/index";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class AguaController {
  repository: AguaRepository;

  constructor(repository: AguaRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    try {
      const agua: Agua[] = await this.repository.findAll();
      res.send(agua);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  create: RequestHandler = async (req, res) => {
    try {
      const aguaInterface: Agua = req.body as Agua;
      const agua: Agua = await this.repository.create(aguaInterface);
      res.send(agua);
    } catch (error) {
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const aguaInterface: Agua = req.body as Agua;
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      
      const agua: Agua | null = await this.repository.update(
        params.id,
        aguaInterface
      );

      if (!agua) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.send(agua);
    } catch (error) {
      const response = apiErrorResponse("INTERNAL_ERROR");
      res.status(response.code).send(response);
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      
      const deleted: boolean = await this.repository.delete(params.id);

      if (!deleted) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.code(204).send();
    } catch (error) {
        const response = apiErrorResponse("INTERNAL_ERROR");
        res.status(response.code).send(response);
    }
  };

}
