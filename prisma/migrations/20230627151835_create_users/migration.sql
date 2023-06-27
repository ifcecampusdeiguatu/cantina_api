/*
  Warnings:

  - You are about to drop the column `name` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('aluno', 'servidor', 'funcionario');

-- DropForeignKey
ALTER TABLE "AlunosCheckin" DROP CONSTRAINT "AlunosCheckin_matricula_fkey";

-- DropForeignKey
ALTER TABLE "AlunosRefeicoes" DROP CONSTRAINT "AlunosRefeicoes_matricula_fkey";

-- AlterTable
ALTER TABLE "AlunosCheckin" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "AlunosRefeicoes" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "foods" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "name",
ADD COLUMN     "address" VARCHAR(100) NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Aluno";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'aluno',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alunos" (
    "matricula" TEXT NOT NULL,
    "name" VARCHAR(255),
    "turma" VARCHAR(255) NOT NULL,
    "curso" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("matricula")
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_matricula_key" ON "alunos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "alunos_userId_key" ON "alunos"("userId");

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosCheckin" ADD CONSTRAINT "AlunosCheckin_matricula_fkey" FOREIGN KEY ("matricula") REFERENCES "alunos"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosRefeicoes" ADD CONSTRAINT "AlunosRefeicoes_matricula_fkey" FOREIGN KEY ("matricula") REFERENCES "alunos"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;
