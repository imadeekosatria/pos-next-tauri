const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const CategorySeed = async ()=>{
  const category = [
      { id: 'e998eca6-1ae5-40b3-973e-f9f35673759c', name: 'ATK' },
      { id: '0ef96656-89f0-4d68-a032-be9c733ee916', name: 'EM4' },
      { id: 'a5924592-6293-4e0b-9ca1-5d8d5894b8c2', name: 'Produk Jahe' },
      { id: 'a937aeff-04aa-466c-88e7-99e2d537100c', name: 'Parfum' },
      { id: '8a388937-e3ad-40b7-aaf8-597b43d48f45', name: 'Pengharum Ruangan'},
      { id: '82b65ad9-2425-4b26-8a9c-776405d5a715', name: 'Lain-lain'}
    ]

    await prisma.category.createMany({ data: category })
    console.log({ category })

}

const ProductSeed = async ()=>{
  const data = [
    {nama: 'Susu Etawa', harga: 35000, harga_satuan: 3500, category_id: 'a5924592-6293-4e0b-9ca1-5d8d5894b8c2', gambar: 'food.jpg'},
    {nama: 'Cukur Twin Blade', harga: 12000, harga_satuan: 1200, category_id: '82b65ad9-2425-4b26-8a9c-776405d5a715', gambar: 'food.jpg'},
    {nama: 'Pensil 2B', harga: 2000, harga_satuan: 200, category_id: 'e998eca6-1ae5-40b3-973e-f9f35673759c', gambar: 'food.jpg'},
    {nama: 'EM4 Pertanian', harga: 30000, harga_satuan: 3000, category_id: '0ef96656-89f0-4d68-a032-be9c733ee916', gambar: 'food.jpg'},
    {nama: 'Morabito', harga: 15000, harga_satuan: 1500, category_id: 'a937aeff-04aa-466c-88e7-99e2d537100c', gambar: 'food.jpg'},
    {nama: 'Marijos', harga: 10000, harga_satuan: 1000, category_id: 'a937aeff-04aa-466c-88e7-99e2d537100c', gambar: 'food.jpg'},
    {nama: 'Bokasi', harga: 12000, harga_satuan: 1200, category_id: '82b65ad9-2425-4b26-8a9c-776405d5a715', gambar: 'food.jpg'},
    {nama: 'Jahe Merah', harga: 8000, harga_satuan: 800, category_id: 'a5924592-6293-4e0b-9ca1-5d8d5894b8c2', gambar: 'food.jpg'},
    {nama: 'Wenis', harga: 9000, harga_satuan: 900, category_id: '8a388937-e3ad-40b7-aaf8-597b43d48f45', gambar: 'food.jpg'},
    {nama: 'EM4 Peternakan', harga: 10000, harga_satuan: 1000, category_id: '0ef96656-89f0-4d68-a032-be9c733ee916', gambar: 'food.jpg'},
  ]

  await prisma.product.createMany({ data })
  console.log({ data })

}

async function main() {
    // await CategorySeed()
    await ProductSeed()
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })