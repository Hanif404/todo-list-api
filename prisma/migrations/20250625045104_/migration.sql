/*
  Warnings:

  - You are about to drop the column `todoId` on the `Checklist` table. All the data in the column will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Checklist` DROP FOREIGN KEY `Checklist_todoId_fkey`;

-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- DropIndex
DROP INDEX `Checklist_todoId_fkey` ON `Checklist`;

-- AlterTable
ALTER TABLE `Checklist` DROP COLUMN `todoId`,
    ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `Todo`;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
