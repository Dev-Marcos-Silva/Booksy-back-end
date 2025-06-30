/*
  Warnings:

  - The `type` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'LIBRARY');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "type",
ADD COLUMN     "type" "Role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "TypeAccount";
