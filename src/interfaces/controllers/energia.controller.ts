import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { EnergiaRepository } from "../../repositories/energia.repository";
import { Energia } from "@prisma/client";

import { apiErrorResponse } from "../../helpers/errors/index";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class EnergiaController {
  repository: EnergiaRepository;

  constructor(repository: EnergiaRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    try {
      const energia: Energia[] = await this.repository.findAll();
      res.send(energia);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };
  
  calcularEnergia: RequestHandler = async (req, res) => {
    try {
      const calculateInterface = req.body;
      const calculate = await this.repository.calculateDemo(calculateInterface)
      res.send(calculate);
    } catch (error) {
      console.log(error)
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  create: RequestHandler = async (req, res) => {
    try {
      const energiaInterface: Energia = req.body as Energia;
      const energia: Energia = await this.repository.create(energiaInterface);
      res.send(energia);
    } catch (error) {
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const energiaInterface: Energia = req.body as Energia;
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      const energia: Energia | null = await this.repository.update(
        params.id,
        energiaInterface
      );

      if (!energia) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.send(energia);
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
