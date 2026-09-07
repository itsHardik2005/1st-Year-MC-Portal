"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldAlert,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  Video,
  Layers,
  FileClock,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  RefreshCw,
  Search,
  Lock,
} from "lucide-react";

interface MaterialItem {
  id: string;
  title: string;
  description: string;
  category: "core" | "non-core" | "lecture" | "temp_pdf";
  file_url?: string;
  storage_path?: string;
  video_id?: string;
  is_temp?: boolean;
  created_at?: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Feedback alerts
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: "core" | "non-core" | "lecture" | "temp_pdf";
    file_url: string;
    video_id: string;
    is_temp: boolean;
  }>({
    title: "",
    description: "",
    category: "core",
    file_url: "",
    video_id: "",
    is_temp: false,
  });

  const initialMockMaterials: MaterialItem[] = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      title: "Mathematics-1 & Engineering Physics",
      description: "Differential calculus, matrix algebra, wave optics, and quantum mechanics problem sets.",
      category: "core",
      file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      title: "Technical Writing & Professional Communication",
      description: "Guides on writing clear documentation, technical proposals, and research papers.",
      category: "non-core",
      file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "55555555-5555-5555-5555-555555555555",
      title: "Data Structures & Neural Networks Masterclass",
      description: "Unlisted YouTube video lecture explaining Transformers and CNNs.",
      category: "lecture",
      video_id: "dQw4w9WgXcQ",
    },
    {
      id: "77777777-7777-7777-7777-777777777777",
      title: "Midterm Exam Solutions Vault (60-Second Temporary Access)",
      description: "Confidential midterm solutions sheet with auto-expiring token.",
      category: "temp_pdf",
      is_temp: true,
    },
  ];

  const fetchAdminMaterials = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      setMaterials(data);
    } else {
      setMaterials(initialMockMaterials);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdminMaterials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "core",
      file_url: "",
      video_id: "",
      is_temp: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MaterialItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      file_url: item.file_url || "",
      video_id: item.video_id || "",
      is_temp: !!item.is_temp,
    });
    setIsModalOpen(true);
  };

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMsg(null);

    const supabase = createClient();

    try {
      if (editingId) {
        const { error } = await supabase
          .from("materials")
          .update({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            file_url: formData.file_url || null,
            video_id: formData.video_id || null,
            is_temp: formData.category === "temp_pdf" ? true : formData.is_temp,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (error) {
          setStatusMsg({
            type: "error",
            text: `SUPABASE RLS NOTICE: ${error.message} (All UPDATE operations require specific Admin User ID privileges).`,
          });
        } else {
          setStatusMsg({ type: "success", text: "MATERIAL UPDATED SUCCESSFULLY IN SUPABASE DATABASE!" });
          setIsModalOpen(false);
          fetchAdminMaterials();
        }
      } else {
        const { error } = await supabase.from("materials").insert([
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            file_url: formData.file_url || null,
            video_id: formData.video_id || null,
            is_temp: formData.category === "temp_pdf" ? true : formData.is_temp,
          },
        ]);

        if (error) {
          setStatusMsg({
            type: "error",
            text: `SUPABASE RLS NOTICE: ${error.message} (All INSERT operations require specific Admin User ID privileges).`,
          });
        } else {
          setStatusMsg({ type: "success", text: "NEW MATERIAL ADDED SUCCESSFULLY TO PORTAL DATABASE!" });
          setIsModalOpen(false);
          fetchAdminMaterials();
        }
      }
    } catch (err: any) {
      const newItem: MaterialItem = {
        id: editingId || `mock-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        file_url: formData.file_url,
        video_id: formData.video_id,
        is_temp: formData.is_temp,
      };

      if (editingId) {
        setMaterials((prev) => prev.map((m) => (m.id === editingId ? newItem : m)));
        setStatusMsg({ type: "success", text: "UPDATED MATERIAL ITEM (LOCAL ADMIN VIEW)." });
      } else {
        setMaterials((prev) => [newItem, ...prev]);
        setStatusMsg({ type: "success", text: "CREATED NEW MATERIAL ITEM (LOCAL ADMIN VIEW)." });
      }
      setIsModalOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Confirm deleting this material item?")) return;

    setActionLoading(true);
    setStatusMsg(null);
    const supabase = createClient();

    const { error } = await supabase.from("materials").delete().eq("id", id);

    if (error) {
      setStatusMsg({
        type: "error",
        text: `SUPABASE RLS NOTICE: ${error.message} (DELETE restricted to Admin User ID).`,
      });
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    } else {
      setStatusMsg({ type: "success", text: "MATERIAL DELETED SUCCESSFULLY." });
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
    setActionLoading(false);
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="border-3 sm:border-4 border-black bg-rose-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 font-mono text-xs font-black uppercase border-2 border-black">
              <ShieldAlert className="w-4 h-4 stroke-[3]" />
              <span>ADMIN MANAGEMENT HUB // RLS POLICY CONTROL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter">
              PORTAL MATERIAL CONTROL
            </h1>
            <p className="text-xs font-bold text-black max-w-2xl bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Create, edit, or remove study materials. Enforced strictly by Supabase Row Level Security policies.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-black text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-5 h-5 stroke-[3]" />
            <span>ADD NEW MATERIAL</span>
          </button>
        </div>
      </div>

      {/* RLS Security Notice */}
      <div className="border-3 sm:border-4 border-black bg-yellow-300 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center space-x-3 text-black max-w-full">
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0 stroke-[3]" />
          <div className="min-w-0">
            <span className="font-black uppercase">ROW LEVEL SECURITY (RLS) POLICY: </span>
            <span className="font-bold">
              Only Admin UID <code className="bg-black text-yellow-300 px-1.5 py-0.5 border border-black break-all text-[11px]">00000000-0000-0000-0000-000000000000</code> is granted INSERT/UPDATE/DELETE write access.
            </span>
          </div>
        </div>
        <div className="bg-black text-white px-3 py-1.5 font-black border-2 border-black text-[11px] truncate max-w-full">
          SESSION: {user?.email || "STUDENT READ-ONLY ROLE"}
        </div>
      </div>

      {/* Status Feedback Alert */}
      {statusMsg && (
        <div
          className={`p-4 border-4 border-black font-mono text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-3 ${
            statusMsg.type === "success" ? "bg-emerald-400 text-black" : "bg-rose-500 text-white"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-black shrink-0 stroke-[3]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-300 shrink-0 stroke-[3]" />
          )}
          <span className="leading-relaxed">{statusMsg.text}</span>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 sm:p-4 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative w-full sm:flex-1 sm:min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-black stroke-[3]" />
          <input
            type="text"
            placeholder="Search materials by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-3 border-black bg-yellow-100 text-black font-mono text-xs font-bold focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full font-mono shrink-0">
          {["all", "core", "non-core", "lecture", "temp_pdf"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all shrink-0 ${
                categoryFilter === cat
                  ? "bg-black text-yellow-400 shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
                  : "bg-white text-black hover:bg-yellow-300"
              }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Table */}
      <div className="border-3 sm:border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-black">
            <thead className="border-b-3 sm:border-b-4 border-black bg-black text-yellow-400 font-black uppercase text-[10px] sm:text-[11px]">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4">TITLE & DETAILS</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">CATEGORY</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">RESOURCE TARGET</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 sm:divide-y-3 divide-black font-bold">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-black">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-black mb-2 stroke-[3]" />
                    LOADING MATERIALS DATABASE...
                  </td>
                </tr>
              ) : filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-black">
                    NO MATERIALS MATCHING SEARCH CRITERIA.
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((item) => (
                  <tr key={item.id} className="hover:bg-yellow-100 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 max-w-xs">
                      <div className="font-black text-black text-xs sm:text-sm uppercase">{item.title}</div>
                      {item.description && (
                        <div className="text-[10px] sm:text-[11px] text-zinc-700 mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase border-2 border-black ${
                          item.category === "core"
                            ? "bg-cyan-300 text-black"
                            : item.category === "non-core"
                            ? "bg-purple-300 text-black"
                            : item.category === "lecture"
                            ? "bg-rose-400 text-black"
                            : "bg-orange-400 text-black"
                        }`}
                      >
                        {item.category.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-[10px] sm:text-[11px]">
                      {item.video_id ? (
                        <span className="bg-black text-white px-2 py-0.5 border border-black truncate max-w-[120px] sm:max-w-[180px] inline-block">YOUTUBE: {item.video_id}</span>
                      ) : item.file_url ? (
                        <span className="bg-yellow-300 text-black px-2 py-0.5 border border-black truncate max-w-[120px] sm:max-w-[180px] block">
                          PDF URL STREAM
                        </span>
                      ) : (
                        <span className="text-zinc-500">STORAGE PATH</span>
                      )}
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right space-x-1 sm:space-x-2 shrink-0">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 sm:p-2 bg-yellow-300 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                        title="Edit Material"
                      >
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(item.id)}
                        className="p-1.5 sm:p-2 bg-rose-500 border-2 border-black text-white hover:bg-black transition-colors"
                        title="Delete Material"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating / Editing Material */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg border-4 border-black bg-yellow-400 p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-6 font-mono max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-4 border-black pb-4">
              <h3 className="text-xl font-black uppercase text-black">
                {editingId ? "EDIT MATERIAL RECORD" : "CREATE NEW MATERIAL"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 bg-black text-white border-2 border-black hover:bg-rose-500"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  MATERIAL TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Mathematics-1 Calculus Notes"
                  className="w-full border-3 border-black bg-white p-3 text-black text-xs font-bold focus:bg-yellow-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  CATEGORY *
                </label>
                <select
                  value={formData.category}
                  onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border-3 border-black bg-white p-3 text-black text-xs font-black focus:outline-none"
                >
                  <option value="core">CORE SUBJECT</option>
                  <option value="non-core">NON-CORE ELECTIVE</option>
                  <option value="lecture">VIDEO LECTURE</option>
                  <option value="temp_pdf">TIME-LIMITED TEMP PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of syllabus contents..."
                  className="w-full border-3 border-black bg-white p-3 text-black text-xs font-bold focus:bg-yellow-100 focus:outline-none"
                />
              </div>

              {formData.category === "lecture" ? (
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    YOUTUBE VIDEO ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.video_id}
                    onChange={(e) => setFormData({ ...formData, video_id: e.target.value })}
                    placeholder="dQw4w9WgXcQ"
                    className="w-full border-3 border-black bg-white p-3 text-black text-xs font-mono font-bold focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    PDF DOCUMENT URL
                  </label>
                  <input
                    type="url"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    placeholder="https://domain.com/sample.pdf"
                    className="w-full border-3 border-black bg-white p-3 text-black text-xs font-mono font-bold focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t-4 border-black">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border-2 border-black font-black text-xs uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2 bg-black text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-black flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4 stroke-[3]" />
                  <span>{actionLoading ? "SAVING..." : "SAVE MATERIAL"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
