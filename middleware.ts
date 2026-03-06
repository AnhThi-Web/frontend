import { withAuth } from "next-auth/middleware";

export const middleware = withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Cho phép truy cập trang login
        if (path === "/admin/login") {
          return true;
        }
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
