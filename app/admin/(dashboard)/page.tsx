"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  getTourPackages,
  saveTourPackage,
  deleteTourPackage,
  seedDefaultPackages,
  type TourPackageItem,
  getActivities,
  saveActivity,
  deleteActivity,
  seedDefaultActivities,
  type ActivityItem,
  getArticles,
  saveArticle,
  deleteArticle,
  type ArticleItem,
  getLoginLogs,
  clearLoginLogs,
  type LoginLogItem,
} from "@/lib/firestore-service";
import { isFirebaseConfigured, firebaseConfig } from "@/lib/firebase";

// Dynamic import untuk TiptapEditor (menghindari masalah SSR)
const TiptapEditor = dynamic(() => import("@/components/admin/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-center text-gray-400 bg-gray-50 border border-gray-200 rounded-xl">
      Memuat Editor Tiptap...
    </div>
  ),
});

type TabType = "packages" | "activities" | "articles" | "logs" | "settings";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("packages");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Packages state
  const [packages, setPackages] = useState<TourPackageItem[]>([]);
  const [editingPackage, setEditingPackage] = useState<TourPackageItem | null>(null);
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);

  // Activities state
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [isActModalOpen, setIsActModalOpen] = useState(false);

  // Articles state
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isArticleEditing, setIsArticleEditing] = useState(false);

  // Login Logs state
  const [loginLogs, setLoginLogs] = useState<LoginLogItem[]>([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleImportFromBlogger = async () => {
    if (!confirm("Impor semua artikel dari Blogspot ke Firestore sekarang?")) return;
    setIsImporting(true);
    try {
      const res = await fetch("/api/import-blogger", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || `Berhasil mengimpor ${data.importedCount} artikel dari Blogspot!`);
        await loadData();
      } else {
        showToast(data.message || data.error || "Gagal mengimpor artikel", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Terjadi kesalahan saat mengimpor dari Blogspot", "error");
    } finally {
      setIsImporting(false);
    }
  };

  // Load initial data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pkgs, acts, arts, logs] = await Promise.all([
        getTourPackages(),
        getActivities(),
        getArticles(true),
        getLoginLogs(100),
      ]);
      setPackages(pkgs);
      setActivities(acts);
      setArticles(arts);
      setLoginLogs(logs);
    } catch (err) {
      console.error("Gagal memuat data:", err);
      showToast("Gagal memuat data dari database", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshLogs = async () => {
    try {
      const logs = await getLoginLogs(100);
      setLoginLogs(logs);
      showToast("Log percobaan login diperbarui!");
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui log login", "error");
    }
  };

  const handleClearLogs = async () => {
    if (!confirm("Hapus semua riwayat log percobaan login?")) return;
    try {
      await clearLoginLogs();
      setLoginLogs([]);
      showToast("Riwayat log berhasil dibersihkan!");
    } catch (err) {
      console.error(err);
      showToast("Gagal membersihkan log", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ------------------------------------------------------------------
  // PAKET WISATA HANDLERS
  // ------------------------------------------------------------------
  const handleOpenNewPackage = () => {
    setEditingPackage({
      id: "",
      slug: "",
      title: "",
      duration: "3 Hari 2 Malam",
      desc: "",
      img: "/images/3h2mhotel.jpg",
      price: "Mulai Rp 1.500.000",
      order: packages.length + 1,
      isActive: true,
    });
    setIsPkgModalOpen(true);
  };

  const handleEditPackage = (pkg: TourPackageItem) => {
    setEditingPackage({ ...pkg });
    setIsPkgModalOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    if (!editingPackage.title || !editingPackage.slug) {
      showToast("Judul dan slug wajib diisi!", "error");
      return;
    }

    setIsSaving(true);
    try {
      await saveTourPackage(editingPackage);
      showToast("Card paket wisata berhasil disimpan!");
      setIsPkgModalOpen(false);
      setEditingPackage(null);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan paket wisata", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket ini?")) return;
    try {
      await deleteTourPackage(id);
      showToast("Paket wisata berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus paket", "error");
    }
  };

  const handleSeedPackages = async () => {
    if (!confirm("Muat data default paket wisata ke database?")) return;
    setIsSaving(true);
    try {
      await seedDefaultPackages();
      showToast("Data default paket berhasil dimuat!");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data default", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // ------------------------------------------------------------------
  // AKTIVITAS HANDLERS
  // ------------------------------------------------------------------
  const handleOpenNewActivity = () => {
    setEditingActivity({
      id: "",
      slug: "",
      title: "",
      desc: "",
      img: "/images/island-hopping.png",
      priceLabel: "Mulai 200K",
      order: activities.length + 1,
      isActive: true,
    });
    setIsActModalOpen(true);
  };

  const handleEditActivity = (act: ActivityItem) => {
    setEditingActivity({ ...act });
    setIsActModalOpen(true);
  };

  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;
    if (!editingActivity.title || !editingActivity.slug) {
      showToast("Judul dan slug aktivitas wajib diisi!", "error");
      return;
    }

    setIsSaving(true);
    try {
      await saveActivity(editingActivity);
      showToast("Card aktivitas berhasil disimpan!");
      setIsActModalOpen(false);
      setEditingActivity(null);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan aktivitas", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm("Hapus aktivitas ini?")) return;
    try {
      await deleteActivity(id);
      showToast("Aktivitas berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus aktivitas", "error");
    }
  };

  const handleSeedActivities = async () => {
    if (!confirm("Muat data default aktivitas ke database?")) return;
    setIsSaving(true);
    try {
      await seedDefaultActivities();
      showToast("Data default aktivitas berhasil dimuat!");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data default", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // ------------------------------------------------------------------
  // ARTIKEL / BLOG HANDLERS
  // ------------------------------------------------------------------
  const handleOpenNewArticle = () => {
    setEditingArticle({
      id: "",
      slug: "",
      title: "",
      excerpt: "",
      content: "<p>Mulai menulis cerita liburan, tips, atau panduan Karimunjawa di sini...</p>",
      featuredImage: "/images/satu.png",
      tags: ["Karimunjawa", "Tips Wisata"],
      status: "published",
      date: new Date().toISOString(),
    });
    setIsArticleEditing(true);
  };

  const handleEditArticle = (art: ArticleItem) => {
    setEditingArticle({ ...art });
    setIsArticleEditing(true);
  };

  const handleSaveArticle = async (statusOverride?: "published" | "draft") => {
    if (!editingArticle) return;
    if (!editingArticle.title.trim()) {
      showToast("Judul artikel tidak boleh kosong!", "error");
      return;
    }

    const toSave: ArticleItem = {
      ...editingArticle,
      status: statusOverride || editingArticle.status,
    };

    setIsSaving(true);
    try {
      await saveArticle(toSave);
      showToast(
        toSave.status === "published"
          ? "Artikel berhasil diterbitkan ke Firestore!"
          : "Draft artikel berhasil disimpan!"
      );
      setIsArticleEditing(false);
      setEditingArticle(null);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan artikel", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    try {
      await deleteArticle(id);
      showToast("Artikel berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus artikel", "error");
    }
  };

  const handleAutoSlug = (title: string) => {
    if (!editingArticle) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setEditingArticle({ ...editingArticle, title, slug: generated });
  };

  return (
    <div>
      {/* Notification Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            padding: "12px 20px",
            borderRadius: 8,
            color: "#ffffff",
            background: toastType === "success" ? "#10b981" : "#ef4444",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <span>{toastType === "success" ? "✓" : "⚠"}</span>
          {toastMessage}
        </div>
      )}

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: 10,
          borderBottom: "2px solid #e2e8f0",
          marginBottom: 24,
          paddingBottom: 2,
          overflowX: "auto",
        }}
      >
        <button
          onClick={() => {
            setActiveTab("packages");
            setIsArticleEditing(false);
          }}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "packages" ? "3px solid #033D4A" : "3px solid transparent",
            color: activeTab === "packages" ? "#033D4A" : "#64748b",
            fontWeight: activeTab === "packages" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span>📦</span> Paket Wisata ({packages.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("activities");
            setIsArticleEditing(false);
          }}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "activities" ? "3px solid #033D4A" : "3px solid transparent",
            color: activeTab === "activities" ? "#033D4A" : "#64748b",
            fontWeight: activeTab === "activities" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span>🏄</span> Aktivitas ({activities.length})
        </button>

        <button
          onClick={() => setActiveTab("articles")}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "articles" ? "3px solid #033D4A" : "3px solid transparent",
            color: activeTab === "articles" ? "#033D4A" : "#64748b",
            fontWeight: activeTab === "articles" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span>✍️</span> Artikel Blog ({articles.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("logs");
            setIsArticleEditing(false);
          }}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "logs" ? "3px solid #033D4A" : "3px solid transparent",
            color: activeTab === "logs" ? "#033D4A" : "#64748b",
            fontWeight: activeTab === "logs" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span>🛡️</span> Log Login ({loginLogs.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("settings");
            setIsArticleEditing(false);
          }}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "settings" ? "3px solid #033D4A" : "3px solid transparent",
            color: activeTab === "settings" ? "#033D4A" : "#64748b",
            fontWeight: activeTab === "settings" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span>⚙️</span> Pengaturan Firestore
        </button>
      </div>

      {isLoading ? (
        <div style={{ padding: 60, textAlign: "center", color: "#64748b" }}>
          <p style={{ fontSize: 16 }}>Memuat data dari database...</p>
        </div>
      ) : (
        <>
          {/* =================================================================== */}
          {/* TAB 1: PAKET WISATA */}
          {/* =================================================================== */}
          {activeTab === "packages" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#033D4A" }}>
                    Kelola Card Paket Wisata
                  </h2>
                  <p style={{ fontSize: 13, color: "#64748b" }}>
                    Edit harga, badge, gambar, dan deskripsi paket wisata yang ditampilkan di beranda.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={handleSeedPackages}
                    disabled={isSaving}
                    style={{
                      padding: "8px 14px",
                      background: "#f1f5f9",
                      color: "#334155",
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ↺ Reset Default
                  </button>
                  <button
                    onClick={handleOpenNewPackage}
                    style={{
                      padding: "8px 16px",
                      background: "#033D4A",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Tambah Paket
                  </button>
                </div>
              </div>

              {/* Grid Cards Paket Wisata */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ position: "relative", height: 170, width: "100%", background: "#e2e8f0" }}>
                      <img
                        src={pkg.img || "/images/satu.png"}
                        alt={pkg.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src = "/images/satu.png";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#033D4A",
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 999,
                        }}
                      >
                        {pkg.price}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          background: "rgba(0,0,0,0.6)",
                          color: "#ffffff",
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 4,
                        }}
                      >
                        🗓️ {pkg.duration}
                      </div>
                    </div>

                    <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#033D4A" }}>
                          {pkg.title}
                        </h3>
                        <span
                          style={{
                            fontSize: 11,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: pkg.isActive ? "#dcfce7" : "#fee2e2",
                            color: pkg.isActive ? "#166534" : "#991b1b",
                            fontWeight: 600,
                          }}
                        >
                          {pkg.isActive ? "Aktif" : "Non-aktif"}
                        </span>
                      </div>
                      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
                        Slug: <code>/paket/{pkg.slug}</code>
                      </p>
                      <p style={{ fontSize: 13, color: "#475569", flex: 1, marginBottom: 16, lineHeight: 1.5 }}>
                        {pkg.desc}
                      </p>

                      <div style={{ display: "flex", gap: 8, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                        <button
                          onClick={() => handleEditPackage(pkg)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            background: "#f8fafc",
                            color: "#033D4A",
                            border: "1px solid #cbd5e1",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✏️ Edit Card
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          style={{
                            padding: "8px 12px",
                            background: "#fee2e2",
                            color: "#ef4444",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: AKTIVITAS */}
          {/* =================================================================== */}
          {activeTab === "activities" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#033D4A" }}>
                    Kelola Card Aktivitas Seru
                  </h2>
                  <p style={{ fontSize: 13, color: "#64748b" }}>
                    Atur daftar aktivitas (One Day Trip, Diving, Sewa Motor, dll) yang muncul di website.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={handleSeedActivities}
                    disabled={isSaving}
                    style={{
                      padding: "8px 14px",
                      background: "#f1f5f9",
                      color: "#334155",
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ↺ Reset Default
                  </button>
                  <button
                    onClick={handleOpenNewActivity}
                    style={{
                      padding: "8px 16px",
                      background: "#033D4A",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Tambah Aktivitas
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                {activities.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ position: "relative", height: 170, width: "100%", background: "#e2e8f0" }}>
                      <img
                        src={act.img || "/images/satu.png"}
                        alt={act.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src = "/images/satu.png";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#60C0D8",
                          color: "#033D4A",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 999,
                        }}
                      >
                        {act.priceLabel}
                      </div>
                    </div>

                    <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#033D4A", marginBottom: 4 }}>
                        {act.title}
                      </h3>
                      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
                        Slug: <code>/aktivitas/{act.slug}</code>
                      </p>
                      <p style={{ fontSize: 13, color: "#475569", flex: 1, marginBottom: 16, lineHeight: 1.5 }}>
                        {act.desc}
                      </p>

                      <div style={{ display: "flex", gap: 8, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                        <button
                          onClick={() => handleEditActivity(act)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            background: "#f8fafc",
                            color: "#033D4A",
                            border: "1px solid #cbd5e1",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✏️ Edit Aktivitas
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(act.id)}
                          style={{
                            padding: "8px 12px",
                            background: "#fee2e2",
                            color: "#ef4444",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: EDITOR ARTIKEL */}
          {/* =================================================================== */}
          {activeTab === "articles" && (
            <div>
              {!isArticleEditing ? (
                // Article List View
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#033D4A" }}>
                        Manajemen Artikel Blog
                      </h2>
                      <p style={{ fontSize: 13, color: "#64748b" }}>
                        Tulis artikel baru menggunakan Tiptap Rich Text Editor dan simpan ke Cloud Firestore.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={handleImportFromBlogger}
                        disabled={isImporting || isSaving}
                        style={{
                          padding: "10px 16px",
                          background: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #cbd5e1",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {isImporting ? "Mengimpor..." : "📥 Impor dari Blogspot"}
                      </button>
                      <button
                        onClick={handleOpenNewArticle}
                        style={{
                          padding: "10px 18px",
                          background: "#033D4A",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        ✍️ Tulis Artikel Baru
                      </button>
                    </div>
                  </div>

                  {articles.length === 0 ? (
                    <div
                      style={{
                        background: "#ffffff",
                        borderRadius: 12,
                        padding: 40,
                        textAlign: "center",
                        border: "1px dashed #cbd5e1",
                      }}
                    >
                      <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#033D4A", marginBottom: 6 }}>
                        Belum ada artikel yang tersimpan di Firestore
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                        Mulai tulis artikel panduan atau cerita wisata Karimunjawa pertamamu sekarang.
                      </p>
                      <button
                        onClick={handleOpenNewArticle}
                        style={{
                          padding: "8px 16px",
                          background: "#033D4A",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        + Buat Artikel Baru
                      </button>
                    </div>
                  ) : (
                    <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                            <th style={{ padding: "12px 16px", color: "#475569", fontWeight: 600 }}>Judul Artikel</th>
                            <th style={{ padding: "12px 16px", color: "#475569", fontWeight: 600 }}>Slug URL</th>
                            <th style={{ padding: "12px 16px", color: "#475569", fontWeight: 600 }}>Tanggal</th>
                            <th style={{ padding: "12px 16px", color: "#475569", fontWeight: 600 }}>Status</th>
                            <th style={{ padding: "12px 16px", color: "#475569", fontWeight: 600, textAlign: "right" }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {articles.map((art) => (
                            <tr key={art.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ fontWeight: 600, color: "#033D4A" }}>{art.title}</div>
                                <div style={{ fontSize: 11, color: "#94a3b8" }}>{art.excerpt?.slice(0, 70)}...</div>
                              </td>
                              <td style={{ padding: "12px 16px", color: "#64748b" }}>
                                <code>/artikel/{art.slug}</code>
                              </td>
                              <td style={{ padding: "12px 16px", color: "#64748b" }}>
                                {new Date(art.date).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                <span
                                  style={{
                                    fontSize: 11,
                                    padding: "2px 8px",
                                    borderRadius: 999,
                                    fontWeight: 600,
                                    background: art.status === "published" ? "#dcfce7" : "#fef3c7",
                                    color: art.status === "published" ? "#166534" : "#92400e",
                                  }}
                                >
                                  {art.status === "published" ? "Published" : "Draft"}
                                </span>
                              </td>
                              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                <button
                                  onClick={() => handleEditArticle(art)}
                                  style={{
                                    padding: "6px 12px",
                                    background: "#f1f5f9",
                                    color: "#033D4A",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    marginRight: 6,
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(art.id)}
                                  style={{
                                    padding: "6px 10px",
                                    background: "#fee2e2",
                                    color: "#ef4444",
                                    border: "none",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    cursor: "pointer",
                                  }}
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                // Article Editor Form (Tiptap Editor)
                editingArticle && (
                  <div style={{ background: "#ffffff", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <button
                        type="button"
                        onClick={() => setIsArticleEditing(false)}
                        style={{
                          padding: "6px 12px",
                          background: "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          borderRadius: 6,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        ← Kembali ke Daftar Artikel
                      </button>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          type="button"
                          onClick={() => handleSaveArticle("draft")}
                          disabled={isSaving}
                          style={{
                            padding: "8px 16px",
                            background: "#f8fafc",
                            color: "#334155",
                            border: "1px solid #cbd5e1",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Simpan Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveArticle("published")}
                          disabled={isSaving}
                          style={{
                            padding: "8px 20px",
                            background: "#033D4A",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {isSaving ? "Menyimpan..." : "🚀 Publikasikan"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
                      {/* Left: Main Writing Area */}
                      <div>
                        <div style={{ marginBottom: 16 }}>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                            Judul Artikel
                          </label>
                          <input
                            type="text"
                            value={editingArticle.title}
                            onChange={(e) => handleAutoSlug(e.target.value)}
                            placeholder="Contoh: 7 Spot Snorkeling Terbaik di Karimunjawa"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              fontSize: 18,
                              fontWeight: 700,
                              borderRadius: 8,
                              border: "1px solid #cbd5e1",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                            Isi Artikel (Rich Text Editor - Tiptap)
                          </label>
                          <TiptapEditor
                            value={editingArticle.content}
                            onChange={(html) =>
                              setEditingArticle((prev) => (prev ? { ...prev, content: html } : prev))
                            }
                          />
                        </div>
                      </div>

                      {/* Right: Metadata Panel */}
                      <div>
                        <div style={{ background: "#f8fafc", borderRadius: 12, padding: 18, border: "1px solid #e2e8f0" }}>
                          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#033D4A", marginBottom: 14 }}>
                            Pengaturan Publikasi
                          </h4>

                          <div style={{ marginBottom: 14 }}>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                              Slug URL
                            </label>
                            <input
                              type="text"
                              value={editingArticle.slug}
                              onChange={(e) =>
                                setEditingArticle({ ...editingArticle, slug: e.target.value })
                              }
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                fontSize: 12,
                                borderRadius: 6,
                                border: "1px solid #cbd5e1",
                              }}
                            />
                            <span style={{ fontSize: 11, color: "#94a3b8" }}>
                              URL: /artikel/{editingArticle.slug}
                            </span>
                          </div>

                          <div style={{ marginBottom: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                              <label style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>
                                🔍 Deskripsi Penelusuran (SEO Meta)
                              </label>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: (editingArticle.excerpt?.length || 0) > 160 ? "#ef4444" : "#64748b",
                                }}
                              >
                                {editingArticle.excerpt?.length || 0}/160
                              </span>
                            </div>
                            <textarea
                              rows={3}
                              value={editingArticle.excerpt}
                              onChange={(e) =>
                                setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                              }
                              placeholder="Deskripsi penelusuran untuk Google Search snippet dan ringkasan card..."
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                fontSize: 12,
                                borderRadius: 6,
                                border: "1px solid #cbd5e1",
                                lineHeight: 1.4,
                              }}
                            />
                            <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                              Digunakan sebagai <b>Google Meta Description</b> &amp; ringkasan artikel. (Ideal: 120-160 karakter).
                            </p>

                            {/* Google Search Snippet Preview */}
                            <div
                              style={{
                                marginTop: 10,
                                padding: 10,
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: 8,
                                fontSize: 11,
                              }}
                            >
                              <div style={{ color: "#202124", fontSize: 10, marginBottom: 2 }}>
                                https://karimunjawa.tours &gt; artikel &gt; {editingArticle.slug || "slug-artikel"}
                              </div>
                              <div style={{ color: "#1a0dab", fontWeight: 600, fontSize: 13, marginBottom: 2, lineHeight: 1.2 }}>
                                {editingArticle.title || "Judul Artikel Anda"} - Karimunjawa Tours
                              </div>
                              <div style={{ color: "#4d5156", fontSize: 11, lineHeight: 1.3 }}>
                                {editingArticle.excerpt || "Tulis deskripsi penelusuran di atas untuk melihat bagaimana cuplikan artikel Anda tampil di Google Search..."}
                              </div>
                            </div>
                          </div>

                          <div style={{ marginBottom: 14 }}>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                              URL Foto Utama (Featured Image)
                            </label>
                            <input
                              type="text"
                              value={editingArticle.featuredImage || ""}
                              onChange={(e) =>
                                setEditingArticle({ ...editingArticle, featuredImage: e.target.value })
                              }
                              placeholder="/images/satu.png atau https://..."
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                fontSize: 12,
                                borderRadius: 6,
                                border: "1px solid #cbd5e1",
                              }}
                            />
                            {editingArticle.featuredImage && (
                              <div style={{ marginTop: 8, height: 120, borderRadius: 6, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                                <img
                                  src={editingArticle.featuredImage}
                                  alt="Preview"
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  onError={(e) => {
                                    e.currentTarget.src = "/images/satu.png";
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div style={{ marginBottom: 14 }}>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                              Status Artikel
                            </label>
                            <select
                              value={editingArticle.status}
                              onChange={(e) =>
                                setEditingArticle({
                                  ...editingArticle,
                                  status: e.target.value as "published" | "draft",
                                })
                              }
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                fontSize: 12,
                                borderRadius: 6,
                                border: "1px solid #cbd5e1",
                                background: "#ffffff",
                              }}
                            >
                              <option value="published">🚀 Published (Tayang)</option>
                              <option value="draft">📁 Draft (Simpan Rahasia)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: LOG PERCOBAAN LOGIN */}
          {/* =================================================================== */}
          {activeTab === "logs" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#033D4A" }}>
                    🛡️ Log Percobaan Login Admin
                  </h2>
                  <p style={{ fontSize: 13, color: "#64748b" }}>
                    Pantau siapa saja yang mencoba masuk ke Admin Panel. Percobaan dengan email yang tidak terdaftar otomatis diblokir.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={handleRefreshLogs}
                    style={{
                      padding: "8px 14px",
                      background: "#f1f5f9",
                      color: "#334155",
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    🔄 Refresh
                  </button>
                  {loginLogs.length > 0 && (
                    <button
                      onClick={handleClearLogs}
                      style={{
                        padding: "8px 14px",
                        background: "#fee2e2",
                        color: "#ef4444",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      🗑️ Bersihkan Riwayat
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Summary Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Total Percobaan</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#033D4A", marginTop: 4 }}>{loginLogs.length}</div>
                </div>
                <div style={{ background: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>Login Berhasil</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#16a34a", marginTop: 4 }}>
                    {loginLogs.filter((l) => l.status === "success").length}
                  </div>
                </div>
                <div style={{ background: "#ffffff", padding: "16px 20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#991b1b", fontWeight: 600, textTransform: "uppercase" }}>Akses Diblokir</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#ef4444", marginTop: 4 }}>
                    {loginLogs.filter((l) => l.status === "blocked").length}
                  </div>
                </div>
              </div>

              {/* Log Table / List */}
              {loginLogs.length === 0 ? (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    padding: 48,
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#033D4A", marginBottom: 4 }}>
                    Belum Ada Log Login
                  </h3>
                  <p style={{ fontSize: 13 }}>
                    Setiap percobaan login (berhasil maupun gagal) akan dicatat dan muncul di sini secara otomatis.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#475569" }}>PENGGUNA</th>
                        <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#475569" }}>STATUS</th>
                        <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#475569" }}>KETERANGAN</th>
                        <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#475569" }}>WAKTU PERCOBAAN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loginLogs.map((log, idx) => {
                        const isSuccess = log.status === "success";
                        const dateFormatted = log.timestamp
                          ? new Date(log.timestamp).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                          : "-";

                        return (
                          <tr
                            key={log.id || idx}
                            style={{
                              borderBottom: "1px solid #f1f5f9",
                              background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                            }}
                          >
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                {log.image ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={log.image}
                                    alt={log.name || log.email}
                                    width={32}
                                    height={32}
                                    style={{ borderRadius: "50%", border: "1px solid #e2e8f0" }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: "50%",
                                      background: isSuccess ? "#dcfce7" : "#fee2e2",
                                      color: isSuccess ? "#166534" : "#991b1b",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 700,
                                      fontSize: 13,
                                    }}
                                  >
                                    {(log.name || log.email || "?").charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>
                                    {log.name || "Google User"}
                                  </div>
                                  <div style={{ fontSize: 12, color: "#64748b" }}>
                                    {log.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td style={{ padding: "14px 16px" }}>
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  padding: "4px 10px",
                                  borderRadius: 999,
                                  background: isSuccess ? "#dcfce7" : "#fee2e2",
                                  color: isSuccess ? "#166534" : "#991b1b",
                                }}
                              >
                                <span>{isSuccess ? "●" : "✕"}</span>
                                {isSuccess ? "Berhasil Masuk" : "Akses Ditolak"}
                              </span>
                            </td>

                            <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>
                              {log.reason || "-"}
                            </td>

                            <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                              📅 {dateFormatted} WIB
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 5: PENGATURAN FIRESTORE */}
          {/* =================================================================== */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: 800 }}>
              <div style={{ background: "#ffffff", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0", marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#033D4A", marginBottom: 8 }}>
                  Status Koneksi Cloud Firestore
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 20px",
                    borderRadius: 8,
                    background: isFirebaseConfigured() ? "#f0fdf4" : "#fffbeb",
                    border: `1px solid ${isFirebaseConfigured() ? "#bbf7d0" : "#fef3c7"}`,
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{isFirebaseConfigured() ? "✅" : "⚠️"}</span>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: isFirebaseConfigured() ? "#166534" : "#92400e" }}>
                      {isFirebaseConfigured()
                        ? "Firebase Firestore Terhubung Aktif"
                        : "Firebase Belum Dikonfigurasi (Berjalan di Mode Offline / Local)"}
                    </h4>
                    <p style={{ fontSize: 12, color: isFirebaseConfigured() ? "#15803d" : "#b45309" }}>
                      {isFirebaseConfigured()
                        ? `Project ID: ${firebaseConfig.projectId || "Tidak terdeteksi"}`
                        : "Semua data yang Anda edit saat ini tersimpan sementara di Local Storage browser Anda. Agar data tersimpan online di cloud untuk semua pengunjung website, silakan hubungkan Firestore."}
                    </p>
                  </div>
                </div>

                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#033D4A", marginBottom: 10 }}>
                  Cara Menghubungkan ke Firebase Anda:
                </h4>
                <ol style={{ fontSize: 13, color: "#475569", lineHeight: 1.8, paddingLeft: 20, marginBottom: 20 }}>
                  <li>Buka <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: "#0077b6", fontWeight: 600 }}>Firebase Console</a> dan pilih / buat project baru.</li>
                  <li>Buka menu <b>Firestore Database</b> &gt; klik <b>Create Database</b> (pilih mode <i>Production</i> atau <i>Test mode</i>).</li>
                  <li>Buka <b>Project Settings</b> (ikon roda gigi) &gt; bagian <b>Your apps</b> &gt; buat Web App <code>&lt;/&gt;</code>.</li>
                  <li>Salin konfigurasi Firebase ke dalam file <code>.env.local</code> di folder proyek ini:</li>
                </ol>

                <div style={{ background: "#0f172a", color: "#f8fafc", padding: 16, borderRadius: 8, fontSize: 12, overflowX: "auto", fontFamily: "monospace", marginBottom: 20 }}>
                  <pre>{`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...

NEXT_PUBLIC_ADMIN_PIN=123456`}</pre>
                </div>

                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#033D4A", marginBottom: 10 }}>
                  Inisialisasi Data Cepat (Bulk Seed)
                </h4>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14 }}>
                  Jika Firestore baru saja dihubungkan dan database masih kosong, klik tombol di bawah untuk menyalin seluruh data bawaan (6 paket wisata &amp; 3 aktivitas) ke Firestore dalam 1 kali klik.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    onClick={async () => {
                      if (!confirm("Salin seluruh data awal paket wisata dan aktivitas ke Firestore?")) return;
                      setIsSaving(true);
                      try {
                        await seedDefaultPackages();
                        await seedDefaultActivities();
                        showToast("Semua data paket dan aktivitas berhasil disalin ke Firestore!");
                        await loadData();
                      } catch (err) {
                        console.error(err);
                        showToast("Gagal melakukan inisialisasi bulk", "error");
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving || isImporting}
                    style={{
                      padding: "10px 20px",
                      background: "#033D4A",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ⚡ Seed Paket &amp; Aktivitas ke Firestore
                  </button>

                  <button
                    onClick={handleImportFromBlogger}
                    disabled={isSaving || isImporting}
                    style={{
                      padding: "10px 20px",
                      background: "#60C0D8",
                      color: "#033D4A",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isImporting ? "Mengimpor Artikel..." : "📥 Impor Semua Artikel Blogspot ke Firestore"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* =================================================================== */}
      {/* MODAL EDIT / TAMBAH PAKET WISATA */}
      {/* =================================================================== */}
      {isPkgModalOpen && editingPackage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              maxWidth: 720,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#033D4A" }}>
                {editingPackage.id ? "Edit Card Paket Wisata" : "Tambah Paket Wisata Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsPkgModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Judul Paket
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPackage.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug =
                        editingPackage.slug ||
                        title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "");
                      setEditingPackage({ ...editingPackage, title, slug });
                    }}
                    placeholder="Contoh: 3 Hari 2 Malam Hotel"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Slug URL
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPackage.slug}
                    onChange={(e) => setEditingPackage({ ...editingPackage, slug: e.target.value })}
                    placeholder="3h2m-hotel"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Durasi
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPackage.duration}
                    onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                    placeholder="3 Hari 2 Malam"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Label Badge / Harga
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                    placeholder="Mulai Rp 1.700.000"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  URL Gambar Cover
                </label>
                <input
                  type="text"
                  required
                  value={editingPackage.img}
                  onChange={(e) => setEditingPackage({ ...editingPackage, img: e.target.value })}
                  placeholder="/images/3h2mhotel.jpg atau https://..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Deskripsi Singkat Card
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingPackage.desc}
                  onChange={(e) => setEditingPackage({ ...editingPackage, desc: e.target.value })}
                  placeholder="Deskripsi singkat yang tampil di card beranda..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={editingPackage.order}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, order: parseInt(e.target.value) || 1 })
                    }
                    style={{ width: 80, padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
                  <input
                    type="checkbox"
                    id="pkgActive"
                    checked={editingPackage.isActive}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, isActive: e.target.checked })
                    }
                    style={{ width: 18, height: 18, accentColor: "#033D4A" }}
                  />
                  <label htmlFor="pkgActive" style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                    Tampilkan di Website (Aktif)
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setIsPkgModalOpen(false)}
                  style={{
                    padding: "10px 16px",
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    padding: "10px 20px",
                    background: "#033D4A",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL EDIT / TAMBAH AKTIVITAS */}
      {/* =================================================================== */}
      {isActModalOpen && editingActivity && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              maxWidth: 680,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#033D4A" }}>
                {editingActivity.id ? "Edit Card Aktivitas" : "Tambah Aktivitas Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsActModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveActivity}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Judul Aktivitas
                  </label>
                  <input
                    type="text"
                    required
                    value={editingActivity.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug =
                        editingActivity.slug ||
                        title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "");
                      setEditingActivity({ ...editingActivity, title, slug });
                    }}
                    placeholder="Contoh: One Day Trip"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Slug URL
                  </label>
                  <input
                    type="text"
                    required
                    value={editingActivity.slug}
                    onChange={(e) => setEditingActivity({ ...editingActivity, slug: e.target.value })}
                    placeholder="one-day-trip"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Label Harga Badge
                </label>
                <input
                  type="text"
                  required
                  value={editingActivity.priceLabel}
                  onChange={(e) => setEditingActivity({ ...editingActivity, priceLabel: e.target.value })}
                  placeholder="Contoh: Mulai 200K"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  URL Gambar
                </label>
                <input
                  type="text"
                  required
                  value={editingActivity.img}
                  onChange={(e) => setEditingActivity({ ...editingActivity, img: e.target.value })}
                  placeholder="/images/island-hopping.png atau https://..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Deskripsi Aktivitas
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingActivity.desc}
                  onChange={(e) => setEditingActivity({ ...editingActivity, desc: e.target.value })}
                  placeholder="Deskripsi ringkas aktivitas..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Urutan
                  </label>
                  <input
                    type="number"
                    value={editingActivity.order}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, order: parseInt(e.target.value) || 1 })
                    }
                    style={{ width: 80, padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
                  <input
                    type="checkbox"
                    id="actActive"
                    checked={editingActivity.isActive}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, isActive: e.target.checked })
                    }
                    style={{ width: 18, height: 18, accentColor: "#033D4A" }}
                  />
                  <label htmlFor="actActive" style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                    Tampilkan di Website (Aktif)
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setIsActModalOpen(false)}
                  style={{
                    padding: "10px 16px",
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    padding: "10px 20px",
                    background: "#033D4A",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isSaving ? "Menyimpan..." : "Simpan Aktivitas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
