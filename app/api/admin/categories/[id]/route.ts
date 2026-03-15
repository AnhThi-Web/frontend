import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z, ZodError } from "zod";

const CategoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = CategoryUpdateSchema.parse(body);

    const category = await db.category.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
