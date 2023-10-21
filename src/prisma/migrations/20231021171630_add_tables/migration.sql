/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expiresIn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Localization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orgao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_localizacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_tipoId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Types" DROP CONSTRAINT "Types_orgaoId_fkey";

-- DropIndex
DROP INDEX "User_cpf_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
DROP COLUMN "email",
DROP COLUMN "expiresIn",
DROP COLUMN "telefone",
DROP COLUMN "token",
DROP COLUMN "used",
ADD COLUMN     "cnpj" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Localization";

-- DropTable
DROP TABLE "Orgao";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Types";

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nrm_funcionarios" TEXT NOT NULL,
    "tamanho_empresa" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "imovel" TEXT NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Energia" (
    "id" TEXT NOT NULL,
    "watts_mes" DOUBLE PRECISION NOT NULL,
    "watts_dia" DOUBLE PRECISION NOT NULL,
    "nivel" TEXT NOT NULL,
    "fonte_de_energia" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Energia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agua" (
    "id" TEXT NOT NULL,
    "litros_mes" DOUBLE PRECISION NOT NULL,
    "litros_dia" DOUBLE PRECISION NOT NULL,
    "nivel" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Agua_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residuos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Residuos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Energia" ADD CONSTRAINT "Energia_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agua" ADD CONSTRAINT "Agua_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residuos" ADD CONSTRAINT "Residuos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
