import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z, ZodError } from "zod";

const NewsUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  published: z.boolean().optional(),
});

async function checkAuth() {
  const session = await getServerSession();
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
    const article = await db.news.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
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
    const data = NewsUpdateSchema.parse(body);

    const article = await db.news.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update news" },
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
    await db.news.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
