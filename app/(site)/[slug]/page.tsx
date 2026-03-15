import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductView from "@/components/site/ProductView";
import ProductsClient from "../danh-muc-san-pham/ProductsClient";
import GalleryView from "@/components/site/GalleryView";
import { galleryDetailData } from "@/lib/mock-data";

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Check if it's a category
  const category = await db.category.findUnique({ where: { slug } });
  if (category) {
    const categories = await db.category.findMany({ orderBy: { createdAt: "asc" } });
    const products = await db.product.findMany({ include: { category: true } });
    return <ProductsClient categories={categories} products={products} />;
  }

  // Check if it's a product
  const product = await db.product.findUnique({ where: { slug }, include: { category: true } });
  if (product) {
    const relatedProducts = await db.product.findMany({
      where: { categoryId: product.categoryId, NOT: { id: product.id } },
      take: 4,
      include: { category: true }
    });
    return <ProductView product={product} relatedProducts={relatedProducts} />;
  }

  // Check if it's a gallery item (fallback to static mock data since we don't have Gallery DB model yet)
  const gallery = galleryDetailData[slug];
  if (gallery) {
    return <GalleryView gallery={gallery} />;
  }

  // If neither, return notFound
  notFound();
}
