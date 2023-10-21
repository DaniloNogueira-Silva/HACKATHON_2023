import { PrismaClient, Orgao } from "@prisma/client";

const prisma = new PrismaClient();

export class OrgaoRepository {
  async findAll(): Promise<Orgao[]> {
    return prisma.orgao.findMany();
  }

  async create(data: Orgao): Promise<Orgao> {
    const { ...OrgaoData } = data;

    const Orgao = await prisma.orgao.create({
      data: {
        ...OrgaoData,
      },
    });

    return Orgao;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.orgao.delete({
      where: { id },
    });
    return deleteResult !== null;
  }

  async update(id: string, data: Orgao): Promise<Orgao | null> {
    const Orgao = await prisma.orgao.update({
      where: { id },
      data,
    });
    if (!Orgao) {
      return null;
    }
    return Orgao;
  }
  
}
