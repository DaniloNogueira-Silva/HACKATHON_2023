import { PrismaClient, Agua } from "@prisma/client";
import { EmpresaRepository } from "./empresa.repository";

const prisma = new PrismaClient();

export class AguaRepository {
  repository: EmpresaRepository

  constructor(repository: EmpresaRepository) {
    this.repository = repository
  }

  async findAll(): Promise<Agua[]> {
    return prisma.agua.findMany();
  }

  async litrosByFuncionario(data) {
    let maximo: number;

    const empresa = await this.repository.findById(data.empresaId)

    if (empresa.nrm_funcionarios < 10) {
      maximo = 10000;
    } else if (empresa.nrm_funcionarios > 9 && empresa.nrm_funcionarios < 50) {
      maximo = 50000;
    } else if (empresa.nrm_funcionarios > 49 && empresa.nrm_funcionarios < 100) {
      maximo = 100000;
    } else {
      maximo = 200000;
    }
    return maximo
  }

  async calculateDemo(data: any) {
    let nivel: string;

    const litrosByFunc = await this.litrosByFuncionario(data);

    if (data.litros_mes < litrosByFunc) {
      nivel = "abaixo";
    } else if (data.litros_mes == litrosByFunc) {
      nivel = "na média";
    } else if (data.litros_mes > litrosByFunc) {
      nivel = "mais alto";
    }

    return {
      nivel,
      litros_mes: data.litros_mes
    }
    // return `Sua empresa gastou ${data.litros_mes}
    //    Watts nesse mês. Seu consumo esta ${nivel} que as outras empresas do mesmo tamanho.`;

  }

  async calculate(data: any) {
    let nivel: string;
    
    const litrosByFunc = await this.litrosByFuncionario(data);
    
    if (data.litros_mes < litrosByFunc) {
      nivel = "abaixo";
    } else if (data.litros_mes == litrosByFunc) {
      nivel = "na média";
    } else if (data.litros_mes > litrosByFunc) {
      nivel = "mais alto";
    }

    return `Sua empresa gastou ${data.litros_mes}
       Watts nesse mês. Seu consumo esta ${nivel} que as outras empresas do mesmo tamanho.`;

  }

  async create(data: any): Promise<Agua> {
    const litroMes = data.litros_mes
    const litroDia = litroMes / 30
    const nivel = await this.calculateDemo(data)



    const agua = await prisma.agua.create({
      data: {
        litros_mes: litroMes,
        litros_dia: Number(litroDia.toFixed(2)),
        nivel: nivel.nivel,
        empresaId: data.empresaId
      },
    });
    return agua;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.agua.delete({
      where: { id },
    });
    return deleteResult !== null;
  }

  async update(id: string, data: Agua): Promise<Agua | null> {
    const agua = await prisma.agua.update({
      where: { id },
      data,
    });
    if (!agua) {
      return null;
    }
    return agua;
  }

  async getAllAguaById(id: string): Promise<Agua[]> {
    const agua = await prisma.agua.findMany({
      where: {
        empresaId: id
      }
    })
    
    return agua;
  }
}
