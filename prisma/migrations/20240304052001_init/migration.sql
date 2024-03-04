/*
  Warnings:

  - Added the required column `type` to the `Characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Types_name_key" ON "Types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Types_slug_key" ON "Types"("slug");
