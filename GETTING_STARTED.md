# ✅ Getting Started Checklist

## Step 1: Setup Database (Choose ONE)

### Option A: Local MySQL ⭐ (Recommended for dev)
- [ ] Install MySQL from https://dev.mysql.com/downloads/mysql/
- [ ] Verify installation: `mysql --version`
- [ ] Create database:
  ```bash
  mysql -u root -p
  CREATE DATABASE mitek_db;
  EXIT;
  ```
- [ ] Update `.env`:
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/mitek_db"
```

### Option B: PlanetScale Cloud ☁️ (Easy, Free - Recommended)
- [ ] Sign up at https://planetscale.com
- [ ] Create new database
- [ ] Click "Connect" → Copy Prisma connection string
- [ ] Paste to `.env`:
```env
DATABASE_URL="mysql://username:password@aws.connect.planetscale.com/mitek_db?sslAccept=strict"
```

### Option C: Railway ☁️
- [ ] Go to https://railway.app
- [ ] Create new project + MySQL
- [ ] Copy DATABASE_URL to `.env`

### Option D: AWS RDS ☁️
- [ ] AWS Console → RDS → Create MySQL instance
- [ ] Copy endpoint URL to `.env`

---

## Step 2: Configure Environment

- [ ] Open `.env` file
- [ ] Update `DATABASE_URL` (from Step 1)
- [ ] Verify `.env` looks like:
  ```env
  # MySQL Local Example
  DATABASE_URL="mysql://root:password123@localhost:3306/mitek_db"
  
  # OR PlanetScale Example
  DATABASE_URL="mysql://abc123:xyz789@aws.connect.planetscale.com/mitek_db?sslAccept=strict"
  
  NEXTAUTH_SECRET="your_secret_here"
  NEXTAUTH_URL="http://localhost:3000"
  ```
- [ ] Generate `NEXTAUTH_SECRET`:
  ```bash
  # Windows PowerShell
  $secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
  Write-Host $secret
  
  # macOS/Linux
  openssl rand -base64 32
  ```
- [ ] Paste secret into `.env` as `NEXTAUTH_SECRET`

---

## Step 3: Install Dependencies

- [ ] Run: `npm install` (or `npm ci`)
- [ ] Verify: `npm list prisma` shows installed

---

## Step 4: Setup Database Schema

- [ ] Run: `npm run db:push`
- [ ] Wait for completion (should show ✓)
- [ ] Check `.env` DATABASE_URL is correct if error

---

## Step 5: Seed Demo Data

- [ ] Run: `npm run db:seed`
- [ ] Verify output:
  ```
  Admin user created: admin@mitek.com
  Categories created: 3
  Products created: 2
  News created: 2
  ✓ Database seeded successfully!
  ```

---

## Step 6: Start Development Server

- [ ] Run: `npm run dev`
- [ ] Open browser: http://localhost:3000
- [ ] Verify no errors in console

---

## Step 7: Login to Admin Panel

- [ ] Go to: http://localhost:3000/admin/login
- [ ] Login with:
  - **Email:** admin@mitek.com
  - **Password:** password123
- [ ] See dashboard with 4 cards (Products, Categories, News, Settings)

---

## Step 8: Test Admin Features

### Test Categories:
- [ ] Click "Danh Mục" card
- [ ] Click "Thêm Danh Mục"
- [ ] Create test category
- [ ] Edit it
- [ ] Delete it

### Test Products:
- [ ] Click "Sản Phẩm" card
- [ ] Click "Thêm Sản Phẩm"
- [ ] Create test product
- [ ] Edit it
- [ ] Delete it

### Test News:
- [ ] Click "Tin Tức" card
- [ ] Click "Thêm Bài Viết"
- [ ] Create test article
- [ ] Edit it
- [ ] Delete it

---

## Troubleshooting

### Issue: "Can't reach database"
- [ ] Check DATABASE_URL in `.env`
- [ ] Verify MySQL is running:
  - Windows: Services → MySQL80 (or similar) should be running
  - macOS: `brew services list`
  - Linux: `sudo service mysql status`
- [ ] Test connection: `mysql -u root -p` (then QUIT)
- [ ] Verify connection string format:
  - Local: `mysql://root:password@localhost:3306/mitek_db`
  - Cloud: `mysql://user:pass@host.com/database?sslAccept=strict`

### Issue: "port 3000 already in use"
- [ ] Run: `npm run dev -- -p 3001`
- [ ] Access: http://localhost:3001

### Issue: "Module not found: @prisma/client"
- [ ] Run: `npm install @prisma/client`
- [ ] Run: `npm run db:push`

### Issue: Forgot admin password
- [ ] Run: `npx prisma studio`
- [ ] Open http://localhost:5555
- [ ] Edit admin_users table directly

### Issue: Want to reset everything
```bash
# Delete all data
npm run db:push --force-reset

# Reseed demo data
npm run db:seed
```

---

## Success Indicators ✅

| Check | Status |
|-------|--------|
| npm install completes | ✅ |
| npm run db:push succeeds | ✅ |
| npm run db:seed shows success message | ✅ |
| npm run dev starts without errors | ✅ |
| http://localhost:3000 loads | ✅ |
| http://localhost:3000/admin/login accessible | ✅ |
| Can login with admin@mitek.com / password123 | ✅ |
| Dashboard loads with 4 cards | ✅ |
| Can create/edit/delete categories | ✅ |
| Can create/edit/delete products | ✅ |
| Can create/edit/delete news | ✅ |

---

## 🎉 You're Done!

If all items are checked, your admin panel is ready! 🚀

Next, you can:
1. Change admin password
2. Create more categories/products/news
3. Connect public pages to real data (replace mock-data)
4. Add image upload functionality
5. Deploy to production (Vercel + Cloud DB)

---

## 📞 Need Help?

Refer to:
- **SETUP_GUIDE.md** - Detailed setup instructions
- **IMPLEMENTATION_SUMMARY.md** - Overview of what was created
- **Prisma Docs** - https://www.prisma.io/docs
- **NextAuth Docs** - https://next-auth.js.org

Good luck! 💪
