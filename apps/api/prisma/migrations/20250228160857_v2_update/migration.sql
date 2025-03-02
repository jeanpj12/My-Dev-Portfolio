-- CreateEnum
CREATE TYPE "Role" AS ENUM ('subscriber', 'author');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'subscriber';
