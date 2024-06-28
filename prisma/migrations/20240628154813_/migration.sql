-- CreateEnum
CREATE TYPE "OwnerRole" AS ENUM ('NOAGENCY', 'AGENCY');

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySlug" TEXT,
    "imageUrl" TEXT NOT NULL,
    "companyIconUrl" TEXT NOT NULL,
    "role" "OwnerRole" NOT NULL DEFAULT 'NOAGENCY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "loom" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "clientCompany" TEXT NOT NULL,
    "clientSlug" TEXT,
    "companyName" TEXT NOT NULL,
    "pfpUrl" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "files" TEXT[],
    "links" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_companySlug_key" ON "Owner"("companySlug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientSlug_key" ON "Client"("clientSlug");
