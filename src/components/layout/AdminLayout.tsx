import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Image as ImageIcon,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "../../lib/utils";
import toast from "react-hot-toast";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#137A35]" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
    { to: "/admin/leads", icon: Users, label: "Leads" },
    { to: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
    { to: "/admin/blogs", icon: FileText, label: "Blogs" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-[#1E293B]">
              ADMIN PANEL
            </span>
            <span className="text-xs text-gray-500">Nisarg Infra Realties</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[#137A35] text-white"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-gray-400",
                  )}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
