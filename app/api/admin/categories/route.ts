import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError, z } from "zod";

const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
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
    const categories = await db.category.findMany({
      include: { _count: { select: { products: true } } },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
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
    const data = CategorySchema.parse(body);

    const category = await db.category.create({
      data,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
