import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLeads(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
      toast.success("Status updated");
      fetchLeads();
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm);
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin h-8 w-8 text-[#137A35]" />
      </div>
    );

  const statusOptions = [
    "New Lead",
    "Contacted",
    "Follow Up",
    "Site Visit Scheduled",
    "Closed",
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Leads</h1>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-[#137A35] focus:border-[#137A35]"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full md:w-64 focus:ring-[#137A35] focus:border-[#137A35]"
        >
          <option value="All">All Statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                  {lead.message && (
                    <div
                      className="text-xs text-gray-400 mt-1 max-w-xs truncate"
                      title={lead.message}
                    >
                      Msg: {lead.message}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {lead.projectInterested}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="border border-gray-300 rounded text-sm p-1 max-w-[150px] bg-gray-50 font-medium text-gray-700 focus:ring-1 focus:ring-[#137A35]"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No leads found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
