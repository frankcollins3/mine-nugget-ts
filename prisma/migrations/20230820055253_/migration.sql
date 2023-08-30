-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "digs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "strainid" INTEGER NOT NULL,
    "into_it" BOOLEAN,

    CONSTRAINT "digs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mines" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "strainid" INTEGER NOT NULL,
    "review" TEXT,
    "title" VARCHAR(255),

    CONSTRAINT "mines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strains" (
    "id" SERIAL NOT NULL,
    "strain" VARCHAR(255) NOT NULL,
    "strainid" INTEGER NOT NULL,
    "dominant" VARCHAR(255) NOT NULL,
    "funfact" VARCHAR(255) NOT NULL,
    "parents" VARCHAR(255) NOT NULL,
    "taste" VARCHAR(255) NOT NULL,
    "smell" VARCHAR(255) NOT NULL,
    "gold" VARCHAR(255) NOT NULL,
    "nugget" VARCHAR(255) NOT NULL,
    "thc" VARCHAR(255) NOT NULL,
    "cbd" VARCHAR(255) NOT NULL,

    CONSTRAINT "strains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinersOnStrains" (
    "minersId" INTEGER NOT NULL,
    "strainsid" INTEGER NOT NULL,

    CONSTRAINT "MinersOnStrains_pkey" PRIMARY KEY ("minersId","strainsid")
);

-- CreateTable
CREATE TABLE "miners" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),
    "age" INTEGER,
    "email" VARCHAR(255),
    "wins" INTEGER,
    "icon" TEXT,

    CONSTRAINT "miners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "strains_strainid_key" ON "strains"("strainid");

-- AddForeignKey
ALTER TABLE "digs" ADD CONSTRAINT "digs_strainid_fkey" FOREIGN KEY ("strainid") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mines" ADD CONSTRAINT "mines_strainid_fkey" FOREIGN KEY ("strainid") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinersOnStrains" ADD CONSTRAINT "MinersOnStrains_minersId_fkey" FOREIGN KEY ("minersId") REFERENCES "miners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinersOnStrains" ADD CONSTRAINT "MinersOnStrains_strainsid_fkey" FOREIGN KEY ("strainsid") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
