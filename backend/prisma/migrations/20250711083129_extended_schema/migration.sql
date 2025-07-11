/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "settings" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Broker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Konto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountNumber" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "brokerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Konto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "kontoId" INTEGER NOT NULL,
    "assetType" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "currentPrice" DOUBLE PRECISION,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "fees" DOUBLE PRECISION DEFAULT 0,
    "leverage" DOUBLE PRECISION DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aktienidee" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strategie" TEXT NOT NULL,
    "branche" TEXT,
    "analyst" TEXT,
    "entryPrice" DOUBLE PRECISION,
    "kursziel" DOUBLE PRECISION,
    "reasoning" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Offen',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aktienidee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alarm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typ" TEXT NOT NULL,
    "schwelle" DOUBLE PRECISION NOT NULL,
    "richtung" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aktiv',
    "channel" TEXT NOT NULL DEFAULT 'InApp',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ausgeloestAt" TIMESTAMP(3),

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaktion" (
    "id" SERIAL NOT NULL,
    "kontoId" INTEGER NOT NULL,
    "positionId" INTEGER,
    "typ" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "fees" DOUBLE PRECISION DEFAULT 0,
    "datum" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaktion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KiBewertung" (
    "id" SERIAL NOT NULL,
    "aktienideeId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "scoreFundamental" DOUBLE PRECISION,
    "scoreTechnisch" DOUBLE PRECISION,
    "scoreKombiniert" DOUBLE PRECISION,
    "kommentar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KiBewertung_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Position_kontoId_symbol_idx" ON "Position"("kontoId", "symbol");

-- CreateIndex
CREATE INDEX "Aktienidee_userId_symbol_idx" ON "Aktienidee"("userId", "symbol");

-- CreateIndex
CREATE INDEX "Alarm_userId_status_idx" ON "Alarm"("userId", "status");

-- CreateIndex
CREATE INDEX "Transaktion_kontoId_datum_idx" ON "Transaktion"("kontoId", "datum");

-- CreateIndex
CREATE INDEX "KiBewertung_aktienideeId_createdAt_idx" ON "KiBewertung"("aktienideeId", "createdAt");

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Konto" ADD CONSTRAINT "Konto_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_kontoId_fkey" FOREIGN KEY ("kontoId") REFERENCES "Konto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aktienidee" ADD CONSTRAINT "Aktienidee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaktion" ADD CONSTRAINT "Transaktion_kontoId_fkey" FOREIGN KEY ("kontoId") REFERENCES "Konto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaktion" ADD CONSTRAINT "Transaktion_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KiBewertung" ADD CONSTRAINT "KiBewertung_aktienideeId_fkey" FOREIGN KEY ("aktienideeId") REFERENCES "Aktienidee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
