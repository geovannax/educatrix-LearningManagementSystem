/*
  Warnings:

  - You are about to drop the `ActivityType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `typeId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ActivityType_type_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActivityType";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    CONSTRAINT "Activity_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("createdAt", "description", "id", "professorId", "title", "updatedAt") SELECT "createdAt", "description", "id", "professorId", "title", "updatedAt" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
