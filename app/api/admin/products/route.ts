import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError, z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  details: z.string().optional(),
  imageUrl: z.string().optional(),
  features: z.string().optional(),
  specs: z.string().optional(),
  categoryId: z.string().min(1),
});

async function checkAuth() {
  const session = await getServerSession();
  if (!session || session.user?.role !== "admin") {
    return { authorized: false };
  }
  return { authorized: true };
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await checkAuth();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = ProductSchema.parse(body);

    const product = await db.product.create({
      data,
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
