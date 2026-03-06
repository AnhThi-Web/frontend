Dự án này là một bản clone giao diện/ứng dụng được xây dựng bằng Next.js và React với TailwindCSS và nhiều thư viện UI hiện đại.

📦 Tech stack chính:

Next.js (React framework)

TailwindCSS (utility-first CSS)

TypeScript

React Query, Radix UI, Three.js, v.v.

🛠️ Yêu cầu môi trường

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

✔ Node.js phiên bản ≥ 18
✔ pnpm (hoặc bạn có thể dùng npm/yarn)
✔ Git để clone repo

📥 Clone source code
git clone https://github.com/ThaoHoang04/mitek_clone.git
cd mitek_clone
🔧 Cài dependencies

Sử dụng pnpm (được khuyến nghị vì packageManager quy định):

pnpm install

Nếu bạn chưa cài pnpm:

npm install -g pnpm

📌 Bạn cũng có thể dùng npm install hoặc yarn install nếu không dùng pnpm.

⚙️ Cấu hình môi trường

Dự án có file .env (hiện có sẵn trong repo).
Bạn nên tạo bản sao từ mẫu nếu chưa có:

cp .env .env.local

Rồi chỉnh các biến môi trường theo nhu cầu (ví dụ API key, URL backend…).

▶️ Chạy trong môi trường dev

Để chạy ứng dụng ở chế độ phát triển:

pnpm dev

Hoặc nếu dùng npm/yarn:

npm run dev
# hoặc
yarn dev

Sau đó mở trình duyệt và truy cập:

http://localhost:3000
🧪 Scripts hữu ích
Lệnh	Mô tả
pnpm dev	Chạy dev server
pnpm build	Build app cho production
pnpm start	Chạy bản build
pnpm test	Chạy test (Vitest)
pnpm typecheck	Kiểm tra TypeScript

Bạn cũng có thể chạy tương tự bằng npm hoặc yarn, ví dụ:

npm run build
