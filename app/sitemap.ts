import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Get all categories
  const categories = await db.category.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Get all products
  const products = await db.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Get all published news
  const news = await db.news.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: cat.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/${prod.slug}`,
    lastModified: prod.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/tin-tuc/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danh-muc-san-pham`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thu-vien-anh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticEntries, ...categoryEntries, ...productEntries, ...newsEntries];
}
