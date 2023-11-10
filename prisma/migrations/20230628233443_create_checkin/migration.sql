/*
  Warnings:

  - You are about to drop the column `confirmar_intencao` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `intencao` on the `Checkin` table. All the data in the column will be lost.
  - The primary key for the `dishes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `AlunosCheckin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlunosRefeicoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefeicoesCheckin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Checkin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menu_id]` on the table `Checkin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menu_id` to the `Checkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Checkin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('reserved', 'done', 'canceled', 'lacked');

-- DropForeignKey
ALTER TABLE "AlunosCheckin" DROP CONSTRAINT "AlunosCheckin_checkinId_fkey";

-- DropForeignKey
ALTER TABLE "AlunosCheckin" DROP CONSTRAINT "AlunosCheckin_matricula_fkey";

-- DropForeignKey
ALTER TABLE "AlunosRefeicoes" DROP CONSTRAINT "AlunosRefeicoes_checkinId_fkey";

-- DropForeignKey
ALTER TABLE "AlunosRefeicoes" DROP CONSTRAINT "AlunosRefeicoes_matricula_fkey";

-- DropForeignKey
ALTER TABLE "AlunosRefeicoes" DROP CONSTRAINT "AlunosRefeicoes_refeicaoId_fkey";

-- DropForeignKey
ALTER TABLE "RefeicoesCheckin" DROP CONSTRAINT "RefeicoesCheckin_checkinId_fkey";

-- DropForeignKey
ALTER TABLE "RefeicoesCheckin" DROP CONSTRAINT "RefeicoesCheckin_refeicaoId_fkey";

-- DropForeignKey
ALTER TABLE "_DishToIngredient" DROP CONSTRAINT "_DishToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToIngredient" DROP CONSTRAINT "_DishToIngredient_B_fkey";

-- DropIndex
DROP INDEX "Checkin_confirmar_intencao_key";

-- AlterTable
ALTER TABLE "Checkin" DROP COLUMN "confirmar_intencao",
DROP COLUMN "intencao",
ADD COLUMN     "menu_id" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'reserved',
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_DishToIngredient" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "dishes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "locations" DROP CONSTRAINT "locations_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "menu" DROP CONSTRAINT "menu_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "AlunosCheckin";

-- DropTable
DROP TABLE "AlunosRefeicoes";

-- DropTable
DROP TABLE "RefeicoesCheckin";

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_user_id_key" ON "Checkin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_menu_id_key" ON "Checkin"("menu_id");

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToIngredient" ADD CONSTRAINT "_DishToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToIngredient" ADD CONSTRAINT "_DishToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
