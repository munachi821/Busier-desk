/*
  Warnings:

  - You are about to drop the column `userId` on the `lead` table. All the data in the column will be lost.
  - Added the required column `businessId` to the `lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lead" DROP CONSTRAINT "lead_userId_fkey";

-- AlterTable
ALTER TABLE "business_assistant" ADD COLUMN     "firstMessage" TEXT;

-- AlterTable
ALTER TABLE "call" ADD COLUMN     "customerNumber" TEXT;

-- AlterTable
ALTER TABLE "lead" DROP COLUMN "userId",
ADD COLUMN     "businessId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
