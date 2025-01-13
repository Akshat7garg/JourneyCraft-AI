-- CreateTable
CREATE TABLE "UserPrefernce" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "depDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "adult" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "addInput" TEXT,

    CONSTRAINT "UserPrefernce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPrefernce_userId_key" ON "UserPrefernce"("userId");

-- AddForeignKey
ALTER TABLE "UserPrefernce" ADD CONSTRAINT "UserPrefernce_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
