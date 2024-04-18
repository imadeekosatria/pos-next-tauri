import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url)
  const page = url.searchParams.get('page')
  const itemPerPage = 5
  const products = await prisma.product.findMany({
    skip: (page - 1) * 5,
    take: itemPerPage,
    include: {
      category: true
    }
  });
  const total = await prisma.product.count();

  return Response.json({
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      data: products,
      totalData: total,
      itemPerPage: itemPerPage,
      page: page,
      totalPages: Math.ceil(total / 5),
    }
  });
}