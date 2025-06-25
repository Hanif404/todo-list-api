/*
  Warnings:

  - You are about to drop the `ChecklistItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChecklistTodo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ChecklistItem` DROP FOREIGN KEY `ChecklistItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `ChecklistTodo` DROP FOREIGN KEY `ChecklistTodo_todoId_fkey`;

-- AlterTable
ALTER TABLE `Checklist` ADD COLUMN `todoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ItemChecklist` ADD COLUMN `checklistId` INTEGER NULL;

-- DropTable
DROP TABLE `ChecklistItem`;

-- DropTable
DROP TABLE `ChecklistTodo`;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemChecklist` ADD CONSTRAINT `ItemChecklist_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
