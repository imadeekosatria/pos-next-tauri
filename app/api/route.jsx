import { PrismaClient } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    const data = await prisma.product.findMany({include: {category: true}});
    return Response.json({
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
}