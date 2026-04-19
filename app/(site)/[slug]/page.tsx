import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductView from "@/components/site/ProductView";
import ProductsClient from "../danh-muc-san-pham/ProductsClient";
import GalleryView from "@/components/site/GalleryView";
import { galleryDetailData } from "@/lib/mock-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  const category = await db.category.findUnique({ where: { slug } });
  if (category) {
    return {
      title: category.name,
      description: category.description || `Danh mục sản phẩm ${category.name}`,
      openGraph: {
        title: category.name,
        description: category.description || `Danh mục sản phẩm ${category.name}`,
        url: `/${slug}`,
        images: category.imageUrl ? [{ url: category.imageUrl }] : undefined,
      },
    };
  }

  const product = await db.product.findUnique({ where: { slug } });
  if (product) {
    return {
      title: product.name,
      description: product.description || `Sản phẩm ${product.name}`,
      openGraph: {
        title: product.name,
        description: product.description || `Sản phẩm ${product.name}`,
        url: `/${slug}`,
        images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
      },
    };
  }

  const gallery = galleryDetailData[slug];
  if (gallery) {
    return {
      title: gallery.title,
      description: gallery.title,
      openGraph: {
        title: gallery.title,
        url: `/${slug}`,
        images: gallery.images && gallery.images.length > 0 ? [{ url: gallery.images[0].src }] : undefined,
      },
    };
  }

  return {
    title: "Không tìm thấy trang",
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Check if it's a category
  const category = await db.category.findUnique({ where: { slug } });
  if (category) {
    const categories = await db.category.findMany({ orderBy: { createdAt: "asc" } });
    const products = await db.product.findMany({ include: { category: true } });
    return <ProductsClient categories={categories} products={products} initialCategoryId={category.id} />;
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
