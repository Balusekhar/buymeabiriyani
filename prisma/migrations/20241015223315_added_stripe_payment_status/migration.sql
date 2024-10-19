/*
  Warnings:

  - A unique constraint covering the columns `[stripeSessionId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentStatus` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripeSessionId_key" ON "Donation"("stripeSessionId");
