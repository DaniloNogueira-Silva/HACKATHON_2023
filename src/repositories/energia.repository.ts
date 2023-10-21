import { PrismaClient, Energia } from "@prisma/client";

const prisma = new PrismaClient();

export class EnergiaRepository {
  async findAll(): Promise<Energia[]> {
    return prisma.energia.findMany();
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
