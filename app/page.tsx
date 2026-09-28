"use client";

import React, { useState, useEffect } from "react";
import { Settings, ExternalLink, Plus, Trash2, Edit3, ShoppingBag, Check, X, User, Upload, Palette, MapPin, Compass } from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  affiliateUrl: string;
  category: string;
}

interface HangoutSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  mapUrl: string;
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
  postsCount: number;
  followersCount: number;
  followingCount: number;
  profileImage: string;
  bannerImage: string;
  catalogTitle: string;
  hangoutSectionTitle: string;
  theme: CustomTheme;
}

const DEFAULT_THEME: CustomTheme = {
  pageBg: "#f9fafb",
  headerBg: "#ffffff",
  cardBg: "#ffffff",
  textColor: "#111827",
  primaryColor: "#f97316",
  buttonBg: "#f97316",
  buttonText: "#ffffff",
};

const PRESET_THEMES: { name: string; theme: CustomTheme }[] = [
  {
    name: "🍊 Shopee Orange",
    theme: {
      pageBg: "#fff7ed",
      headerBg: "#ffffff",
      cardBg: "#ffffff",
      textColor: "#1f2937",
      primaryColor: "#ea580c",
      buttonBg: "#f97316",
      buttonText: "#ffffff",
    },
  },
  {
    name: "📸 Instagram Clean",
    theme: {
      pageBg: "#ffffff",
      headerBg: "#ffffff",
      cardBg: "#fcfcfc",
      textColor: "#0f172a",
      primaryColor: "#4f46e5",
      buttonBg: "#4f46e5",
      buttonText: "#ffffff",
    },
  },
  {
    name: "🍔 Kuliner Warm",
    theme: {
      pageBg: "#fffbeb",
      headerBg: "#fef3c7",
      cardBg: "#ffffff",
      textColor: "#451a03",
      primaryColor: "#d97706",
      buttonBg: "#f59e0b",
      buttonText: "#ffffff",
    },
  },
  {
    name: "🌙 Dark Mode Mewah",
    theme: {
      pageBg: "#030712",
      headerBg: "#111827",
      cardBg: "#1f2937",
      textColor: "#f3f4f6",
      primaryColor: "#10b981",
      buttonBg: "#10b981",
      buttonText: "#030712",
    },
  },
  {
    name: "🌸 Pastel Aesthetic",
    theme: {
      pageBg: "#fdf2f8",
      headerBg: "#fce7f3",
      cardBg: "#ffffff",
      textColor: "#831843",
      primaryColor: "#db2777",
      buttonBg: "#ec4899",
      buttonText: "#ffffff",
    },
  },
];

const DEFAULT_PROFILE: ProfileData = {
  name: "Info Jajanan & Kuliner Hits",
  handle: "@jajandulu.ye",
  bio: "📍 Jajanan gurih, manis, sampe pedas ada di sini\nRekomendasi jajan budget Mahasiswa & Pelajar.\n100% anti zonk\n👇 Cek produk rekomendasi pilihan kita di bawah",
  postsCount: 12,
  followersCount: 586,
  followingCount: 142,
  profileImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
  bannerImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  catalogTitle: "Katalog Rekomendasi Shopee Affiliate",
  hangoutSectionTitle: "📍 Rekomendasi Tempat Nongkrong & Kulineran",
  theme: DEFAULT_THEME,
};

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    title: "Minyak Chili Oil Extra Pedas Gurih 200ml",
    description: "Cocok untuk dimsum, mie instan, dan bakso aci. Mantap kuahnya!",
    price: "Rp 18.500",
    originalPrice: "Rp 30.000",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Kuliner",
  },
  {
    id: "2",
    title: "Keripik Usus Crispy Daun Jeruk Renyah",
    description: "Gurih nagih, tidak bau amis, bumbu melimpah.",
    price: "Rp 12.000",
    originalPrice: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Cemilan",
  },
  {
    id: "3",
    title: "Dimsum Mentai Frozen Pack Isi 10 pcs",
    description: "Lengkap dengan saus mentai creamy dan chili oil lezat.",
    price: "Rp 35.000",
    originalPrice: "Rp 50.000",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Frozen Food",
  },
  {
    id: "4",
    title: "Baso Aci Instan Kuah Pedas Mercon",
    description: "Isi lengkap cuanki, pilus cikur, dan jeruk limo segar.",
    price: "Rp 15.000",
    originalPrice: "Rp 25.000",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Kuliner",
  },
  {
    id: "5",
    title: "Makaroni Ngehe Balado Daun Jeruk",
    description: "Tingkat kepedasan bisa disesuaikan, renyah di mulut.",
    price: "Rp 10.000",
    originalPrice: "Rp 15.000",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281297?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Cemilan",
  },
  {
    id: "6",
    title: "Minuman Boba Brown Sugar Instant Kit",
    description: "Bikin boba ala cafe sendiri di rumah dengan mudah.",
    price: "Rp 22.000",
    originalPrice: "Rp 35.000",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Minuman",
  },
  {
    id: "7",
    title: "Seblak Instan Tulang Rangu Enak",
    description: "Kuah kental berasa kencur khas Bandung yang nampol.",
    price: "Rp 16.500",
    originalPrice: "Rp 25.000",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Kuliner",
  },
  {
    id: "8",
    title: "Keripik Singkong Balado Extra Pedas",
    description: "Irisan tipis super renyah dengan bumbu balado meresap.",
    price: "Rp 13.000",
    originalPrice: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80",
    affiliateUrl: "https://shopee.co.id",
    category: "Cemilan",
  },
];

const DEFAULT_HANGOUTS: HangoutSpot[] = [
  {
    id: "h1",
    name: "Kedai Kopi Senja Serpong",
    location: "Gading Serpong, Tangerang",
    description: "Tempat nongkrong cozy outdoor dengan live music setiap akhir pekan.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80",
    mapUrl: "https://maps.google.com",
  },
  {
    id: "h2",
    name: "Warkop Modern & Dimsum Rans",
    location: "Summarecon Serpong",
    description: "Menu lengkap harga mahasiswa, tempat luas dan bebas Wi-Fi kencang.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80",
    mapUrl: "https://maps.google.com",
  },
  {
    id: "h3",
    name: "Night Market Kuliner BSD",
    location: "BSD City, Tangerang",
    description: "Pusat jajanan jalanan paling lengkap, dari makanan berat hingga dessert manis.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80",
    mapUrl: "https://maps.google.com",
  },
];

export default function ShopeeAffiliateThemed() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [hangouts, setHangouts] = useState<HangoutSpot[]>(DEFAULT_HANGOUTS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const [editProfile, setEditProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    affiliateUrl: "",
    category: "Kuliner",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // State untuk tambah/edit tempat nongkrong baru
  const [newHangout, setNewHangout] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    mapUrl: "",
  });
  const [editingHangoutId, setEditingHangoutId] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("shopee_bio_profile_v10");
    const savedProducts = localStorage.getItem("shopee_bio_products_v10");
    const savedHangouts = localStorage.getItem("shopee_bio_hangouts_v10");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditProfile(parsed);
    }
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedHangouts) {
      setHangouts(JSON.parse(savedHangouts));
    }
  }, []);

  const saveProfileChanges = () => {
    setProfile(editProfile);
    localStorage.setItem("shopee_bio_profile_v10", JSON.stringify(editProfile));
    alert("Profil & Tema Berhasil Disimpan!");
  };

  const applyPresetTheme = (theme: CustomTheme) => {
    setEditProfile({ ...editProfile, theme });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: "profile" | "banner" | "product" | "hangout") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultString = reader.result as string;
        if (targetField === "profile") {
          setEditProfile({ ...editProfile, profileImage: resultString });
        } else if (targetField === "banner") {
          setEditProfile({ ...editProfile, bannerImage: resultString });
        } else if (targetField === "product") {
          setNewProduct({ ...newProduct, image: resultString });
        } else if (targetField === "hangout") {
          setNewHangout({ ...newHangout, image: resultString });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.affiliateUrl) {
      alert("Nama produk dan Link Affiliate wajib diisi!");
      return;
    }

    if (editingProductId) {
      const updated = products.map(p => p.id === editingProductId ? { ...p, ...newProduct } : p);
      setProducts(updated);
      localStorage.setItem("shopee_bio_products_v10", JSON.stringify(updated));
      setEditingProductId(null);
      alert("Produk berhasil diperbarui!");
    } else {
      const item: ProductItem = {
        id: Date.now().toString(),
        title: newProduct.title,
        description: newProduct.description || "Rekomendasi pilihan terbaik untukmu.",
        price: newProduct.price || "Rp 15.000",
        originalPrice: newProduct.originalPrice || "Rp 25.000",
        image: newProduct.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
        affiliateUrl: newProduct.affiliateUrl,
        category: newProduct.category || "Kuliner",
      };
      const updated = [item, ...products];
      setProducts(updated);
      localStorage.setItem("shopee_bio_products_v10", JSON.stringify(updated));
      alert("Produk baru berhasil ditambahkan!");
    }

    setNewProduct({ title: "", description: "", price: "", originalPrice: "", image: "", affiliateUrl: "", category: "Kuliner" });
  };

  const deleteProduct = (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem("shopee_bio_products_v10", JSON.stringify(updated));
    }
  };

  const startEditProduct = (prod: ProductItem) => {
    setEditingProductId(prod.id);
    setNewProduct({
      title: prod.title,
      description: prod.description,
      price: prod.price,
      originalPrice: prod.originalPrice,
      image: prod.image,
      affiliateUrl: prod.affiliateUrl,
      category: prod.category,
    });
  };

  // Fungsi Kelola Tempat Nongkrong
  const handleAddOrUpdateHangout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHangout.name) {
      alert("Nama tempat nongkrong wajib diisi!");
      return;
    }

    if (editingHangoutId) {
      const updated = hangouts.map(h => h.id === editingHangoutId ? { ...h, ...newHangout } : h);
      setHangouts(updated);
      localStorage.setItem("shopee_bio_hangouts_v10", JSON.stringify(updated));
      setEditingHangoutId(null);
      alert("Tempat nongkrong berhasil diperbarui!");
    } else {
      const item: HangoutSpot = {
        id: Date.now().toString(),
        name: newHangout.name,
        location: newHangout.location || "Lokasi sekitar",
        description: newHangout.description || "Tempat nongkrong seru pilihan.",
        image: newHangout.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80",
        mapUrl: newHangout.mapUrl || "https://maps.google.com",
      };
      const updated = [item, ...hangouts];
      setHangouts(updated);
      localStorage.setItem("shopee_bio_hangouts_v10", JSON.stringify(updated));
      alert("Tempat nongkrong berhasil ditambahkan!");
    }

    setNewHangout({ name: "", location: "", description: "", image: "", mapUrl: "" });
  };

  const deleteHangout = (id: string) => {
    if (confirm("Yakin ingin menghapus tempat ini?")) {
      const updated = hangouts.filter(h => h.id !== id);
      setHangouts(updated);
      localStorage.setItem("shopee_bio_hangouts_v10", JSON.stringify(updated));
    }
  };

  const startEditHangout = (spot: HangoutSpot) => {
    setEditingHangoutId(spot.id);
    setNewHangout({
      name: spot.name,
      location: spot.location,
      description: spot.description,
      image: spot.image,
      mapUrl: spot.mapUrl,
    });
  };

  const categories = ["Semua", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div 
      className="min-h-screen font-sans pb-20 transition-colors duration-300"
      style={{ backgroundColor: profile.theme.pageBg, color: profile.theme.textColor }}
    >
      
      {/* TOMBOL PANEL ADMIN */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-black/90 hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-bold backdrop-blur-md border border-white/25 transition-all hover:scale-105"
        >
          <Settings className="w-4 h-4 animate-spin-slow" />
          <span>Panel Admin & Atur Tema</span>
        </button>
      </div>

      {/* HEADER BANNER & PROFIL */}
      <div 
        className="w-full shadow-sm pb-6 transition-colors duration-300"
        style={{ backgroundColor: profile.theme.headerBg }}
      >
        <div className="w-full h-48 sm:h-80 relative overflow-hidden bg-gray-200">
          <img src={profile.bannerImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end space-x-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white shrink-0">
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>

              <div className="mb-2">
                <h1 className="text-lg sm:text-2xl font-black flex items-center space-x-2 drop-shadow-sm">
                  <span>{profile.name}</span>
                  <Check className="w-5 h-5 text-blue-500 fill-blue-500" />
                </h1>
                <p className="text-xs sm:text-sm opacity-80 font-medium">{profile.handle}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <a
                href="#main-content"
                style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }}
                className="font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 hover:opacity-90"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lihat Menu & Tempat</span>
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-black/5 bg-black/5 backdrop-blur-sm">
            <div className="flex space-x-8 text-xs sm:text-sm">
              <div><strong className="font-black">{products.length}</strong> <span className="opacity-70">produk</span></div>
              <div><strong className="font-black">{profile.followersCount}</strong> <span className="opacity-70">pengikut</span></div>
              <div><strong className="font-black">{profile.followingCount}</strong> <span className="opacity-70">mengikuti</span></div>
            </div>

            <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed max-w-2xl opacity-90">
              {profile.bio}
            </div>
          </div>
        </div>
      </div>

      {/* KONTEN UTAMA: GRID KATALOG (KIRI) & KOLOM TEMPAT NONGRONG (KANAN) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-8" id="main-content">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* KOLOM KIRI: KATALOG PRODUK AFFILIATE (Lebar 3 Kolom di layar besar) */}
          <div className="lg:col-span-3 space-y-6" id="products-grid">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-300/30 pb-4 gap-3">
              <div 
                className="flex items-center space-x-2 font-black text-sm uppercase tracking-wider"
                style={{ color: profile.theme.primaryColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{profile.catalogTitle} ({filteredProducts.length})</span>
              </div>

              {/* TOMBOL FILTER KATEGORI JAJANAN */}
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
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      selectedCategory !== cat ? "hover:bg-black/5" : "shadow"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* GRID PRODUK */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }}
                  className="rounded-xl border border-black/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span 
                        style={{ backgroundColor: profile.theme.primaryColor, color: profile.theme.buttonText }}
                        className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded shadow"
                      >
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-bold line-clamp-2 leading-tight group-hover:opacity-80 transition-opacity">
                        {item.title}
                      </h3>
                      <p className="text-[10px] opacity-70 line-clamp-2 leading-tight">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap items-baseline gap-1 pt-0.5">
                        <span 
                          className="text-[11px] sm:text-xs font-black"
                          style={{ color: profile.theme.primaryColor }}
                        >
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[9px] opacity-50 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 pt-0">
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }}
                      className="w-full font-bold py-2 rounded-lg text-[10px] sm:text-xs transition-all flex items-center justify-center space-x-1 shadow hover:opacity-95"
                    >
                      <span>Beli</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 opacity-60 text-sm font-bold">
                Belum ada produk di kategori &quot;{selectedCategory}&quot;.
              </div>
            )}
          </div>

          {/* KOLOM KANAN: REKOMENDASI TEMPAT NONGRONG / KULINERAN (Lebar 1 Kolom di layar besar, di atas/bawah di HP) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border-b border-gray-300/30 pb-4">
              <div 
                className="flex items-center space-x-2 font-black text-sm uppercase tracking-wider"
                style={{ color: profile.theme.primaryColor }}
              >
                <Compass className="w-4 h-4" />
                <span>{profile.hangoutSectionTitle}</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {hangouts.map((spot) => (
                <div
                  key={spot.id}
                  style={{ backgroundColor: profile.theme.cardBg, color: profile.theme.textColor }}
                  className="rounded-2xl border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <h4 className="font-black text-xs sm:text-sm drop-shadow line-clamp-1">{spot.name}</h4>
                      <p className="text-[10px] opacity-90 flex items-center space-x-1 drop-shadow">
                        <MapPin className="w-3 h-3 shrink-0 text-orange-400" />
                        <span className="line-clamp-1">{spot.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] opacity-80 leading-relaxed line-clamp-3">
                      {spot.description}
                    </p>

                    <a
                      href={spot.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: profile.theme.buttonBg, color: profile.theme.buttonText }}
                      className="w-full font-bold py-2 rounded-xl text-[11px] transition-all flex items-center justify-center space-x-1.5 shadow hover:opacity-95 mt-2"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Buka Google Maps</span>
                    </a>
                  </div>
                </div>
              ))}

              {hangouts.length === 0 && (
                <div className="text-center py-10 opacity-60 text-xs font-bold border border-dashed rounded-2xl p-4">
                  Belum ada rekomendasi tempat nongkrong. Tambahkan lewat Panel Admin.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* PANEL ADMIN & CUSTOM COLOR PICKER */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white text-gray-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
            
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-black text-sm flex items-center space-x-2">
                <Settings className="w-4 h-4 text-orange-400" />
                <span>Panel Admin & Atur Kolom Tempat Nongkrong</span>
              </h3>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* PENGATURAN TEMA & WARNA */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-4">
                <h4 className="font-black text-sm text-gray-900 border-b border-orange-200 pb-2 flex items-center space-x-1">
                  <Palette className="w-4 h-4 text-orange-600" />
                  <span>0. Atur Tema Warna Bebas</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_THEMES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPresetTheme(preset.theme)}
                      className="p-2.5 rounded-xl border border-orange-300 bg-white hover:bg-orange-100 font-bold text-gray-800 text-left transition-all text-xs"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-orange-200">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Warna Background</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={editProfile.theme.pageBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, pageBg: e.target.value }
                        })}
                        className="w-10 h-10 rounded-lg cursor-pointer border"
                      />
                      <input
                        type="text"
                        value={editProfile.theme.pageBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, pageBg: e.target.value }
                        })}
                        className="w-full p-1.5 rounded border text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Warna Header</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={editProfile.theme.headerBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, headerBg: e.target.value }
                        })}
                        className="w-10 h-10 rounded-lg cursor-pointer border"
                      />
                      <input
                        type="text"
                        value={editProfile.theme.headerBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, headerBg: e.target.value }
                        })}
                        className="w-full p-1.5 rounded border text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Warna Kartu</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={editProfile.theme.cardBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, cardBg: e.target.value }
                        })}
                        className="w-10 h-10 rounded-lg cursor-pointer border"
                      />
                      <input
                        type="text"
                        value={editProfile.theme.cardBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { ...editProfile.theme, cardBg: e.target.value }
                        })}
                        className="w-full p-1.5 rounded border text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Warna Tombol / Aksen</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={editProfile.theme.buttonBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { 
                            ...editProfile.theme, 
                            buttonBg: e.target.value,
                            primaryColor: e.target.value 
                          }
                        })}
                        className="w-10 h-10 rounded-lg cursor-pointer border"
                      />
                      <input
                        type="text"
                        value={editProfile.theme.buttonBg}
                        onChange={(e) => setEditProfile({
                          ...editProfile,
                          theme: { 
                            ...editProfile.theme, 
                            buttonBg: e.target.value,
                            primaryColor: e.target.value 
                          }
                        })}
                        className="w-full p-1.5 rounded border text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={saveProfileChanges}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md mt-2"
                >
                  Simpan Perubahan Warna & Tema
                </button>
              </div>

              {/* 1. Edit Profil, Foto, Banner & Judul Kolom */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-black text-sm text-gray-900 border-b pb-2 flex items-center space-x-1">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>1. Ubah Identitas, Bio, & Judul Kolom</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nama Akun</label>
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Username / Handle (@...)</label>
                    <input
                      type="text"
                      value={editProfile.handle}
                      onChange={(e) => setEditProfile({ ...editProfile, handle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Bio / Deskripsi</label>
                  <textarea
                    rows={3}
                    value={editProfile.bio}
                    onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-gray-200">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center space-x-1">
                      <Upload className="w-3.5 h-3.5 text-orange-500" />
                      <span>Upload Foto Profil Baru</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "profile")}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center space-x-1">
                      <Upload className="w-3.5 h-3.5 text-orange-500" />
                      <span>Upload Foto Banner Sampul</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "banner")}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Judul Teks Katalog Produk</label>
                    <input
                      type="text"
                      value={editProfile.catalogTitle}
                      onChange={(e) => setEditProfile({ ...editProfile, catalogTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Judul Kolom Tempat Nongkrong (Bisa Diganti)</label>
                    <input
                      type="text"
                      value={editProfile.hangoutSectionTitle}
                      onChange={(e) => setEditProfile({ ...editProfile, hangoutSectionTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                </div>

                <button
                  onClick={saveProfileChanges}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl transition-all shadow-md"
                >
                  Simpan Perubahan Profil & Judul
                </button>
              </div>

              {/* 2. Tambah / Edit Tempat Nongkrong (Kolom Kanan) */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <h4 className="font-black text-sm text-gray-900 border-b border-emerald-200 pb-2 flex items-center space-x-1">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{editingHangoutId ? "Edit Tempat Nongkrong" : "Tambah Tempat Nongkrong / Kuliner Baru"}</span>
                </h4>

                <form onSubmit={handleAddOrUpdateHangout} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nama Tempat</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kedai Kopi Senja..."
                        value={newHangout.name}
                        onChange={(e) => setNewHangout({ ...newHangout, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Lokasi / Alamat Singkat</label>
                      <input
                        type="text"
                        placeholder="Contoh: Gading Serpong, Tangerang"
                        value={newHangout.location}
                        onChange={(e) => setNewHangout({ ...newHangout, location: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Deskripsi Tempat</label>
                    <textarea
                      rows={2}
                      placeholder="Tulis deskripsi singkat..."
                      value={newHangout.description}
                      onChange={(e) => setNewHangout({ ...newHangout, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Link Google Maps (URL)</label>
                    <input
                      type="text"
                      placeholder="https://maps.google.com/..."
                      value={newHangout.mapUrl}
                      onChange={(e) => setNewHangout({ ...newHangout, mapUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <label className="block font-bold text-gray-700 mb-1 flex items-center space-x-1">
                      <Upload className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Upload Foto Tempat</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "hangout")}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md"
                    >
                      {editingHangoutId ? "Simpan Perubahan Tempat" : "+ Tambah Tempat Nongkrong Baru"}
                    </button>
                    {editingHangoutId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHangoutId(null);
                          setNewHangout({ name: "", location: "", description: "", image: "", mapUrl: "" });
                        }}
                        className="bg-gray-300 text-gray-800 font-bold px-4 py-2.5 rounded-xl"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                {/* Daftar Tempat Nongkrong Aktif */}
                <div className="pt-2 border-t border-emerald-200 space-y-2">
                  <h5 className="font-bold text-gray-800 text-[11px]">Kelola Daftar Tempat Nongkrong ({hangouts.length})</h5>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {hangouts.map((h) => (
                      <div key={h.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-2 truncate">
                          <img src={h.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-xs text-gray-900 truncate">{h.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{h.location}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 shrink-0">
                          <button onClick={() => startEditHangout(h)} className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button onClick={() => deleteHangout(h.id)} className="bg-red-100 text-red-700 p-1.5 rounded-lg">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Tambah / Edit Produk Affiliate */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
                <h4 className="font-black text-sm text-gray-900 border-b border-amber-200 pb-2 flex items-center space-x-1">
                  <Plus className="w-4 h-4 text-amber-600" />
                  <span>{editingProductId ? "Edit Produk Jajanan" : "Tambah Produk Jajanan Baru & Kategori"}</span>
                </h4>

                <form onSubmit={handleAddOrUpdateProduct} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nama Produk</label>
                      <input
                        type="text"
                        placeholder="Contoh: Keripik Usus..."
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Kategori Jajanan</label>
                      <input
                        type="text"
                        placeholder="Kuliner / Cemilan / Frozen Food / Minuman"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Deskripsi Singkat Produk</label>
                    <textarea
                      rows={2}
                      placeholder="Tulis deskripsi..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Harga Jual (Promo)</label>
                      <input
                        type="text"
                        placeholder="Rp 15.000"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Harga Asli (Coret)</label>
                      <input
                        type="text"
                        placeholder="Rp 30.000"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Link Shopee Affiliate</label>
                      <input
                        type="text"
                        placeholder="https://shope.ee/..."
                        value={newProduct.affiliateUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200">
                    <label className="block font-bold text-gray-700 mb-1 flex items-center space-x-1">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>Upload Foto Produk</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "product")}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md"
                    >
                      {editingProductId ? "Simpan Perubahan Produk" : "+ Tambah Produk Baru"}
                    </button>
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProductId(null);
                          setNewProduct({ title: "", description: "", price: "", originalPrice: "", image: "", affiliateUrl: "", category: "Kuliner" });
                        }}
                        className="bg-gray-300 text-gray-800 font-bold px-4 py-2.5 rounded-xl"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                {/* Daftar Produk Aktif */}
                <div className="pt-2 border-t border-amber-200 space-y-2">
                  <h5 className="font-bold text-gray-800 text-[11px]">Kelola Daftar Produk ({products.length})</h5>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div key={p.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-2 truncate">
                          <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-xs text-gray-900 truncate">{p.title}</p>
                            <span className="text-[10px] text-amber-600 font-bold">{p.price}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1 shrink-0">
                          <button onClick={() => startEditProduct(p)} className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="bg-red-100 text-red-700 p-1.5 rounded-lg">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <button
                onClick={() => setIsAdminOpen(false)}
                className="bg-black text-white font-bold px-6 py-2 rounded-xl text-xs"
              >
                Tutup Panel Admin
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}