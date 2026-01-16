import "./globals.css";
import AdminHeader from "./componets/AdminHeader";
import AdminSidebar from "./componets/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100">

          <AdminSidebar />

          <div className="flex-1 flex flex-col">
            <AdminHeader />

            <main className="flex-1 p-6">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}
