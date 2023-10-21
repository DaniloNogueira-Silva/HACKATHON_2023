/*
  Warnings:

  - You are about to drop the column `tamanho_empresa` on the `Empresa` table. All the data in the column will be lost.
  - Changed the type of `nrm_funcionarios` on the `Empresa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "tamanho_empresa",
DROP COLUMN "nrm_funcionarios",
ADD COLUMN     "nrm_funcionarios" INTEGER NOT NULL;
