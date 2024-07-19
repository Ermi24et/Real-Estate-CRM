/*
  Warnings:

  - A unique constraint covering the columns `[assignedToId]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lead_assignedToId_key" ON "Lead"("assignedToId");
