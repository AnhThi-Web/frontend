import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return { authorized: false };
  }
  return { authorized: true };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10));

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } },
      ],
    } : {};

    const [categories, total] = await Promise.all([
      db.category.findMany({
        where,
        include: { _count: { select: { products: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.category.count({ where }),
    ]);

    return NextResponse.json({
      data: categories,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    });
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
      data: data as any,
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
