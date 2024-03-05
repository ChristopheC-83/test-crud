/*
  Warnings:

  - You are about to drop the column `type` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the `Types` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "type",
ADD COLUMN     "typeSlug" TEXT NOT NULL DEFAULT 'chevalier';

-- DropTable
DROP TABLE "Types";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_slug_key" ON "Type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Type_type_key" ON "Type"("type");

-- CreateIndex
CREATE INDEX "Characters_typeSlug_idx" ON "Characters"("typeSlug");
