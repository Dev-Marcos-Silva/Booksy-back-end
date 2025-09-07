/*
  Warnings:

  - You are about to drop the column `delivery_data` on the `rented_books` table. All the data in the column will be lost.
  - You are about to drop the column `order_data` on the `rented_books` table. All the data in the column will be lost.
  - You are about to drop the column `return_data` on the `rented_books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rented_books" DROP COLUMN "delivery_data",
DROP COLUMN "order_data",
DROP COLUMN "return_data",
ADD COLUMN     "delivery_date" TIMESTAMP(3),
ADD COLUMN     "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "return_date" TIMESTAMP(3);
