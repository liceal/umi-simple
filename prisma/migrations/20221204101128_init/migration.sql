/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Post_authorId_idx` ON `Post`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `authorId`;
