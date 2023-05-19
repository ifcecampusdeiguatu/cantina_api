-- CreateTable
CREATE TABLE "Checkin" (
    "id" TEXT NOT NULL,
    "intencao" TEXT,
    "confirmar_intencao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "matricula" TEXT NOT NULL,
    "name" VARCHAR(255),
    "turma" VARCHAR(255) NOT NULL,
    "curso" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Refeicao" (
    "id" TEXT NOT NULL,
    "hora" TIME NOT NULL,
    "local" VARCHAR(255),
    "data" DATE NOT NULL,
    "tipo" VARCHAR(255),

    CONSTRAINT "Refeicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlunosCheckin" (
    "matricula" TEXT NOT NULL,
    "checkinId" TEXT NOT NULL,

    CONSTRAINT "AlunosCheckin_pkey" PRIMARY KEY ("matricula","checkinId")
);

-- CreateTable
CREATE TABLE "RefeicoesCheckin" (
    "refeicaoId" TEXT NOT NULL,
    "checkinId" TEXT NOT NULL,

    CONSTRAINT "RefeicoesCheckin_pkey" PRIMARY KEY ("refeicaoId","checkinId")
);

-- CreateTable
CREATE TABLE "AlunosRefeicoes" (
    "matricula" TEXT NOT NULL,
    "refeicaoId" TEXT NOT NULL,
    "checkinId" TEXT,

    CONSTRAINT "AlunosRefeicoes_pkey" PRIMARY KEY ("matricula","refeicaoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_confirmar_intencao_key" ON "Checkin"("confirmar_intencao");

-- AddForeignKey
ALTER TABLE "AlunosCheckin" ADD CONSTRAINT "AlunosCheckin_matricula_fkey" FOREIGN KEY ("matricula") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosCheckin" ADD CONSTRAINT "AlunosCheckin_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefeicoesCheckin" ADD CONSTRAINT "RefeicoesCheckin_refeicaoId_fkey" FOREIGN KEY ("refeicaoId") REFERENCES "Refeicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefeicoesCheckin" ADD CONSTRAINT "RefeicoesCheckin_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosRefeicoes" ADD CONSTRAINT "AlunosRefeicoes_matricula_fkey" FOREIGN KEY ("matricula") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosRefeicoes" ADD CONSTRAINT "AlunosRefeicoes_refeicaoId_fkey" FOREIGN KEY ("refeicaoId") REFERENCES "Refeicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosRefeicoes" ADD CONSTRAINT "AlunosRefeicoes_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
