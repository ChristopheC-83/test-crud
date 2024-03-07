/*
  Warnings:

  - You are about to drop the column `const` on the `Characters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "const",
ADD COLUMN     "constit" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" DROP NOT NULL;
