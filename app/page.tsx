'use client';

import React, { useState, useEffect } from "react";
import { Settings, ExternalLink, Trash2, Edit3, ShoppingBag, Check, X, MapPin, Compass, Star, MessageSquare, Send, Plus } from "lucide-react";

/* ============ TYPES ============ */
interface ProductItem { id: string; title: string; description: string; price: string; originalPrice: string; images: string[]; affiliateUrl: string; category: string; }
interface BannerSlide { image: string; title: string; subtitle: string; }
interface HangoutSpot { id: string; name: string; location: string; description: string; image: string; mapUrl: string; }
interface ReviewItem { id: string; name: string; rating: number; comment: string; city: string; }
interface RequestItem { id: string; name: string; message: string; date: string; }
interface CustomTheme { pageBg: string; headerBg: string; cardBg: string; textColor: string; primaryColor: string; buttonBg: string; buttonText: string; }
interface ProfileData { name: string; handle: string; bio: string; banners: BannerSlide[]; followersCount: number; profileImage: string; catalogTitle: string; hangoutSectionTitle: string; theme: CustomTheme; }
interface SiteData { profile: ProfileData; products: ProductItem[]; hangouts: HangoutSpot[]; requests: RequestItem[]; }

/* ============ TEMA ============ */
const t = (pageBg: string, headerBg: string, cardBg: string, textColor: string, primaryColor: string, buttonText = "#ffffff"): CustomTheme =>
  ({ pageBg, headerBg, cardBg, textColor, primaryColor, buttonBg: primaryColor, buttonText });

const THEME_GROUPS: { group: string; items: { name: string; theme: CustomTheme }[] }[] = [
  {
    group: "Estetik",
    items: [
      { name: "🍊 Shopee Orange", theme: t("#fff7ed", "#ffffff", "#ffffff", "#1f2937", "#ea580c") },
      { name: "💜 Pastel Lavender", theme: t("#f5f3ff", "#ede9fe", "#ffffff", "#3b0764", "#8b5cf6") },
      { name: "🌿 Sage Green", theme: t("#f3f6f1", "#e4ebe0", "#ffffff", "#1f2d1f", "#6b8f71") },
      { name: "🍑 Sunset Peach", theme: t("#fff1eb", "#ffe4d6", "#ffffff", "#4a2418", "#f08a6c") },
      { name: "🌊 Ocean Breeze", theme: t("#ecfeff", "#cffafe", "#ffffff", "#083344", "#0891b2") },
      { name: "🍬 Cotton Candy", theme: t("#fdf2f8", "#fce7f3", "#ffffff", "#500724", "#ec4899") },
      { name: "☕ Coffee Latte", theme: t("#f7f0e8", "#ebdccb", "#fffaf4", "#3e2723", "#8d6e63") },
      { name: "🤍 Minimal Mono", theme: t("#ffffff", "#ffffff", "#f5f5f5", "#171717", "#171717") },
      { name: "🌙 Dark Emerald", theme: t("#030712", "#111827", "#1f2937", "#f3f4f6", "#10b981", "#030712") },
      { name: "🔮 Midnight Neon", theme: t("#0f0a1f", "#1a1033", "#241848", "#f5f3ff", "#c084fc", "#0f0a1f") },
    ],
  },
  {
    group: "Hari Besar",
    items: [
      { name: "🌙 Ramadan & Lebaran", theme: t("#f0fdf4", "#dcfce7", "#ffffff", "#052e16", "#15803d") },
      { name: "🎄 Natal", theme: t("#fef2f2", "#fee2e2", "#ffffff", "#14532d", "#b91c1c") },
      { name: "🎆 Tahun Baru", theme: t("#0b0b14", "#15151f", "#1e1e2c", "#fef9c3", "#facc15", "#0b0b14") },
      { name: "🧧 Imlek", theme: t("#fff1f2", "#ffe4e6", "#ffffff", "#450a0a", "#dc2626") },
      { name: "🇮🇩 17 Agustus", theme: t("#fff5f5", "#ffffff", "#ffffff", "#1f2937", "#e11d2e") },
      { name: "💝 Valentine", theme: t("#fff0f3", "#ffe0e7", "#ffffff", "#4c0519", "#e11d48") },
      { name: "🎃 Halloween", theme: t("#140c04", "#1f1408", "#2b1c0c", "#ffedd5", "#f97316", "#140c04") },
      { name: "🛒 Harbolnas 12.12", theme: t("#fff7ed", "#ffedd5", "#ffffff", "#7c2d12", "#f97316") },
    ],
  },
];

/* ============ DEFAULT DATA ============ */
const DEFAULT_SITE: SiteData = {
  profile: {
    name: "Info Jajanan & Kuliner Hits",
    handle: "@jajandulu.ye",
    bio: "📍 Jajanan gurih, manis, sampe pedas ada di sini\nRekomendasi jajan budget Mahasiswa & Pelajar.\n100% anti zonk\n👇 Cek produk rekomendasi pilihan kita di bawah",
    banners: [
      { image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80", title: "PROMO MAKANAN & SNACK TERLENGKAP", subtitle: "Diskon spesial jajan hemat tiap hari untuk seluruh netizen" },
      { image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1600&q=80", title: "CHILI OIL & BUMBU PEDAS PILIHAN", subtitle: "Sensasi gurih nagih anti zonk jamin puas" },
    ],
    followersCount: 586,
    profileImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    catalogTitle: "Katalog Rekomendasi Shopee Affiliate",
    hangoutSectionTitle: "📍 Tempat Nongkrong Hits",
    theme: THEME_GROUPS[0].items[0].theme,
  },
  products: [
    { id: "1", title: "Minyak Chili Oil Extra Pedas Gurih 200ml", description: "Cocok untuk dimsum, mie instan, dan bakso aci. Mantap kuahnya!", price: "Rp 18.500", originalPrice: "Rp 30.000", images: ["https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Kuliner" },
    { id: "2", title: "Keripik Usus Crispy Daun Jeruk Renyah", description: "Gurih nagih, tidak bau amis, bumbu melimpah.", price: "Rp 12.000", originalPrice: "Rp 20.000", images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Cemilan" },
    { id: "3", title: "Seblak Instan Kuah Pedas Daun Jeruk Rempah", description: "Lengkap dengan kerupuk, siomay mini, batagor kering, dan bumbu cikur khas.", price: "Rp 15.000", originalPrice: "Rp 25.000", images: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Kuliner" },
    { id: "4", title: "Baso Aci Tulang Rangu Kuah Kaldu Sapi", description: "Kenyal mantap berasa daging sapinya dengan jeruk limau segar.", price: "Rp 22.000", originalPrice: "Rp 35.000", images: ["https://images.unsplash.com/photo-1606787366850-de63301c7bfc?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Kuliner" },
    { id: "5", title: "Makaroni Spiral Pedas Daun Jeruk Extra Hot", description: "Digoreng renyah matang merata, bumbu cabai murni bikin ketagihan.", price: "Rp 10.000", originalPrice: "Rp 18.000", images: ["https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Cemilan" },
    { id: "6", title: "Dimsum Ayam Mentai Mozzarella Lumer", description: "Isi 10 pcs besar dengan saus mentai creamy dan keju leleh di atasnya.", price: "Rp 32.000", originalPrice: "Rp 45.000", images: ["https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "https://shopee.co.id", category: "Kuliner" },
  ],
  hangouts: [
    { id: "h1", name: "Kedai Kopi Senja Serpong", location: "Gading Serpong, Tangerang", description: "Nongkrong cozy outdoor, live music tiap akhir pekan.", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", mapUrl: "https://maps.google.com" },
    { id: "h2", name: "Pasar Modern Paramount Kuliner Malam", location: "Gading Serpong, Tangerang", description: "Surga jajanan malam, dari makanan berat sampai dessert.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", mapUrl: "https://maps.google.com" },
    { id: "h3", name: "Scientia Square Park Eatery", location: "Summarecon Serpong", description: "Kawasan kuliner hijau dengan puluhan tenant makanan.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", mapUrl: "https://maps.google.com" },
  ],
  requests: [
    { id: "q1", name: "Yoga Pratama", message: "Min tolong cariin rekomendasi seblak instan kering dong!", date: "Baru saja" },
    { id: "q2", name: "Fitriani", message: "Rekomendasi dimsum enak sekitaran gading serpong dong min.", date: "1 jam lalu" },
  ],
};

const REVIEWS: ReviewItem[] = [
  { id: "r1", name: "Rian Pratama", rating: 5, city: "Jakarta", comment: "Chili oil-nya mantap! Gak pelit bumbu, cocok dicampur mie instan." },
  { id: "r2", name: "Siti Rahmawati", rating: 4, city: "Tangerang", comment: "Keripik ususnya renyah, gak bau apek. Cuma pengirimannya agak lama." },
  { id: "r3", name: "Dimas Anggara", rating: 5, city: "Bekasi", comment: "Seblak instannya bumbu kencurnya berasa banget, pengen pesen lagi!" },
  { id: "r4", name: "Dewi Lestari", rating: 3, city: "Depok", comment: "Baso acinya lumayan kenyal, tapi kuahnya menurutku kurang asin." },
  { id: "r5", name: "Andi Saputra", rating: 4, city: "Bogor", comment: "Makaroninya pedas sesuai janji, porsi pas buat ngemil." },
];

const EMPTY_PRODUCT = { title: "", description: "", price: "", originalPrice: "", images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"], affiliateUrl: "", category: "Kuliner" };
const EMPTY_SPOT = { name: "", location: "", description: "", image: "", mapUrl: "" };

/* ============ HELPERS ============ */
// Kecilkan foto sebelum disimpan supaya database tidak berat
const compressImage = (file: File, maxW = 700, quality = 0.75) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const formatDate = (d: string) => {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
};

const inputCls = "w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900";
const fileCls = "text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:font-bold";

/* ============ APP ============ */
export default function App() {
  const [site, setSite] = useState<SiteData>(DEFAULT_SITE);
  const [draft, setDraft] = useState<SiteData>(DEFAULT_SITE);
  const [pin, setPin] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loaded, setLoaded] = useState(false);   // data asli sudah diambil?
  const [isOwner, setIsOwner] = useState(false); // perangkat ini ditandai sebagai milik admin?

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [modal, setModal] = useState<ProductItem | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const [reqName, setReqName] = useState("");
  const [reqMessage, setReqMessage] = useState("");

  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSpot, setNewSpot] = useState(EMPTY_SPOT);

  // === TAMBAHAN: state impor dari link ===
  const [importText, setImportText] = useState("");
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  // === AKHIR TAMBAHAN ===

  // Ambil data dari server (dan cek ulang tiap 60 detik)
  const load = async () => {
    try {
      const r = await fetch("/api/site", { cache: "no-store" });
      const { data } = await r.json();
      if (data) setSite({ ...DEFAULT_SITE, ...data });
    } catch { /* pakai data default */ }
    finally { setLoaded(true); }
  };
  useEffect(() => {
    load();
    const i = setInterval(() => { if (!isAdminOpen) load(); }, 60000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminOpen]);

  // Tombol admin hanya muncul di perangkat yang pernah membuka /?admin
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get("admin") === "off") localStorage.removeItem("isOwner");
      else if (p.has("admin")) localStorage.setItem("isOwner", "1");
      if (p.has("admin")) window.history.replaceState({}, "", window.location.pathname);
      setIsOwner(localStorage.getItem("isOwner") === "1");
    } catch { /* abaikan */ }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((p) => (p >= site.profile.banners.length - 1 ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [site.profile.banners.length]);

  const openAdmin = async () => {
    const input = prompt("Masukkan PIN Admin:");
    if (input === null) return;
    try {
      const r = await fetch("/api/site", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "verify", pin: input }) });
      const { ok } = await r.json();
      if (!ok) return alert("PIN salah!");
      setPin(input);
      setDraft(site);
      setIsAdminOpen(true);
    } catch {
      alert("Gagal terhubung ke server.");
    }
  };

  const publish = async () => {
    setPublishing(true);
    try {
      const { requests, ...rest } = draft;
      const r = await fetch("/api/site", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", pin, data: { ...rest, requests } }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error);
      setSite(draft);
      alert("Berhasil dipublikasikan! Pengunjung lain akan melihat perubahan ini.");
    } catch {
      alert("Gagal menyimpan. Coba kurangi jumlah/ukuran foto, lalu ulangi.");
    }
    setPublishing(false);
  };

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqMessage.trim()) return;
    try {
      const r = await fetch("/api/site", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "request", name: reqName, message: reqMessage }) });
      const j = await r.json();
      if (j.ok) setSite((s) => ({ ...s, requests: [j.item, ...s.requests] }));
      setReqName(""); setReqMessage("");
    } catch { alert("Request gagal terkirim."); }
  };

  /* --- draft updaters --- */
  const setProfileField = <K extends keyof ProfileData>(k: K, v: ProfileData[K]) =>
    setDraft((d) => ({ ...d, profile: { ...d.profile, [k]: v } }));
  const setBanner = (i: number, patch: Partial<BannerSlide>) =>
    setProfileField("banners", draft.profile.banners.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  const setThemeField = (k: keyof CustomTheme, v: string) =>
    setProfileField("theme", { ...draft.profile.theme, [k]: v });

  const uploadImage = async (file: File, maxW: number): Promise<string> => {
  const dataUrl = await compressImage(file, maxW);
  const r = await fetch("/api/site", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "upload", pin, image: dataUrl }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || "Upload gagal");
  return j.url as string;
};

const uploadTo = async (file: File | undefined, maxW: number, cb: (url: string) => void) => {
  if (!file) return;
  try { cb(await uploadImage(file, maxW)); }
  catch { alert("Upload foto gagal. Coba foto lain."); }
};

const uploadProductImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files ?? []).slice(0, 6);
  if (!files.length) return;
  try {
    const imgs = await Promise.all(files.map((f) => uploadImage(f, 600)));
    setNewProduct((p) => ({ ...p, images: imgs }));
  } catch { alert("Upload foto gagal. Coba foto lain."); }
};

  const saveProduct = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newProduct.title || !newProduct.affiliateUrl) return;
  setDraft((d) => ({
    ...d,
    products: editingId
      ? d.products.map((p) => (p.id === editingId ? { ...p, ...newProduct } : p))
      : [{ id: Date.now().toString(), ...newProduct }, ...d.products],
  }));
  setEditingId(null);
  setNewProduct(EMPTY_PRODUCT);
};

  // === TAMBAHAN: fungsi impor banyak link sekaligus ===
  const importLinks = async () => {
    const urls = Array.from(new Set(importText.split(/\s+/).map((s) => s.trim()).filter((s) => /^https?:\/\//i.test(s))));
    if (!urls.length) { setImportMsg("Belum ada link yang valid. Tempel link yang diawali https://"); return; }
    setImporting(true);
    let done = 0;
    let filled = 0;
    try {
      for (let i = 0; i < urls.length; i += 5) {
        const batch = urls.slice(i, i + 5);
        setImportMsg(`Memproses ${Math.min(i + 5, urls.length)} dari ${urls.length} link...`);
        const r = await fetch("/api/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin, urls: batch }) });
        const j = await r.json();
        if (!j.ok) throw new Error(j.error || "Gagal");
        const items = j.items as { url: string; ok: boolean; title: string; description: string; image: string; price: string }[];
        const created: ProductItem[] = items.map((it, k) => ({
          id: Date.now().toString() + "-" + (i + k),
          title: it.title || "Produk baru (isi judul)",
          description: it.description || "",
          price: it.price || "",
          originalPrice: "",
          images: [it.image || EMPTY_PRODUCT.images[0]],
          affiliateUrl: it.url,
          category: "Kuliner",
        }));
        filled += items.filter((it) => it.ok).length;
        done += items.length;
        setDraft((d) => ({ ...d, products: [...created, ...d.products] }));
      }
      setImportMsg(`Selesai: ${done} produk masuk daftar (${filled} berhasil terisi otomatis, ${done - filled} perlu diisi manual). Cek dulu, lalu klik Simpan & Publikasikan.`);
      setImportText("");
    } catch {
      setImportMsg(`Berhenti di tengah jalan. ${done} produk sudah masuk daftar. Coba lagi untuk sisanya.`);
    }
    setImporting(false);
  };
  // === AKHIR TAMBAHAN ===

  const addSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot.name) return;
    setDraft((d) => ({ ...d, hangouts: [...d.hangouts, { id: "h" + Date.now(), ...newSpot, mapUrl: newSpot.mapUrl || "https://maps.google.com" }] }));
    setNewSpot(EMPTY_SPOT);
  };

  /* --- tampilan --- */
  // Tampilkan "Memuat..." dulu supaya data contoh tidak berkedip
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 text-orange-600 text-sm font-bold">
        Memuat...
      </div>
    );
  }

  const view = isAdminOpen ? draft : site; // saat admin terbuka, tema tampil langsung sebagai preview
  const { profile } = view;
  const theme = profile.theme;
  const { products, hangouts, requests } = site;
  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = selectedCategory === "Semua" ? products : products.filter((p) => p.category === selectedCategory);
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const cardStyle = { backgroundColor: theme.cardBg, color: theme.textColor };

  return (
    <div className="min-h-screen w-full font-sans pb-24 transition-colors duration-300" style={{ backgroundColor: theme.pageBg, color: theme.textColor }}>

      {/* Tombol admin: hanya terlihat di perangkat pemilik */}
      {isOwner && (
        <div className="fixed bottom-5 right-5 z-40">
          <button onClick={openAdmin} className="bg-slate-900/90 hover:bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-bold backdrop-blur border border-slate-700">
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full shadow-md" style={{ backgroundColor: theme.headerBg }}>
        <div className="w-full px-4 sm:px-10 pt-5">
          <div className="relative w-full h-[220px] sm:h-[340px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
            {profile.banners.map((slide, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === bannerIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                <img src={slide.image} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 text-white z-20 space-y-1.5">
                  <span style={{ backgroundColor: theme.primaryColor, color: theme.buttonText }} className="font-bold text-[10px] px-3 py-1 rounded-full">Featured Promo</span>
                  <h2 className="text-lg sm:text-3xl font-black">{slide.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-200">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full px-4 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-5 border-b border-slate-200/50 mt-2">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0 bg-slate-200">
              <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black flex items-center space-x-2">
                <span>{profile.name}</span>
                <Check className="w-5 h-5 text-blue-500" />
              </h1>
              <p className="text-xs opacity-70 font-semibold">{profile.handle}</p>
              <div className="flex items-center space-x-5 pt-1 text-xs font-medium opacity-80">
                <span>👥 <b>{profile.followersCount}</b> Pengikut</span>
                <span>🛍️ <b>{products.length}</b> Produk</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 rounded-2xl bg-black/5 text-xs whitespace-pre-line leading-relaxed opacity-90">
            {profile.bio}
          </div>
        </div>
      </header>

      {/* KONTEN */}
      <main className="w-full px-4 sm:px-10 mt-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">

          {/* KIRI: tempat nongkrong */}
          <aside className="order-2 lg:order-1 space-y-3">
            <div className="flex items-center space-x-2 font-black text-sm border-b pb-2.5 border-slate-200/50" style={{ color: theme.primaryColor }}>
              <Compass className="w-4 h-4" />
              <span>{profile.hangoutSectionTitle}</span>
            </div>
            {hangouts.map((spot) => (
              <div key={spot.id} style={cardStyle} className="rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                {spot.image && <img src={spot.image} alt={spot.name} className="w-full h-24 object-cover" />}
                <div className="p-3 space-y-1">
                  <h4 className="font-bold text-xs">{spot.name}</h4>
                  <p className="text-[10px] opacity-70 flex items-center space-x-1"><MapPin className="w-3 h-3 shrink-0" style={{ color: theme.primaryColor }} /><span>{spot.location}</span></p>
                  <p className="text-[10px] opacity-70 leading-snug">{spot.description}</p>
                  <a href={spot.mapUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }} className="mt-1.5 w-full font-bold py-1.5 rounded-lg text-[10px] flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3" /><span>Buka Peta</span>
                  </a>
                </div>
              </div>
            ))}
          </aside>

          {/* KANAN: katalog */}
          <section className="order-1 lg:order-2 space-y-4 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 border-slate-200/50">
              <div className="flex items-center space-x-2 font-black text-base" style={{ color: theme.primaryColor }}>
                <ShoppingBag className="w-5 h-5" /><span>{profile.catalogTitle}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    style={{ backgroundColor: selectedCategory === cat ? theme.primaryColor : "transparent", color: selectedCategory === cat ? theme.buttonText : theme.textColor, borderColor: theme.primaryColor }}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-full border">
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filtered.map((item) => (
                <div key={item.id} style={cardStyle} className="rounded-xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between group">
                  <div>
                    <div onClick={() => { setModal(item); setSlideIdx(0); }} className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
                      <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span style={{ backgroundColor: theme.primaryColor, color: theme.buttonText }} className="absolute top-1.5 left-1.5 text-[8px] font-bold px-2 py-0.5 rounded-full">{item.category}</span>
                    </div>
                    <div className="p-2.5 space-y-1">
                      <h3 onClick={() => { setModal(item); setSlideIdx(0); }} className="text-[11px] font-bold line-clamp-2 cursor-pointer min-h-[30px]">{item.title}</h3>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-black" style={{ color: theme.primaryColor }}>{item.price}</span>
                        {item.originalPrice && <span className="text-[9px] opacity-40 line-through">{item.originalPrice}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 pt-0">
                    <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }} className="w-full font-bold py-1.5 rounded-lg text-[10px] flex items-center justify-center space-x-1">
                      <span>Beli</span><ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Ulasan & Request */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          <div style={cardStyle} className="p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2.5 border-slate-200/50">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-xs">Ulasan Pembeli ({REVIEWS.length})</h3>
              </div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">⭐ {avg} / 5</span>
            </div>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="p-2.5 rounded-lg bg-slate-500/5 text-[11px] space-y-1 border border-slate-200/50">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{rev.name} <span className="opacity-50 font-normal">({rev.city})</span></span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`w-3 h-3 ${n <= rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="opacity-80 italic">&quot;{rev.comment}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle} className="p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-2.5">
            <div className="flex items-center space-x-2 border-b pb-2.5 border-slate-200/50">
              <MessageSquare className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <h3 className="font-bold text-xs">Request Jajanan</h3>
            </div>
            <form onSubmit={sendRequest} className="space-y-2">
              <input type="text" placeholder="Nama (boleh kosong)" value={reqName} onChange={(e) => setReqName(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-900" />
              <div className="flex gap-2">
                <input type="text" placeholder="Tulis request..." value={reqMessage} onChange={(e) => setReqMessage(e.target.value)} required className="flex-1 p-2 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-900" />
                <button type="submit" style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }} className="px-3 rounded-lg font-bold text-[11px] flex items-center space-x-1 shrink-0">
                  <Send className="w-3 h-3" /><span>Kirim</span>
                </button>
              </div>
            </form>
            <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
              {requests.map((rq) => (
                <div key={rq.id} className="p-2 rounded-lg bg-slate-500/5 text-[11px] border border-slate-200/50">
                  <div className="flex justify-between font-bold" style={{ color: theme.primaryColor }}>
                    <span>{rq.name}</span><span className="text-[10px] opacity-50 font-normal">{formatDate(rq.date)}</span>
                  </div>
                  <p className="opacity-85">{rq.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PRODUK */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative bg-slate-900 aspect-square shrink-0">
              <img src={modal.images[slideIdx] || modal.images[0]} alt="Preview" className="w-full h-full object-cover" />
              <button onClick={() => setModal(null)} className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            {modal.images.length > 1 && (
              <div className="flex gap-2 p-2.5 overflow-x-auto bg-slate-900 shrink-0">
                {modal.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setSlideIdx(i)} className={`w-12 h-12 rounded-lg object-cover cursor-pointer ${i === slideIdx ? "ring-2 ring-orange-500" : "opacity-60"}`} />
                ))}
              </div>
            )}
            <div className="p-5 space-y-3 flex-1 overflow-y-auto">
              <span className="bg-orange-100 text-orange-700 font-bold text-[11px] px-3 py-1 rounded-full">{modal.category}</span>
              <h3 className="text-lg font-black">{modal.title}</h3>
              <p className="text-xs opacity-80 leading-relaxed">{modal.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-orange-600">{modal.price}</span>
                {modal.originalPrice && <span className="text-xs opacity-40 line-through">{modal.originalPrice}</span>}
              </div>
              <a href={modal.affiliateUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }} className="w-full font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2">
                <span>Beli Sekarang di Shopee</span><ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PANEL ADMIN */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-3">
          <div className="bg-white text-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Panel Admin</h3>
              <button onClick={() => setIsAdminOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">

              {/* Tema */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-3">
                <h4 className="font-bold text-sm text-orange-900">Tema Warna (langsung terlihat di belakang)</h4>
                {THEME_GROUPS.map((g) => (
                  <div key={g.group} className="space-y-1.5">
                    <p className="font-semibold text-orange-800">{g.group}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {g.items.map((p) => (
                        <button key={p.name} type="button" onClick={() => setProfileField("theme", p.theme)}
                          className="p-2 rounded-lg border border-orange-200 bg-white font-bold text-left hover:border-orange-500 flex items-center gap-2">
                          <span className="flex shrink-0">
                            {[p.theme.pageBg, p.theme.primaryColor, p.theme.cardBg].map((c, i) => (
                              <span key={i} className="w-3 h-3 rounded-full border border-slate-300 -ml-1 first:ml-0" style={{ backgroundColor: c }} />
                            ))}
                          </span>
                          <span className="truncate">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {([["pageBg", "Latar"], ["cardBg", "Kartu"], ["primaryColor", "Utama"]] as const).map(([k, label]) => (
                    <label key={k} className="flex flex-col items-center gap-1 font-semibold">
                      {label}
                      <input type="color" value={theme[k]} onChange={(e) => { setThemeField(k, e.target.value); if (k === "primaryColor") setThemeField("buttonBg", e.target.value); }} className="w-full h-8 rounded" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Profil */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-sm">Profil</h4>
                <div className="flex items-center gap-3">
                  <img src={draft.profile.profileImage} alt="" className="w-14 h-14 rounded-full object-cover bg-slate-200" />
                  <input type="file" accept="image/*" onChange={(e) => uploadTo(e.target.files?.[0], 300, (u) => setProfileField("profileImage", u))} className={fileCls} />
                </div>
                <input className={inputCls} placeholder="Nama" value={draft.profile.name} onChange={(e) => setProfileField("name", e.target.value)} />
                <input className={inputCls} placeholder="Handle (@nama)" value={draft.profile.handle} onChange={(e) => setProfileField("handle", e.target.value)} />
                <textarea className={inputCls} rows={4} placeholder="Bio" value={draft.profile.bio} onChange={(e) => setProfileField("bio", e.target.value)} />
                <input className={inputCls} type="number" placeholder="Jumlah pengikut" value={draft.profile.followersCount} onChange={(e) => setProfileField("followersCount", Number(e.target.value))} />
                <input className={inputCls} placeholder="Judul katalog" value={draft.profile.catalogTitle} onChange={(e) => setProfileField("catalogTitle", e.target.value)} />
                <input className={inputCls} placeholder="Judul bagian tempat nongkrong" value={draft.profile.hangoutSectionTitle} onChange={(e) => setProfileField("hangoutSectionTitle", e.target.value)} />
              </div>

              {/* Banner */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">Banner Promo</h4>
                  <button type="button" onClick={() => setProfileField("banners", [...draft.profile.banners, { image: "", title: "Judul promo", subtitle: "Keterangan promo" }])} className="flex items-center gap-1 bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg"><Plus className="w-3 h-3" />Tambah</button>
                </div>
                {draft.profile.banners.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                    {b.image && <img src={b.image} alt="" className="w-full h-24 object-cover rounded-lg" />}
                    <input type="file" accept="image/*" onChange={(e) => uploadTo(e.target.files?.[0], 1400, (u) => setBanner(i, { image: u }))} className={fileCls} />
                    <input className={inputCls} placeholder="atau tempel link gambar" value={b.image.startsWith("data:") ? "" : b.image} onChange={(e) => setBanner(i, { image: e.target.value })} />
                    <input className={inputCls} placeholder="Judul" value={b.title} onChange={(e) => setBanner(i, { title: e.target.value })} />
                    <input className={inputCls} placeholder="Sub judul" value={b.subtitle} onChange={(e) => setBanner(i, { subtitle: e.target.value })} />
                    <button type="button" onClick={() => setProfileField("banners", draft.profile.banners.filter((_, idx) => idx !== i))} className="text-rose-600 font-bold flex items-center gap-1"><Trash2 className="w-3 h-3" />Hapus banner</button>
                  </div>
                ))}
              </div>

              {/* Produk */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-sm">{editingId ? "Edit Produk" : "Tambah Produk"}</h4>
                <form onSubmit={saveProduct} className="space-y-2">
                  <input className={inputCls} placeholder="Judul Produk" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} required />
                  <input className={inputCls} placeholder="Link Affiliate Shopee" value={newProduct.affiliateUrl} onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })} required />
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inputCls} placeholder="Harga" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <input className={inputCls} placeholder="Harga Coret" value={newProduct.originalPrice} onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })} />
                  </div>
                  <input className={inputCls} placeholder="Kategori" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                  <textarea className={inputCls} placeholder="Deskripsi" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                  <input type="file" accept="image/*" multiple onChange={uploadProductImages} className={"w-full " + fileCls} />
                  <div className="flex gap-1.5">{newProduct.images.map((im, i) => <img key={i} src={im} alt="" className="w-10 h-10 rounded-lg object-cover" />)}</div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">{editingId ? "Update Produk" : "Tambah ke Daftar"}</button>
                </form>

                {/* === TAMBAHAN: Impor dari link === */}
                <div className="p-3 rounded-xl border border-orange-200 bg-orange-50 space-y-2">
                  <h4 className="font-bold text-sm text-orange-900">Impor Banyak Produk dari Link</h4>
                  <p className="text-[11px] text-orange-800">Tempel link affiliate Shopee, satu per baris. Judul, foto, dan deskripsi diisi otomatis kalau terbaca. Yang kosong bisa diedit setelahnya.</p>
                  <textarea className={inputCls} rows={5} placeholder={"https://s.shopee.co.id/xxxx\nhttps://s.shopee.co.id/yyyy"} value={importText} onChange={(e) => setImportText(e.target.value)} />
                  <button type="button" onClick={importLinks} disabled={importing} className="w-full bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl">{importing ? "Memproses..." : "Impor dari Link"}</button>
                  {importMsg && <p className="text-[11px] font-semibold text-orange-900">{importMsg}</p>}
                </div>
                {/* === AKHIR TAMBAHAN === */}

                <div className="space-y-2 pt-2">
                  {draft.products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold truncate">{p.title}</p>
                          <p className="text-[10px] opacity-60">{p.price} • {p.category}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1.5 shrink-0">
                        <button onClick={() => { setEditingId(p.id); setNewProduct(p); }} className="p-2 rounded-lg bg-blue-50 text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => confirm("Hapus produk ini?") && setDraft((d) => ({ ...d, products: d.products.filter((x) => x.id !== p.id) }))} className="p-2 rounded-lg bg-rose-50 text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tempat nongkrong */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-sm">Tempat Nongkrong</h4>
                <form onSubmit={addSpot} className="space-y-2">
                  <input className={inputCls} placeholder="Nama tempat" value={newSpot.name} onChange={(e) => setNewSpot({ ...newSpot, name: e.target.value })} required />
                  <input className={inputCls} placeholder="Lokasi" value={newSpot.location} onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })} />
                  <input className={inputCls} placeholder="Deskripsi singkat" value={newSpot.description} onChange={(e) => setNewSpot({ ...newSpot, description: e.target.value })} />
                  <input className={inputCls} placeholder="Link Google Maps" value={newSpot.mapUrl} onChange={(e) => setNewSpot({ ...newSpot, mapUrl: e.target.value })} />
                  <input type="file" accept="image/*" onChange={(e) => uploadTo(e.target.files?.[0], 600, (u) => setNewSpot((s) => ({ ...s, image: u })))} className={"w-full " + fileCls} />
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">Tambah Tempat</button>
                </form>
                {draft.hangouts.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold truncate">{h.name}</span>
                    <button onClick={() => setDraft((d) => ({ ...d, hangouts: d.hangouts.filter((x) => x.id !== h.id) }))} className="p-2 rounded-lg bg-rose-50 text-rose-600 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
              <button onClick={() => setIsAdminOpen(false)} className="px-4 py-3 rounded-xl text-xs font-bold border border-slate-300">Tutup</button>
              <button onClick={publish} disabled={publishing} className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-xs">
                {publishing ? "Menyimpan..." : "Simpan & Publikasikan ke Semua Orang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}