import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "../.prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    // Delete existing data
    await db.news.deleteMany();
    await db.product.deleteMany();
    await db.category.deleteMany();
    await db.adminUser.deleteMany();

    // Create demo admin user (password: password123)
    const hashedPassword = await hash("password123", 10);
    const adminUser = await db.adminUser.create({
      data: {
        email: "admin@mitek.com",
        password: hashedPassword,
        name: "Admin MITEK",
        role: "admin",
      },
    });

    console.log("Admin user created:", adminUser.email);

    // Create categories
    const categories = await Promise.all([
      db.category.create({
        data: {
          name: "Chất tẩy rửa",
          slug: "chat-tay-rua",
          description: "Các sản phẩm tẩy rửa chuyên dụng",
        },
      }),
      db.category.create({
        data: {
          name: "Mạ kẽm",
          slug: "ma-kem",
          description: "Sản phẩm mạ kẽm chất lượng cao",
        },
      }),
      db.category.create({
        data: {
          name: "Mạ đồng",
          slug: "ma-dong",
          description: "Sản phẩm mạ đồng chuyên biệt",
        },
      }),
    ]);

    console.log("Categories created:", categories.length);

    // Create sample products
    const products = await Promise.all([
      db.product.create({
        data: {
          name: "METCLEAN® SC10",
          slug: "metclean-sc10",
          description: "Hoá chất tẩy dầu mỡ ngâm nóng dạng kiềm",
          details:
            "METCLEAN® SC10 là chất tẩy rửa kiềm mạnh được thiết kế đặc biệt",
          imageUrl: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/sc10.jpg",
          categoryId: categories[0].id,
        },
      }),
      db.product.create({
        data: {
          name: "METCLEAN® EC20",
          slug: "metclean-ec20",
          description: "Hoá chất tẩy dầu điện",
          details: "METCLEAN® EC20 là chất tẩy dầu điện hóa chuyên dụng",
          imageUrl: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ec20.jpg",
          categoryId: categories[0].id,
        },
      }),
    ]);

    console.log("Products created:", products.length);

    // Create sample news
    const newsItems = await Promise.all([
      db.news.create({
        data: {
          title: "Giới thiệu sản phẩm mới MITEK 2024",
          slug: "gioi-thieu-san-pham-moi-2024",
          excerpt: "MITEK vui mừng giới thiệu dòng sản phẩm mới",
          content:
            "Năm 2024, MITEK tiếp tục đổi mới và phát triển các sản phẩm chất lượng cao...",
          published: true,
        },
      }),
      db.news.create({
        data: {
          title: "Quy trình mạ kẽm hiện đại",
          slug: "quy-trinh-ma-kem-hien-dai",
          excerpt: "Tìm hiểu về quy trình mạ kẽm hiện đại",
          content:
            "Quy trình mạ kẽm hiện đại đòi hỏi sự chính xác và kiểm soát chất lượng...",
          published: true,
        },
      }),
    ]);

    console.log("News created:", newsItems.length);

    console.log("✓ Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
