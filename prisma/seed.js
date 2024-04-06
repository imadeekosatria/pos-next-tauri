const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const data = [
        {nama: 'Susu Etawa', harga: 35000, harga_satuan: 3500, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Cukur Twin Blade', harga: 12000, harga_satuan: 1200, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Pensil 2B', harga: 2000, harga_satuan: 200, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'EM4 Pertanian', harga: 30000, harga_satuan: 3000, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Morabito', harga: 15000, harga_satuan: 1500, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Marijos', harga: 10000, harga_satuan: 1000, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Bokasi', harga: 12000, harga_satuan: 1200, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Jahe Merah', harga: 8000, harga_satuan: 800, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'Wenis', harga: 9000, harga_satuan: 900, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
        {nama: 'EM4 Peternakan', harga: 10000, harga_satuan: 1000, category: { connect: { id: '780558f7-5a30-4baf-9745-ced74836286f' } }, gambar: 'food.jpg'},
    ]

    await Promise.all(data.map(item => prisma.product.create({ data: item })))

    console.log({ data })
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