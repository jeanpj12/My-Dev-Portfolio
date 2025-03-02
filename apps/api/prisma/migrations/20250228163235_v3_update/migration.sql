-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "StatusPost" NOT NULL DEFAULT 'draft';
