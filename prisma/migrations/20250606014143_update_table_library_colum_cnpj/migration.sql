/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `libraries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "libraries_cnpj_key" ON "libraries"("cnpj");
