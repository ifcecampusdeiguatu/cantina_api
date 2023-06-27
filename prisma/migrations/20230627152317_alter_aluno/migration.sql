/*
  Warnings:

  - You are about to drop the column `userId` on the `alunos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `alunos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `alunos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_userId_fkey";

-- DropIndex
DROP INDEX "alunos_matricula_key";

-- DropIndex
DROP INDEX "alunos_userId_key";

-- AlterTable
ALTER TABLE "alunos" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "alunos_user_id_key" ON "alunos"("user_id");

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
