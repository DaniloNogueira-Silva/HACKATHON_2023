import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { ResiduosRepository } from "../../repositories/residuos.repository";
import { Residuos } from "@prisma/client";

import { apiErrorResponse } from "../../helpers/errors/index";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class ResiduosController {
  repository: ResiduosRepository;

  constructor(repository: ResiduosRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    try {
      const residuos: Residuos[] = await this.repository.findAll();
      res.send(residuos);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  findAllByEmpresa: RequestHandler = async (req, res) => {
    try {
      const params = req.params as { id: string };
      const residuos: Residuos[] = await this.repository.findAllByCompanie(params.id);
      res.send(residuos);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  create: RequestHandler = async (req, res) => {
    try {
      const residuosInterface = req.body
      console.log(residuosInterface)
      const residuos: Residuos = await this.repository.create(residuosInterface);
      console.log(residuos)
      res.send(residuos);
    } catch (error) {
      console.log(error)
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const residuosInterface: Residuos = req.body as Residuos;
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      const residuos: Residuos | null = await this.repository.update(
        params.id,
        residuosInterface
      );

      if (!residuos) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.send(residuos);
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
