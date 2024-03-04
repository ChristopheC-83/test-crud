/*
  Warnings:

  - Made the column `profile` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Characters" ALTER COLUMN "avatar" SET DEFAULT 'https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/elfe.jpg',
ALTER COLUMN "type" SET DEFAULT 'chevalier';

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "profile" SET NOT NULL;
