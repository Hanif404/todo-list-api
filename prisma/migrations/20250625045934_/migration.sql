/*
  Warnings:

  - You are about to drop the column `title` on the `Checklist` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ItemChecklist` table. All the data in the column will be lost.
  - Added the required column `name` to the `Checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ItemChecklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checklist` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ItemChecklist` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
