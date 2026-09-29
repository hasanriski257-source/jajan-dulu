'use client';

import React, { useState, useEffect } from "react";
import { Settings, ExternalLink, Trash2, Edit3, ShoppingBag, Check, X, MapPin, Compass, Star, MessageSquare, Send, Palette, ChevronLeft, ChevronRight, Users } from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  images: string[];
  affiliateUrl: string;
  category: string;
}

interface BannerSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface HangoutSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  mapUrl: string;
}

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  city: string;
}

interface RequestItem {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface CustomTheme {
  pageBg: string;
  headerBg: string;
  cardBg: string;
  textColor: string;
  primaryColor: string;
  buttonBg: string;
  buttonText: string;
}

interface ProfileData {
  name: string;
  handle: string;
  bio: string;
  banners: BannerSlide[];
  followersCount: string;
  followingCount: string;
  profileImage: string;
  catalogTitle: string;
  hangoutSectionTitle: string;
  theme: CustomTheme;
}

// 6 PILIHAN TEMA LENGKAP
const PRESET_THEMES: { name: string; theme: CustomTheme }[] = [
  { name: "🇮🇩 Edisi Merah Putih (Pilihan Utama)", theme: { pageBg: "#fef2f2", headerBg: "#b91c1c", cardBg: "#ffffff", textColor: "#18181b", primaryColor: "#dc2626", buttonBg: "#b91c1c", buttonText: "#ffffff" } },
  { name: "🍊 Shopee Orange", theme: { pageBg: "#fff7ed", headerBg: "#ffffff", cardBg: "#ffffff", textColor: "#1f2937", primaryColor: "#ea580c", buttonBg: "#f97316", buttonText: "#ffffff" } },
  { name: "🌙 Edisi Ramadan / Lebaran (Emerald)", theme: { pageBg: "#f0fdf4", headerBg: "#064e3b", cardBg: "#ffffff", textColor: "#022c22", primaryColor: "#059669", buttonBg: "#047857", buttonText: "#ffffff" } },
  { name: "🎄 Edisi Natal & Tahun Baru (Ruby)", theme: { pageBg: "#fff1f2", headerBg: "#881337", cardBg: "#ffffff", textColor: "#4c0519", primaryColor: "#e11d48", buttonBg: "#be123c", buttonText: "#ffffff" } },
  { name: "📸 Instagram Clean", theme: { pageBg: "#ffffff", headerBg: "#ffffff", cardBg: "#f8fafc", textColor: "#0f172a", primaryColor: "#4f46e5", buttonBg: "#4f46e5", buttonText: "#ffffff" } },
  { name: "🌙 Dark Mode Mewah", theme: { pageBg: "#030712", headerBg: "#111827", cardBg: "#1f2937", textColor: "#f3f4f6", primaryColor: "#10b981", buttonBg: "#10b981", buttonText: "#030712" } },
];

const DEFAULT_PROFILE: ProfileData = {
  name: "Info Jajanan & Kuliner Hits",
  handle: "@jajandulu.ye",
  bio: "📍 Jajanan gurih, manis, sampe pedas ada di sini\nRekomendasi jajan budget Mahasiswa & Pelajar.\n100% anti zonk\n👇 Cek produk rekomendasi pilihan kita di bawah",
  banners: [
    {
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
      title: "PROMO MAKANAN & SNACK TERLENGKAP",
      subtitle: "Diskon spesial jajan hemat tiap hari untuk seluruh netizen"
    }
  ],
  followersCount: "586",
  followingCount: "142",
  profileImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
  catalogTitle: "Katalog Lengkap Rekomendasi Shopee Affiliate",
  hangoutSectionTitle: "📍 Tempat Nongkrong",
  theme: PRESET_THEMES[0].theme, // Default Merah Putih
};

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    title: "Minyak Chili Oil Extra Pedas Gurih 200ml",
    description: "Cocok untuk dimsum, mie instan, dan bakso aci. Mantap kuahnya!",
    price: "Rp 18.500",
    originalPrice: "Rp 30.000",
    images: [
      "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80"
    ],
    affiliateUrl: "https://shopee.co.id",
    category: "Kuliner",
  }
];

const DEFAULT_HANGOUTS: HangoutSpot[] = [
  {
    id: "h1",
    name: "Kedai Kopi Senja Serpong",
    location: "Gading Serpong, Tangerang",
    description: "Tempat nongkrong cozy outdoor dengan live music.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
    mapUrl: "https://maps.google.com",
  },
  {
    id: "h2",
    name: "Terrace Bistro & Cafe",
    location: "BSD City, Tangerang",
    description: "Spot santai sore hari dengan menu pastry dan kopi terbaik.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    mapUrl: "https://maps.google.com",
  },
  {
    id: "h3",
    name: "Food Junction Millenial",
    location: "Alam Sutera, Tangerang",
    description: "Pusat jajanan malam paling hits dan ramai pengunjung.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
    mapUrl: "https://maps.google.com",
  }
];

const NATURAL_REVIEWS: ReviewItem[] = [
  { id: "r1", name: "Rian Pratama", rating: 5, city: "Jakarta", comment: "Chili oil-nya beneran mantap pedasnya, pengiriman juga cepat!" },
  { id: "r2", name: "Siti Rahma", rating: 5, city: "Bandung", comment: "Rekomendasi jajanan di sini ga pernah salah, mantap pokoknya." },
  { id: "r3", name: "Dimas Anggara", rating: 4, city: "Tangerang", comment: "Adminnya ramah, info tempat nongkrongnya juga keren-keren." },
  { id: "r4", name: "Putri Lestari", rating: 5, city: "Depok", comment: "Suka banget sama list produk hematnya buat anak kos!" }
];

const DEFAULT_REQUESTS: RequestItem[] = [
  { id: "q1", name: "Yoga", message: "Min tolong cariin seblak instan kering dong!", date: "Baru saja" },
  { id: "q2", name: "Dina", message: "Rekomendasi dimsum frozen yang enak dong min.", date: "1 jam lalu" }
];

const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

export default function JajanCompactLayout() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [hangouts] = useState<HangoutSpot[]>(DEFAULT_HANGOUTS);
  const [reviews] = useState<ReviewItem[]>(NATURAL_REVIEWS);
  const [requests, setRequests] = useState<RequestItem[]>(DEFAULT_REQUESTS);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const [reqName, setReqName] = useState("");
  const [reqMessage, setReqMessage] = useState("");

  const [editProfile, setEditProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    images: [] as string[],
    affiliateUrl: "",
    category: "Kuliner",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Load data dari localStorage dengan aman
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("jajan_profile_v2");
      const savedProducts = localStorage.getItem("jajan_products_v2");
      const savedReviews = localStorage.getItem("jajan_reviews_v2");
      const savedRequests = localStorage.getItem("jajan_requests_v2");

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setEditProfile(parsed);
      }
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      if (savedReviews) setReviews(JSON.parse(savedReviews));
      if (savedRequests) setRequests(JSON.parse(savedRequests));
    } catch (e) {
      console.error("Gagal load storage", e);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (profile.banners && profile.banners.length > 0) {
        setCurrentBannerIndex(prev => (prev === profile.banners.length - 1 ? 0 : prev + 1));
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [profile.banners]);

  const handleOpenAdmin = () => {
    const pin = prompt("Masukkan PIN Rahasia Admin (123456):");
    if (pin === "123456") {
      setIsAdminOpen(true);
    } else if (pin !== null) {
      alert("PIN Salah!");
    }
  };

  const saveProfileAndThemeChanges = () => {
    setProfile(editProfile);
    try {
      localStorage.setItem("jajan_profile_v2", JSON.stringify(editProfile));
      alert("Profil & Tema Berhasil Disimpan Permanen!");
    } catch {
      alert("Gagal menyimpan ke storage!");
    }
  };

  const applyPresetTheme = (theme: CustomTheme) => {
    const updated = { ...editProfile, theme };
    setEditProfile(updated);
    setProfile(updated);
    try {
      localStorage.setItem("jajan_profile_v2", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataURL(file);
      setEditProfile(prev => ({ ...prev, profileImage: dataUrl }));
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqMessage.trim()) return;
    const newItem: RequestItem = {
      id: Date.now().toString(),
      name: reqName.trim() || "Anonim",
      message: reqMessage.trim(),
      date: "Baru saja"
    };
    const updated = [newItem, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem("jajan_requests_v2", JSON.stringify(updated));
    } catch {}
    setReqName("");
    setReqMessage("");
    alert("Request berhasil terkirim!");
  };

  const handleProductMultiImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urlPromises: Promise<string>[] = [];
      Array.from(files).forEach((file) => {
        urlPromises.push(fileToDataURL(file));
      });
      const uploadedImages = await Promise.all(urlPromises);
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    }
  };

  const removeProductImage = (indexToRemove: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleAddOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.affiliateUrl) {
      alert("Judul dan Link Affiliate wajib diisi!");
      return;
    }
    if (newProduct.images.length === 0) {
      alert("Harap unggah minimal 1 foto produk!");
      return;
    }

    let updatedProducts;
    if (editingProductId) {
      updatedProducts = products.map(p => p.id === editingProductId ? { ...p, ...newProduct } : p);
      setEditingProductId(null);
    } else {
      const item: ProductItem = { id: Date.now().toString(), ...newProduct };
      updatedProducts = [item, ...products];
    }

    setProducts(updatedProducts);
    try {
      localStorage.setItem("jajan_products_v2", JSON.stringify(updatedProducts));
    } catch {}

    setNewProduct({
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      images: [],
      affiliateUrl: "",
      category: "Kuliner",
    });
    alert("Produk berhasil disimpan!");
  };

  const deleteProduct = (id: string) => {
    if (confirm("Hapus produk ini?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      try {
        localStorage.setItem("jajan_products_v2", JSON.stringify(updated));
      } catch {}
    }
  };

  const categories = ["Semua", ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === "Semua" ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen w-full font-sans pb-24 transition-colors duration-300" style={{ backgroundColor: profile.theme.pageBg, color: profile.theme.textColor }}>
      
      {/* Tombol Panel Admin */}
      <div className="fixed top-6 right-6 z-50">
        <button onClick={handleOpenAdmin} className="bg-slate-900/90 hover:bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2 text-xs font-bold backdrop-blur border border-slate-700 transition-all hover:scale-105">
          <Settings className="w-3.5 h-3.5" />
          <span>Panel Admin</span>
        </button>
      </div>

      <header className="w-full shadow-sm" style={{ backgroundColor: profile.theme.headerBg }}>
        
        <div className="w-full px-4 sm:px-12 pt-6">
          <div className="relative w-full h-[220px] sm:h-[340px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
            {profile.banners && profile.banners.map((slide, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentBannerIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                <img src={slide.image} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white z-20 space-y-1">
                  <span className="bg-orange-600 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase">Promo Pilihan</span>
                  <h2 className="text-base sm:text-2xl font-black drop-shadow-md">{slide.title}</h2>
                  <p className="text-[11px] sm:text-xs text-slate-200 drop-shadow">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full px-4 sm:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/20 mt-2 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0 bg-slate-200">
              <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black flex items-center space-x-2 drop-shadow-sm">
                <span>{profile.name}</span>
                <Check className="w-5 h-5 text-blue-400 fill-blue-400" />
              </h1>
              <p className="text-xs opacity-90 font-bold drop-shadow-sm">{profile.handle}</p>
              <div className="flex items-center space-x-4 pt-0.5 text-xs font-semibold text-white">
                <span>👥 <b>{profile.followersCount}</b> Pengikut</span>
                <span>👤 <b>{profile.followingCount}</b> Mengikuti</span>
                <span>🛍 <b>{products.length}</b> Produk</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 rounded-2xl text-xs whitespace-pre-line leading-relaxed font-medium shadow-inner border bg-black/15 border-white/20 text-white">
            {profile.bio}
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-200/40">
              <div className="flex items-center space-x-2 font-black text-base sm:text-lg" style={{ color: profile.theme.primaryColor }}>
                <ShoppingBag className="w-5 h-5" />
                <span>{profile.catalogTitle}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      backgroundColor: selectedCategory === cat ? profile.theme.primaryColor : "transparent",
                      color: selectedCategory === cat ? profile.theme.buttonText : profile.theme.textColor,
                      borderColor: profile.theme.primaryColor,
                    }}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${selectedCategory !== cat ? "hover:bg-slate-500/10" : "shadow-sm scale-105"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
              {filteredProducts.map((item) => (
                <div key={item.id} style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }} className="rounded-xl border border-slate-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div onClick={() => { setActiveProductModal(item); setModalImageIndex(0); }} className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
                      <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span style={{ backgroundColor: profile.theme.primaryColor, color: profile.theme.buttonText }} className="absolute top-1.5 left-1.5 text-[7px] font-bold px-1.5 py-0.5 rounded shadow">
                        {item.category}
                      </span>
                      {item.images && item.images.length > 1 && (
                        <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                          📷 {item.images.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <h3 onClick={() => { setActiveProductModal(item); setModalImageIndex(0); }} className="text-[10px] font-bold line-clamp-2 cursor-pointer hover:underline min-h-[28px]">
                        {item.title}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[11px] font-black" style={{ color: profile.theme.primaryColor }}>{item.price}</span>
                        {item.originalPrice && <span className="text-[8px] opacity-40 line-through">{item.originalPrice}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 pt-0">
                    <button onClick={() => { setActiveProductModal(item); setModalImageIndex(0); }} style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }} className="w-full font-bold py-1.5 rounded-lg text-[9px] flex items-center justify-center space-x-1 shadow">
                      <span>Order di Shopee</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2 font-black text-sm border-b pb-3 border-slate-200/40" style={{ color: profile.theme.primaryColor }}>
              <Compass className="w-4 h-4" />
              <span>{profile.hangoutSectionTitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {hangouts.map((spot) => (
                <div key={spot.id} style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }} className="rounded-xl border border-slate-200/50 overflow-hidden shadow-sm p-3 flex flex-col space-y-2">
                  <div className="relative h-28 rounded-lg overflow-hidden bg-slate-100">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs line-clamp-1">{spot.name}</h4>
                    <p className="text-[10px] opacity-90 flex items-center space-x-1 font-semibold">
                      <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                      <span className="line-clamp-1">{spot.location}</span>
                    </p>
                    <p className="text-[10px] opacity-80 line-clamp-2">{spot.description}</p>
                  </div>
                  <a href={spot.mapUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }} className="w-full font-bold py-1.5 rounded-lg text-[10px] flex items-center justify-center space-x-1 shadow">
                    <MapPin className="w-3 h-3" />
                    <span>Peta Lokasi</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 pt-6 border-t border-slate-200/40">
          
          <div style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }} className="p-4 sm:p-5 rounded-2xl border border-slate-200/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200/40">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-xs sm:text-sm">Ulasan Pembeli ({reviews.length}+ Review)</h3>
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">⭐ 4.8 / 5.0</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-2.5 rounded-xl bg-slate-500/5 text-[11px] space-y-1 border border-slate-200/30">
                  <div className="flex justify-between items-center">
                    <span className="font-bold line-clamp-1">{rev.name}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="opacity-90 italic line-clamp-2 font-medium">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }} className="p-4 sm:p-5 rounded-2xl border border-slate-200/50 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3 border-slate-200/40">
              <MessageSquare className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-xs sm:text-sm">Request Rekomendasi Jajanan Baru</h3>
            </div>
            
            <form onSubmit={handleSendRequest} className="space-y-2.5">
              <input type="text" placeholder="Nama kamu..." value={reqName} onChange={(e) => setReqName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none" />
              <div className="flex gap-2">
                <input type="text" placeholder="Tulis request jajan..." value={reqMessage} onChange={(e) => setReqMessage(e.target.value)} required className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none" />
                <button type="submit" style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }} className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow shrink-0">
                  <Send className="w-3 h-3" />
                  <span>Kirim</span>
                </button>
              </div>
            </form>

            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              <h4 className="font-bold text-[10px] opacity-80 uppercase tracking-wider">Request Terbaru:</h4>
              {requests.map((req) => (
                <div key={req.id} className="p-2.5 rounded-xl bg-slate-500/5 text-[11px] space-y-0.5 border border-slate-200/30">
                  <div className="flex justify-between font-bold text-red-600">
                    <span>{req.name}</span>
                    <span className="text-[9px] opacity-60 font-normal">{req.date}</span>
                  </div>
                  <p className="opacity-95 font-medium line-clamp-1">{req.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="relative bg-slate-900 aspect-square flex items-center justify-center">
              <img 
                src={activeProductModal.images[modalImageIndex] || activeProductModal.images[0]} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              
              {activeProductModal.images && activeProductModal.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setModalImageIndex(prev => (prev === 0 ? activeProductModal.images.length - 1 : prev - 1))}
                    className="absolute left-2 bg-black/60 hover:bg-black text-white p-2 rounded-full shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setModalImageIndex(prev => (prev === activeProductModal.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 bg-black/60 hover:bg-black text-white p-2 rounded-full shadow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute bottom-3 bg-black/60 px-3 py-1 rounded-full text-white text-[10px] font-bold">
                    {modalImageIndex + 1} / {activeProductModal.images.length}
                  </div>
                </>
              )}

              <button onClick={() => setActiveProductModal(null)} className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeProductModal.images && activeProductModal.images.length > 1 && (
              <div className="flex gap-1.5 p-2 bg-slate-100 overflow-x-auto border-b">
                {activeProductModal.images.map((imgUrl, imgIdx) => (
                  <button 
                    key={imgIdx} 
                    onClick={() => setModalImageIndex(imgIdx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${modalImageIndex === imgIdx ? "border-red-600 scale-105" : "border-transparent opacity-60"}`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 overflow-y-auto text-xs">
              <span className="bg-red-100 text-red-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full">{activeProductModal.category}</span>
              <h3 className="text-lg font-black">{activeProductModal.title}</h3>
              
              <div className="space-y-1">
                <h4 className="font-bold opacity-70 text-[10px] uppercase">Deskripsi:</h4>
                <p className="opacity-90 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{activeProductModal.description}</p>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-xl font-black text-red-600">{activeProductModal.price}</span>
                {activeProductModal.originalPrice && <span className="text-xs opacity-40 line-through">{activeProductModal.originalPrice}</span>}
              </div>
              
              <a href={activeProductModal.affiliateUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }} className="w-full font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xl">
                <span>Order di Shopee</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Panel Admin, Profil & Pilihan Tema</h3>
              <button onClick={() => setIsAdminOpen(false)} className="hover:opacity-75"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
              
              {/* Bagian Pilihan Tema (LENGKAP) */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-3">
                <div className="flex items-center space-x-2 text-orange-900 font-bold text-sm">
                  <Palette className="w-4 h-4" />
                  <h4>Pilih Tema Suka-Suka (Termasuk Merah Putih & Shopee Orange)</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_THEMES.map((preset, idx) => (
                    <button key={idx} type="button" onClick={() => applyPresetTheme(preset.theme)} className="p-2.5 rounded-xl border border-orange-300 bg-white font-bold text-left hover:border-orange-600 shadow-sm text-[11px] transition-all hover:bg-orange-100 flex items-center justify-between">
                      <span>{preset.name}</span>
                      <span className="w-3 h-3 rounded-full border shadow-inner shrink-0" style={{ backgroundColor: preset.theme.headerBg }}></span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <Users className="w-4 h-4 text-slate-900" />
                  <h4>Pengaturan Profil, Bio & Jumlah Pengikut</h4>
                </div>
                
                <div className="flex items-center space-x-4">
                  <img src={editProfile.profileImage} alt="Preview" className="w-14 h-14 rounded-full object-cover border" />
                  <div className="flex-1">
                    <label className="block font-semibold mb-1">Upload Foto Profil Baru</label>
                    <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:font-bold file:bg-slate-900 file:text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1 text-[10px]">Nama Profil</label>
                    <input type="text" value={editProfile.name} onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[10px]">Username / Handle (@...)</label>
                    <input type="text" value={editProfile.handle} onChange={(e) => setEditProfile({ ...editProfile, handle: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1 text-[10px]">Jumlah Pengikut (Followers)</label>
                    <input type="text" value={editProfile.followersCount} onChange={(e) => setEditProfile({ ...editProfile, followersCount: e.target.value })} placeholder="Cth: 586" className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[10px]">Jumlah Mengikuti (Following)</label>
                    <input type="text" value={editProfile.followingCount} onChange={(e) => setEditProfile({ ...editProfile, followingCount: e.target.value })} placeholder="Cth: 142" className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[10px]">Bio Profil</label>
                  <textarea value={editProfile.bio} onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" rows={3} />
                </div>

                <button onClick={saveProfileAndThemeChanges} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow">Simpan Perubahan Profil & Tema</button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm">{editingProductId ? "Edit Produk & Galeri" : "Tambah Produk Baru (Multi-Upload Tanpa Batas Kuota)"}</h4>
                <form onSubmit={handleAddOrUpdateProduct} className="space-y-2.5">
                  <input type="text" placeholder="Judul Produk" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" required />
                  <input type="text" placeholder="Link Affiliate Shopee" value={newProduct.affiliateUrl} onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" required />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Harga (Cth: Rp 15.000)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="p-2.5 rounded-xl border border-slate-200 bg-white" />
                    <input type="text" placeholder="Harga Coret (Opsional)" value={newProduct.originalPrice} onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })} className="p-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                  <input type="text" placeholder="Kategori (Cth: Kuliner / Cemilan)" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  <textarea placeholder="Deskripsi Lengkap" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" />
                  
                  <div className="space-y-2 bg-white p-3 rounded-xl border">
                    <label className="block font-bold text-[11px]">Upload Foto Produk (Bisa banyak sekaligus & ukuran besar)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleProductMultiImageUpload} 
                      className="w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-bold file:bg-red-600 file:text-white text-[11px] cursor-pointer" 
                    />
                    
                    {newProduct.images.length > 0 && (
                      <div className="grid grid-cols-5 gap-2 pt-2">
                        {newProduct.images.map((imgSrc, imgIdx) => (
                          <div key={imgIdx} className="relative aspect-square rounded-lg overflow-hidden border bg-slate-100 group">
                            <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => removeProductImage(imgIdx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700"
                              title="Hapus foto ini"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] text-center font-bold">
                              #{imgIdx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow">Simpan Produk</button>
                </form>

                <div className="space-y-2 pt-2">
                  <p className="font-bold text-xs opacity-70">Daftar Produk Aktif:</p>
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center space-x-2">
                        <img src={p.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <span className="font-bold line-clamp-1">{p.title}</span>
                          <span className="text-[9px] opacity-60">📷 {p.images.length} Foto</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button type="button" onClick={() => { setEditingProductId(p.id); setNewProduct(p); }} className="p-1.5 rounded bg-blue-50 text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => deleteProduct(p.id)} className="p-1.5 rounded bg-rose-50 text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button onClick={() => setIsAdminOpen(false)} className="bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs">Tutup Panel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}