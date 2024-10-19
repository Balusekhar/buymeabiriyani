/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Supporter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Supporter" DROP CONSTRAINT "Supporter_creatorId_fkey";

-- AlterTable
ALTER TABLE "Supporter" DROP COLUMN "creatorId";
