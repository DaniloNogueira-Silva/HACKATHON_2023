import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { EmpresaRepository } from "../../repositories/empresa.repository";
import { Empresa } from "@prisma/client";
import { apiErrorResponse } from "../../helpers/errors/index";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class EmpresaController {
  repository: EmpresaRepository;

  constructor(repository: EmpresaRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    try {
      const empresas: Empresa[] = await this.repository.findAll();
      res.send(empresas);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  findById: RequestHandler = async (req, res) => {
    try {
      const params = req.params as { id: string };
      const empresa: Empresa = await this.repository.findById(params.id);
      res.send(empresa);
    } catch (error) {
      const response = apiErrorResponse("NOT_FOUND");
      res.status(response.code).send(response);
    }
  };

  create: RequestHandler = async (req, res) => {
    try {
      const empresaInterface: Empresa = req.body as Empresa;
      const empresa: Empresa = await this.repository.create(empresaInterface);
      res.send(empresa);
    } catch (error) {
      console.log(error);
      const response = apiErrorResponse("INVALID_INPUT");
      res.status(response.code).send(response);
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const empresaInterface: Empresa = req.body as Empresa;
      const params = req.params as { id: string };

      if (typeof params.id !== "string") {
        const response = apiErrorResponse("INVALID_INPUT");
        res.status(response.code).send(response);
        return;
      }

      const empresa: Empresa | null = await this.repository.update(
        params.id,
        empresaInterface
      );

      if (!empresa) {
        const response = apiErrorResponse("NOT_FOUND");
        res.status(response.code).send(response);
        return;
      }

      res.send(empresa);
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
