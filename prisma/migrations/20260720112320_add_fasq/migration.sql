-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pages" TEXT[],
    "categorie" TEXT NOT NULL,
    "ancre" TEXT,
    "outils" TEXT[],
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);
