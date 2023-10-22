import { PrismaClient, Residuos } from "@prisma/client";
import { EmpresaRepository } from "./empresa.repository";

const prisma = new PrismaClient();

export class ResiduosRepository {
  repository: EmpresaRepository;

  constructor(repository: EmpresaRepository) {
    this.repository = repository;
  }

  async findAll(): Promise<Residuos[]> {
    return prisma.residuos.findMany();
  }

  async findAllByCompanie(empresaId: string): Promise<Residuos[]> {
    const findEnergies = await prisma.residuos.findMany({
      where: { empresaId: empresaId },
    });

    return findEnergies;
  }

  async findById(id: string): Promise<Residuos> {
    return prisma.residuos.findUnique({
      where: { id },
    });
  }

  async getTaxa(data) {
    let estadoEscolhido;
    let taxa;
    if (data.estado == "SP" || data.estado == "SP") {
      estadoEscolhido = data.estado;
      taxa = 0.656;
    } else if (data.estado == "MG" || data.estado == "mg") {
      estadoEscolhido = data.estado;
      taxa = 0.653;
    } else if (data.estado == "RJ" || data.estado == "rj") {
      estadoEscolhido = data.estado;
      taxa = 0.754;
    } else {
      estadoEscolhido = "média de cálculo";
      taxa = 0.6;
    }

    return { taxa, estadoEscolhido };
  }

  async quantidadeByFuncionario(data) {
    let maximo;
    if (data.funcionarios < 10) {
      maximo = 500;
    } else if (data.funcionarios > 9 && data.funcionarios < 50) {
      maximo = 1000;
    } else if (data.funcionarios > 49 && data.funcionarios < 100) {
      maximo = 1500;
    } else {
      maximo = 2000;
    }

    return maximo;
  }

  async calculateDemo(data: any) {
    let nivel: string;

    const qtdeByFuc = await this.quantidadeByFuncionario(data);

    if (data.quantidade < qtdeByFuc) {
      nivel = "abaixo";
    } else if (data.quantidade == qtdeByFuc) {
      nivel = "na média";
    } else if (data.quantidade > qtdeByFuc) {
      nivel = "mais alto";
    }

    return `Sua empresa gastou ${data.quantidade}
       Watts nesse mês. Seu consumo esta ${nivel} que as outras empresas do mesmo tamanho.`;
  }

  async getDados(data: any) {
    let nivel: string;

    const findDetails = await this.repository.findById(data.empresaId);

    const qtdeByFuc = await this.quantidadeByFuncionario({
      funcionarios: findDetails.nrm_funcionarios,
      ...data,
    });

    if (data.quantidade < qtdeByFuc) {
      nivel = "abaixo";
    } else if (data.quantidade == qtdeByFuc) {
      nivel = "na média";
    } else if (data.quantidade > qtdeByFuc) {
      nivel = "mais alto";
    }

    return {
      nome: "Copo Plástico",
      quantidade: data.quantidade,
      nivel: nivel,
    };
  }

  async create(data): Promise<any> {
    const getDados = await this.getDados(data);

    const residuo = await prisma.residuos.create({
      data: {
        nome: getDados.nome,
        quantidade: getDados.quantidade,
        nivel: getDados.nivel,
        empresaId: data.empresaId,
      },
    });

    return residuo;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.residuos.delete({
      where: { id },
    });
    return deleteResult !== null;
  }

  async update(id: string, data: Residuos): Promise<Residuos | null> {
    const residuo = await prisma.residuos.update({
      where: { id },
      data,
    });
    if (!residuo) {
      return null;
    }
    return residuo;
  }
}
