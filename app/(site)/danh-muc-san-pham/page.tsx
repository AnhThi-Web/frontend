import ProductsClient from "./ProductsClient";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "asc" }
  });
  
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return <ProductsClient categories={categories} products={products} />;
}
