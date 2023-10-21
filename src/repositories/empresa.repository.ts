import { PrismaClient, Empresa } from "@prisma/client";

const prisma = new PrismaClient();

export class EmpresaRepostirory {
  async findAll(): Promise<Empresa[]> {
    return prisma.empresa.findMany();
  }

  async findById(id: string): Promise<Empresa> {
    return prisma.empresa.findUnique({
      where: { id },
    });
  }

  async create(data: Empresa): Promise<Empresa> {
    const { userId, ...empresaData } = data;

    const existingEmpresa = await prisma.empresa.findUnique({
      where: { id: userId },
    });

    if (existingEmpresa) {
      throw new Error("Uma empresa com esse cnpj já existe");
    }

    const empresa = await prisma.empresa.create({
        data: {
            userId,
            ...empresaData
        }
    })

    return empresa
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.empresa.delete({
      where: { id },
    });
    return deleteResult !== null;
  }

  async update(id: string, data: Empresa): Promise<Empresa | null> {
    const user = await prisma.empresa.update({
      where: { id },
      data,
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
