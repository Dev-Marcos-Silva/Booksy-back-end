-- AlterEnum
ALTER TYPE "Accept" ADD VALUE 'undefine';

-- AlterEnum
ALTER TYPE "Complete" ADD VALUE 'undefine';

-- AlterTable
ALTER TABLE "rented_books" ALTER COLUMN "user_visibility" SET DEFAULT 'true',
ALTER COLUMN "is_complete" SET DEFAULT 'true',
ALTER COLUMN "is_accepted" SET DEFAULT 'true';
