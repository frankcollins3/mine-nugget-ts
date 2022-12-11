-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "digs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "strainId" INTEGER NOT NULL,
    "into_it" BOOLEAN,

    CONSTRAINT "digs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effects" (
    "id" SERIAL NOT NULL,
    "strainId" INTEGER NOT NULL,
    "taste" VARCHAR(255),
    "smell" TEXT,
    "gold" VARCHAR(255),
    "mine" CHAR(255),
    "nug" VARCHAR(255),
    "thc" INTEGER,
    "cbd" INTEGER,

    CONSTRAINT "effects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mines" (
    "id" SERIAL NOT NULL,
    "strainId" INTEGER NOT NULL,
    "review" TEXT,
    "title" VARCHAR(255),

    CONSTRAINT "mines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strains" (
    "id" SERIAL NOT NULL,
    "strainId" INTEGER,
    "strain" VARCHAR(255),
    "dominant" VARCHAR(255),
    "funfact" VARCHAR(255),
    "parents" VARCHAR(255),

    CONSTRAINT "strains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),
    "age" INTEGER,
    "email" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnStrains" (
    "usersId" INTEGER NOT NULL,
    "strainsId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnStrains_pkey" PRIMARY KEY ("usersId","strainsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "digs_strainId_key" ON "digs"("strainId");

-- CreateIndex
CREATE UNIQUE INDEX "effects_strainId_key" ON "effects"("strainId");

-- CreateIndex
CREATE UNIQUE INDEX "mines_strainId_key" ON "mines"("strainId");

-- AddForeignKey
ALTER TABLE "digs" ADD CONSTRAINT "digs_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effects" ADD CONSTRAINT "effects_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mines" ADD CONSTRAINT "mines_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStrains" ADD CONSTRAINT "UsersOnStrains_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStrains" ADD CONSTRAINT "UsersOnStrains_strainsId_fkey" FOREIGN KEY ("strainsId") REFERENCES "strains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
