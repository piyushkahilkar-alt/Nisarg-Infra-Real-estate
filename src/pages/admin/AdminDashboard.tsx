import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import {
  Users,
  FolderKanban,
  FileText,
  ImageIcon,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    projects: 0,
    blogs: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsSnap, projectsSnap, blogsSnap, gallerySnap] =
          await Promise.all([
            getDocs(collection(db, "leads")),
            getDocs(collection(db, "projects")),
            getDocs(collection(db, "blogs")),
            getDocs(collection(db, "gallery")),
          ]);

        setStats({
          leads: leadsSnap.size,
          projects: projectsSnap.size,
          blogs: blogsSnap.size,
          gallery: gallerySnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#137A35] animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Leads",
      value: stats.leads,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Blogs",
      value: stats.blogs,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Gallery Items",
      value: stats.gallery,
      icon: ImageIcon,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center"
            >
              <div className={`p-4 rounded-lg ${stat.bg} mr-4`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick notice/welcome */}
      <div className="mt-12 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold mb-2">Welcome to Admin Portal</h2>
        <p className="text-gray-600">
          Use the sidebar to manage projects, review incoming leads, and update
          content.
        </p>
      </div>
    </div>
  );
}
