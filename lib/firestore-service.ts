import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  getAllArticles as getAllBloggerArticles,
  getArticleBySlug as getBloggerArticleBySlug,
} from "./blogger";

export type TourPackageItem = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  desc: string;
  img: string;
  price: string;
  order: number;
  isActive: boolean;
  updatedAt?: string;
};

export type ActivityItem = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  priceLabel: string;
  order: number;
  isActive: boolean;
  updatedAt?: string;
};

export type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  tags?: string[];
  status: "published" | "draft";
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

// Data Default Bawaan
export const DEFAULT_PACKAGES: TourPackageItem[] = [
  {
    id: "2h1m-hotel",
    slug: "2h1m-hotel",
    title: "2 Hari 1 Malam Hotel",
    duration: "2 Hari 1 Malam",
    desc: "Perjalanan seru, fasilitas lengkap, serta istirahat nyaman di hotel pilihan. Cocok untuk kamu yang ingin melepas penat dengan liburan singkat namun berkesan.",
    img: "/images/2h1mhotel.jpg",
    price: "Mulai Rp 1.280.000",
    order: 1,
    isActive: true,
  },
  {
    id: "3h2m-hotel",
    slug: "3h2m-hotel",
    title: "3 Hari 2 Malam Hotel",
    duration: "3 Hari 2 Malam",
    desc: "Menikmati aktivitas seru, dan tetap beristirahat nyaman di hotel pilihan. Cocok untuk liburan santai dengan jadwal fleksibel.",
    img: "/images/3h2mhotel.jpg",
    price: "Mulai Rp 1.700.000",
    order: 2,
    isActive: true,
  },
  {
    id: "4h3m-hotel",
    slug: "4h3m-hotel",
    title: "4 Hari 3 Malam Hotel",
    duration: "4 Hari 3 Malam",
    desc: "Cocok untuk kamu yang ingin liburan santai sekaligus mendalam, dengan waktu cukup untuk merasakan semua keindahan dan keseruan perjalanan.",
    img: "/images/4h3mhotel.jpg",
    price: "Mulai Rp 2.450.000",
    order: 3,
    isActive: true,
  },
  {
    id: "2h1m-homestay",
    slug: "2h1m-homestay",
    title: "2 Hari 1 Malam Homestay",
    duration: "2 Hari 1 Malam",
    desc: "Pengalaman hangat dan ramah. Dengan fasilitas sederhana namun nyaman, liburanmu tetap berkesan dan penuh cerita.",
    img: "/images/2h1mhomestay.jpg",
    price: "Mulai Rp 610.000",
    order: 4,
    isActive: true,
  },
  {
    id: "3h2m-homestay",
    slug: "3h2m-homestay",
    title: "3 Hari 2 Malam Homestay",
    duration: "3 Hari 2 Malam",
    desc: "Menikmati suasana ramah khas warga lokal, sekaligus menjelajahi destinasi dengan waktu lebih leluasa.",
    img: "/images/3h2mhomestay.jpg",
    price: "Mulai Rp 950.000",
    order: 5,
    isActive: true,
  },
  {
    id: "4h3m-homestay",
    slug: "4h3m-homestay",
    title: "4 Hari 3 Malam Homestay",
    duration: "4 Hari 3 Malam",
    desc: "Merasakan keramahan warga lokal, menikmati aktivitas wisata lebih lengkap, dan beristirahat nyaman dalam suasana akrab.",
    img: "/images/4h3mhomestay.jpg",
    price: "Mulai Rp 1.350.000",
    order: 6,
    isActive: true,
  },
];

export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: "one-day-trip",
    slug: "one-day-trip",
    title: "One Day Trip",
    desc: "Jelajahi pulau-pulau kecil di sekitar Karimunjawa dengan kapal, mampir ke spot snorkeling dan pantai-pantai tersembunyi.",
    img: "/images/island-hopping.png",
    priceLabel: "Mulai 200K",
    order: 1,
    isActive: true,
  },
  {
    id: "diving-trip",
    slug: "diving-trip",
    title: "Diving Trip",
    desc: "Trip menyelam ke spot-spot terbaik Karimunjawa, cocok untuk pemula maupun diver berpengalaman.",
    img: "/images/scuba-diving.jpg",
    priceLabel: "Mulai 1.100K",
    order: 2,
    isActive: true,
  },
  {
    id: "sewa-motor",
    slug: "sewa-motor",
    title: "Sewa Motor",
    desc: "Sewa motor harian buat eksplorasi Karimunjawa dengan bebas sesuai jadwalmu sendiri.",
    img: "/images/sewa-motor.jpg",
    priceLabel: "Mulai 75K",
    order: 3,
    isActive: true,
  },
];

// Helper local storage untuk preview/offline mode sebelum Firebase dikonfigurasi
const LOCAL_STORAGE_KEYS = {
  PACKAGES: "kj_packages_data",
  ACTIVITIES: "kj_activities_data",
  ARTICLES: "kj_articles_data",
};

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Local storage error:", err);
  }
}

// -------------------------------------------------------------
// PAKET WISATA SERVICE
// -------------------------------------------------------------
export async function getTourPackages(): Promise<TourPackageItem[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "packages");
      const q = query(colRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({
          ...(d.data() as TourPackageItem),
          id: d.id,
        }));
      }
    } catch (err) {
      console.warn("Firestore getTourPackages failed, using fallback:", err);
    }
  }
  return getLocal(LOCAL_STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
}

export async function saveTourPackage(item: TourPackageItem): Promise<void> {
  const updatedItem = {
    ...item,
    id: item.id || item.slug,
    updatedAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured()) {
    const docRef = doc(db, "packages", updatedItem.id);
    await setDoc(docRef, updatedItem, { merge: true });
  }

  // Simpan juga ke local fallback
  const list = getLocal<TourPackageItem[]>(LOCAL_STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
  const index = list.findIndex((p) => p.id === updatedItem.id);
  if (index >= 0) {
    list[index] = updatedItem;
  } else {
    list.push(updatedItem);
  }
  setLocal(LOCAL_STORAGE_KEYS.PACKAGES, list);
}

export async function deleteTourPackage(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    await deleteDoc(doc(db, "packages", id));
  }
  const list = getLocal<TourPackageItem[]>(LOCAL_STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
  setLocal(
    LOCAL_STORAGE_KEYS.PACKAGES,
    list.filter((p) => p.id !== id)
  );
}

export async function seedDefaultPackages(): Promise<void> {
  for (const pkg of DEFAULT_PACKAGES) {
    await saveTourPackage(pkg);
  }
}

// -------------------------------------------------------------
// AKTIVITAS SERVICE
// -------------------------------------------------------------
export async function getActivities(): Promise<ActivityItem[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "activities");
      const q = query(colRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({
          ...(d.data() as ActivityItem),
          id: d.id,
        }));
      }
    } catch (err) {
      console.warn("Firestore getActivities failed, using fallback:", err);
    }
  }
  return getLocal(LOCAL_STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
}

export async function saveActivity(item: ActivityItem): Promise<void> {
  const updatedItem = {
    ...item,
    id: item.id || item.slug,
    updatedAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured()) {
    const docRef = doc(db, "activities", updatedItem.id);
    await setDoc(docRef, updatedItem, { merge: true });
  }

  const list = getLocal<ActivityItem[]>(LOCAL_STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
  const index = list.findIndex((a) => a.id === updatedItem.id);
  if (index >= 0) {
    list[index] = updatedItem;
  } else {
    list.push(updatedItem);
  }
  setLocal(LOCAL_STORAGE_KEYS.ACTIVITIES, list);
}

export async function deleteActivity(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    await deleteDoc(doc(db, "activities", id));
  }
  const list = getLocal<ActivityItem[]>(LOCAL_STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
  setLocal(
    LOCAL_STORAGE_KEYS.ACTIVITIES,
    list.filter((a) => a.id !== id)
  );
}

export async function seedDefaultActivities(): Promise<void> {
  for (const act of DEFAULT_ACTIVITIES) {
    await saveActivity(act);
  }
}

// -------------------------------------------------------------
// ARTIKEL SERVICE (BLOG EDITOR)
// -------------------------------------------------------------
export async function getArticles(includeDrafts = true): Promise<ArticleItem[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "articles");
      const q = query(colRef, orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((d) => ({
        ...(d.data() as ArticleItem),
        id: d.id,
      }));
      if (items.length > 0) {
        return includeDrafts ? items : items.filter((a) => a.status === "published");
      }
    } catch (err) {
      console.warn("Firestore getArticles failed, using fallback:", err);
    }
  }

  const localList = getLocal<ArticleItem[]>(LOCAL_STORAGE_KEYS.ARTICLES, []);
  if (localList.length > 0) {
    return includeDrafts ? localList : localList.filter((a) => a.status === "published");
  }

  // Fallback otomatis ke Blogger feed jika Firestore / Local masih kosong
  try {
    const bloggerArticles = await getAllBloggerArticles();
    return bloggerArticles.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      featuredImage: b.featuredImage,
      status: "published" as const,
      date: b.date,
      tags: ["Blogger"],
    }));
  } catch (err) {
    console.error("Gagal memuat artikel fallback dari Blogger:", err);
    return [];
  }
}

export const ARTICLES_PER_PAGE = 6;

export async function getFirestoreArticleArchivePage(
  page: number,
  perPage = ARTICLES_PER_PAGE
): Promise<{ articles: ArticleItem[]; hasMore: boolean; total: number }> {
  const all = await getArticles(false); // published only
  const safePage = Math.max(1, page);
  const startIndex = (safePage - 1) * perPage;
  const articles = all.slice(startIndex, startIndex + perPage);
  const hasMore = startIndex + perPage < all.length;
  return {
    articles,
    hasMore,
    total: all.length,
  };
}

export async function getArticleByIdOrSlug(idOrSlug: string): Promise<ArticleItem | null> {
  if (db && isFirebaseConfigured()) {
    try {
      // Coba get by doc ID langsung
      const docRef = doc(db, "articles", idOrSlug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...(docSnap.data() as ArticleItem), id: docSnap.id };
      }

      // Jika tidak ketemu by id, cari berdasarkan slug
      const all = await getArticles(true);
      const found = all.find((a) => a.slug === idOrSlug || a.id === idOrSlug);
      if (found) return found;
    } catch (err) {
      console.warn("Firestore getArticleByIdOrSlug error:", err);
    }
  }

  const localList = getLocal<ArticleItem[]>(LOCAL_STORAGE_KEYS.ARTICLES, []);
  const localFound = localList.find((a) => a.id === idOrSlug || a.slug === idOrSlug);
  if (localFound) return localFound;

  // Fallback ke Blogger
  try {
    const bloggerItem = await getBloggerArticleBySlug(idOrSlug);
    if (bloggerItem) {
      return {
        id: bloggerItem.id,
        slug: bloggerItem.slug,
        title: bloggerItem.title,
        excerpt: bloggerItem.excerpt,
        content: bloggerItem.content,
        featuredImage: bloggerItem.featuredImage,
        status: "published",
        date: bloggerItem.date,
        tags: ["Blogger"],
      };
    }
  } catch {
    // ignore
  }

  return null;
}

export async function saveArticle(article: Partial<ArticleItem>): Promise<ArticleItem> {
  const slug =
    article.slug ||
    (article.title || "artikel")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const id = article.id || slug;
  const now = new Date().toISOString();

  const fullArticle: ArticleItem = {
    id,
    slug,
    title: article.title || "Tanpa Judul",
    excerpt: article.excerpt || "",
    content: article.content || "<p></p>",
    featuredImage: article.featuredImage || null,
    tags: article.tags || [],
    status: article.status || "published",
    date: article.date || now,
    createdAt: article.createdAt || now,
    updatedAt: now,
  };

  if (db && isFirebaseConfigured()) {
    const docRef = doc(db, "articles", id);
    await setDoc(docRef, fullArticle, { merge: true });
  }

  const list = getLocal<ArticleItem[]>(LOCAL_STORAGE_KEYS.ARTICLES, []);
  const index = list.findIndex((a) => a.id === id);
  if (index >= 0) {
    list[index] = fullArticle;
  } else {
    list.unshift(fullArticle);
  }
  setLocal(LOCAL_STORAGE_KEYS.ARTICLES, list);

  return fullArticle;
}

export async function deleteArticle(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    await deleteDoc(doc(db, "articles", id));
  }
  const list = getLocal<ArticleItem[]>(LOCAL_STORAGE_KEYS.ARTICLES, []);
  setLocal(
    LOCAL_STORAGE_KEYS.ARTICLES,
    list.filter((a) => a.id !== id)
  );
}

// ---------------------------------------------------------------------------
// 4. LOGIN ATTEMPTS AUDIT LOG
// ---------------------------------------------------------------------------

export type LoginLogItem = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  status: "success" | "blocked";
  reason?: string;
  timestamp: string;
};

export async function logLoginAttempt(entry: Omit<LoginLogItem, "id">): Promise<void> {
  const logId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const fullEntry: LoginLogItem = {
    ...entry,
    id: logId,
  };

  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "login_logs", logId);
      await setDoc(docRef, fullEntry);
    } catch (err) {
      console.error("Gagal mencatat log login ke Firestore:", err);
    }
  }

  // Backup in local storage if in browser
  const list = getLocal<LoginLogItem[]>("login_logs", []);
  list.unshift(fullEntry);
  if (list.length > 100) list.pop();
  setLocal("login_logs", list);
}

export async function getLoginLogs(limitCount = 50): Promise<LoginLogItem[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(collection(db, "login_logs"), orderBy("timestamp", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as LoginLogItem).slice(0, limitCount);
    } catch (err) {
      console.error("Gagal mengambil log login dari Firestore:", err);
    }
  }

  return getLocal<LoginLogItem[]>("login_logs", []).slice(0, limitCount);
}

export async function clearLoginLogs(): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      const snap = await getDocs(collection(db, "login_logs"));
      const deletePromises = snap.docs.map((d) => deleteDoc(d.ref));
      await Promise.all(deletePromises);
    } catch (err) {
      console.error("Gagal menghapus log login:", err);
    }
  }
  setLocal("login_logs", []);
}

