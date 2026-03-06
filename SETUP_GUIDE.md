# 🚀 Setup Guide: Prisma + Database + Admin Panel

## 📋 Mục lục
1. [Database Setup](#database-setup)
2. [Cấu hình Environment](#cấu-hình-environment)
3. [Tạo Database Schema](#tạo-database-schema)
4. [Seed Demo Data](#seed-demo-data)
5. [Chạy Admin Panel](#chạy-admin-panel)
6. [API Routes](#api-routes)

---

## Database Setup

### Option 1: MySQL Local (Recommended for Development)

#### Windows:
1. **Download & Install MySQL Server** từ https://dev.mysql.com/downloads/windows/installer/
2. **Chọn setup type:** Developer Default
3. **Ghi nhớ password root** và port (mặc định: 3306)
4. **Verify installation:**
   ```bash
   mysql --version
   ```

#### macOS:
```bash
# Với Homebrew
brew install mysql
brew services start mysql

# Thiết lập password
mysql_secure_installation
```

#### Linux:
```bash
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo service mysql start
```

### Option 2: PlanetScale (Cloud MySQL - Recommended) ⭐

PlanetScale là MySQL cloud provider miễn phí, rất tốt cho development:

1. **Đăng ký:** https://planetscale.com
2. **Tạo tổ chức & database**
3. **Lấy connection string:** 
   - Click "Connect"
   - Chọn "Prisma"
   - Copy connection string

### Option 3: Railway MySQL (Cloud)

1. Vào https://railway.app
2. Create New Project → Add MySQL
3. Copy DATABASE_URL

### Option 4: AWS RDS MySQL (Production)

1. AWS Console → RDS
2. Create MySQL database
3. Copy endpoint URL

### Option 5: DigitalOcean Managed MySQL

1. Vào https://digitalocean.com
2. Create Managed Database (MySQL)
3. Copy connection string

---

## Cấu hình Environment

### 1. Update `.env` file:

```env
# MySQL Connection String - Chọn một trong các option dưới

# Local MySQL
DATABASE_URL="mysql://root:password@localhost:3306/mitek_db"

# PlanetScale (Cloud - Recommended)
DATABASE_URL="mysql://username:password@aws.connect.planetscale.com/mitek_db?sslAccept=strict"

# Railway MySQL
DATABASE_URL="mysql://username:password@railway.app:3306/mitek_db"

# AWS RDS
DATABASE_URL="mysql://username:password@mitek-db.123456.us-east-1.rds.amazonaws.com:3306/mitek_db"

# NextAuth
NEXTAUTH_SECRET="vui-long-tao-secret-key-ben-duoi"
NEXTAUTH_URL="http://localhost:3000"
```

**Format MySQL Connection String:**
```
mysql://username:password@host:port/database
```

### 2. Tạo NEXTAUTH_SECRET:

```bash
# Windows PowerShell
$secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host $secret

# macOS/Linux
openssl rand -base64 32
```

Copy output vào `.env` file

---

## Tạo Database Schema

### 1. Tạo database (Nếu dùng Local MySQL):

```bash
# Kết nối vào MySQL
mysql -u root -p

# Nhập password, sau đó chạy lệnh:
CREATE DATABASE mitek_db;
EXIT;
```

### 2. Deploy Prisma schema:

```bash
# Option A: Push schema (dùng khi dev)
npm run db:push

# Option B: Create migrations
npm run db:migrate
```

**Output mong đợi:**
```
✓ Database connected
✓ Schema applied
✓ Prisma Client generated
```

---

## Seed Demo Data

### Chạy seed script để tạo demo data:

```bash
npm run db:seed
```

**Kết quả:**
```
Admin user created: admin@mitek.com
Categories created: 3
Products created: 2
News created: 2
✓ Database seeded successfully!
```

### Demo Account:
- **Email:** admin@mitek.com
- **Password:** password123

---

## Chạy Admin Panel

### 1. Bắt đầu dev server:

```bash
npm run dev
```

### 2. Truy cập Admin:

- **Login:** http://localhost:3000/admin/login
- **Dashboard:** http://localhost:3000/admin/dashboard
- **Quản lý sản phẩm:** http://localhost:3000/admin/products
- **Quản lý danh mục:** http://localhost:3000/admin/categories
- **Quản lý tin tức:** http://localhost:3000/admin/news

### 3. Đăng nhập với tài khoản demo:
```
Email: admin@mitek.com
Password: password123
```

---

## API Routes

### Authentication
- `POST /api/auth/signin` - Đăng nhập
- `POST /api/auth/signout` - Đăng xuất

### Categories (Admin only)
- `GET /api/admin/categories` - Danh sách danh mục
- `POST /api/admin/categories` - Tạo danh mục mới
- `GET /api/admin/categories/[id]` - Chi tiết danh mục
- `PUT /api/admin/categories/[id]` - Cập nhật danh mục
- `DELETE /api/admin/categories/[id]` - Xóa danh mục

### Products (Admin only)
- `GET /api/admin/products` - Danh sách sản phẩm
- `POST /api/admin/products` - Tạo sản phẩm mới
- `GET /api/admin/products/[id]` - Chi tiết sản phẩm
- `PUT /api/admin/products/[id]` - Cập nhật sản phẩm
- `DELETE /api/admin/products/[id]` - Xóa sản phẩm

### News (Admin only)
- `GET /api/admin/news` - Danh sách tin tức
- `POST /api/admin/news` - Tạo bài viết mới
- `GET /api/admin/news/[id]` - Chi tiết bài viết
- `PUT /api/admin/news/[id]` - Cập nhật bài viết
- `DELETE /api/admin/news/[id]` - Xóa bài viết

---

## 🆘 Troubleshooting

### Lỗi: "Can't reach database server"

**Giải pháp:**
```bash
# Kiểm tra MySQL service
sudo service mysql status      # Linux
brew services list             # macOS
# Windows: Services → MySQL80 (or MySQL57, MySQL8.0, etc.) should be running

# Test connection
mysql -u root -p -h localhost

# Verify DATABASE_URL format
cat .env  # Check DATABASE_URL
```

**Thông dụng:**
```
MySQL Local:      mysql://root:password@localhost:3306/mitek_db
PlanetScale:      mysql://username:password@aws.connect.planetscale.com/mitek_db?sslAccept=strict
Railway:          mysql://username:password@railway.app:3306/mitek_db
```

### Lỗi: "Prisma Client not generated"

```bash
npx prisma generate
npm run db:push
```

### Lỗi: "Port 3000 already in use"

```bash
npm run dev -- -p 3001
```

### Forgot demo password?

Reset trong database:
```bash
npx prisma studio  # Open UI, edit admin user password
```

---

## 📦 Project Structure

```
app/
├── admin/
│   ├── login/page.tsx           # Login page
│   ├── dashboard/page.tsx       # Dashboard
│   ├── products/page.tsx        # Products management
│   ├── categories/page.tsx      # Categories management
│   └── news/page.tsx            # News management
├── api/
│   ├── auth/[...nextauth]/route.ts  # Authentication
│   └── admin/
│       ├── categories/route.ts
│       ├── categories/[id]/route.ts
│       ├── products/route.ts
│       ├── products/[id]/route.ts
│       ├── news/route.ts
│       └── news/[id]/route.ts
prisma/
├── schema.prisma                # Data models
└── seed.ts                      # Demo data script
lib/
├── db.ts                        # Prisma client
└── auth.ts                      # Auth utilities
```

---

## 🎯 Next Steps

1. ✅ Setup database
2. ✅ Chạy migrations
3. ✅ Seed demo data
4. ✅ Bắt đầu dev server
5. ⬜️ Connect public pages to real data (update components to fetch from API)
6. ⬜️ Add image upload functionality
7. ⬜️ Add more admin features (users management, statistics, etc.)

---

## 📚 Resources

- **Prisma Docs:** https://www.prisma.io/docs/
- **NextAuth.js:** https://next-auth.js.org/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **Neon Cloud DB:** https://neon.tech/

---

Happy coding! 🚀
