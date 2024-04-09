-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT,
    "harga" REAL,
    "harga_satuan" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" TEXT,
    "gambar" TEXT,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
