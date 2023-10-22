-- DropIndex
DROP INDEX "User_cnpj_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cnpj" DROP NOT NULL;
