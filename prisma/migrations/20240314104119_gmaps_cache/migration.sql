-- CreateTable
CREATE TABLE "gmaps_cache" (
    "id" TEXT NOT NULL,
    "car" DOUBLE PRECISION NOT NULL,
    "foot" DOUBLE PRECISION NOT NULL,
    "rail" DOUBLE PRECISION NOT NULL,
    "plane" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gmaps_cache_pkey" PRIMARY KEY ("id")
);
