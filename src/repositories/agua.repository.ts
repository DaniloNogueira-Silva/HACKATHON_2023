import { PrismaClient, Agua } from "@prisma/client";

const prisma = new PrismaClient();

export class AguaRepository {
  async findAll(): Promise<Agua[]> {
    return prisma.agua.findMany();
  }

  async create(data: Agua): Promise<Agua> {
    const { ...AguaData } = data;

    const agua = await prisma.agua.create({
      data: {
        ...AguaData,
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
  
}
