CREATE TYPE "ProgrammeCode" AS ENUM ('RN', 'PN');

CREATE TABLE "Programme" (
    "id" TEXT NOT NULL,
    "code" "ProgrammeCode" NOT NULL,
    "displayName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Programme_code_key" ON "Programme"("code");

INSERT INTO "Programme" ("id", "code", "displayName", "updatedAt")
VALUES
    ('programme_rn', 'RN', 'NCLEX-RN', CURRENT_TIMESTAMP),
    ('programme_pn', 'PN', 'NCLEX-PN', CURRENT_TIMESTAMP);
