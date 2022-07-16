-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Auth0Id" TEXT NOT NULL,
    "Salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "Id" TEXT NOT NULL,
    "Barcode" TEXT,
    "Price" DOUBLE PRECISION NOT NULL,
    "Title" TEXT NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,
    "IsPaid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Auth0Id_key" ON "User"("Auth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_userId_key" ON "Bill"("userId");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
