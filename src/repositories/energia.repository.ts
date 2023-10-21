import { PrismaClient, Energia } from "@prisma/client";

const prisma = new PrismaClient();

export class EnergiaRepository {
  async findAll(): Promise<Energia[]> {
    return prisma.energia.findMany();
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

  async wattsByFuncionario(data) {
    let maximo;
    if (data.funcionarios < 10) {
      maximo = 300;
    } else if (data.funcionarios > 9 && data.funcionarios < 50) {
      maximo = 600;
    } else if (data.funcionarios > 49 && data.funcionarios < 100) {
      maximo = 900;
    } else {
      maximo = 1200;
    }

    return maximo
  }

  async calculateDemo(data: any) {
    let nivel: string;

    const getTaxa = await this.getTaxa(data);

    const wattsByFunc = await this.wattsByFuncionario(data);

    let conversion
    if (getTaxa.estadoEscolhido) {
      conversion = data.valor / getTaxa.taxa;

      if (conversion < wattsByFunc) {
        nivel = "abaixo";
      } else if (conversion == wattsByFunc) {
        nivel = "na média";
      } else if (conversion > wattsByFunc){
        nivel = "mais alto";
      }

      return `Sua empresa gastou ${conversion.toFixed(2)}
       Watts nesse mês. Seu consumo esta ${nivel} que as outras empresas do mesmo tamanho.`;
    }
  }

  async create(data: Energia): Promise<Energia> {
    const { ...energiaData } = data;

    const energia = await prisma.energia.create({
      data: {
        ...energiaData,
      },
    });

    return energia;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.energia.delete({
      where: { id },
    });
    return deleteResult !== null;
  }

  async update(id: string, data: Energia): Promise<Energia | null> {
    const energia = await prisma.energia.update({
      where: { id },
      data,
    });
    if (!energia) {
      return null;
    }
    return energia;
  }
}
