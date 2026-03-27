/*
  Warnings:

  - You are about to drop the column `phone` on the `lead` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "call" ADD COLUMN     "intent" TEXT;

-- AlterTable
ALTER TABLE "lead" DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
