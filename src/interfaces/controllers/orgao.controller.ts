import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { OrgaoRepository } from "../../repositories/orgao.repository";
import { Orgao } from "@prisma/client";

import { apiErrorResponse } from "../../helpers/errors/index";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class OrgaoController {
  repository: OrgaoRepository;

  constructor(repository: OrgaoRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    try {
      const Orgao: Orgao[] = await this.repository.findAll();
      res.send(Orgao);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  create: RequestHandler = async (req, res) => {
    try {
      const OrgaoInterface: Orgao = req.body as Orgao;
      const Orgao: Orgao = await this.repository.create(OrgaoInterface);
      res.send(Orgao);
    } catch (error) {
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const OrgaoInterface: Orgao = req.body as Orgao;
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      
      const Orgao: Orgao | null = await this.repository.update(
        params.id,
        OrgaoInterface
      );

      if (!Orgao) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.send(Orgao);
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
