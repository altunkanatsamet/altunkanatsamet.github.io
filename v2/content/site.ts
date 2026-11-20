// Sitedeki tüm metinler burada. İçerik CV'den alındı; buraya eklenen her şey
// sayfalarda kullanılır.

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const person = {
  name: "Samet Altunkanat",
  email: "altunkanatsamet@gmail.com",
  github: "https://github.com/altunkanatsamet",
  linkedin: "https://linkedin.com/in/samet-altunkanat",
  site: "https://sametaltunkanat.me",
  timezone: "Europe/Istanbul",
};

export type Project = {
  slug: string;
  title: string;
  context: string;
  role: string;
  stack: string[];
  summary: string;
  points: string[];
  note?: string;
  keywords: string[];
  images?: { src: string; alt: string }[];
};

export type Job = {
  period: string;
  role: string;
  org: string;
  place: string;
  points: string[];
};

type Dictionary = {
  meta: { title: string; description: string };
  nav: { work: string; experience: string; about: string; contact: string };
  hero: { role: string; tagline: string; intro: string; ctaWork: string; ctaContact: string };
  sections: { work: string; experience: string; skills: string; about: string; contact: string };
  work: { open: string; caseLabel: { context: string; role: string; stack: string }; back: string; next: string; whatIDid: string; screens: string };
  about: { paragraphs: string[]; interestsTitle: string; interests: string[]; educationTitle: string; education: string; languagesTitle: string; languages: string; locationTitle: string; location: string };
  contact: { heading: string; sub: string; copy: string; copied: string };
  footer: { colophon: string; updated: string };
  menu: string;
  close: string;
  projects: Project[];
  jobs: Job[];
  skills: { group: string; items: string[] }[];
};

const tr: Dictionary = {
  meta: {
    title: "Samet Altunkanat — Web ve Mobil Geliştirici",
    description:
      "Selçuk Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisi. ASP.NET Core, Django ve React ile kurumsal web; Flutter ile mobil uygulamalar geliştiriyor.",
  },
  nav: { work: "İşler", experience: "Deneyim", about: "Hakkımda", contact: "İletişim" },
  hero: {
    role: "Bilgisayar Mühendisliği, son sınıf · Konya",
    tagline: "Fikirleri çalışan web ve mobil uygulamalara dönüştürüyorum",
    intro:
      "Selçuk Üniversitesi'nde son sınıftayım. Üniversitenin bilgi işlem biriminde yaklaşık 10 ay ASP.NET Core, Django ve React ile yazılım geliştirdim; boş zamanlarımda Flutter ile kendi uygulamalarımı yapıyorum.",
    ctaWork: "Seçili işler",
    ctaContact: "İletişime geç",
  },
  sections: {
    work: "Seçili işler",
    experience: "Deneyim",
    skills: "Yetkinlikler",
    about: "Hakkımda",
    contact: "İletişim",
  },
  work: {
    open: "Detay",
    caseLabel: { context: "Bağlam", role: "Rol", stack: "Teknolojiler" },
    back: "Tüm işler",
    next: "Sıradaki iş",
    whatIDid: "Neler yaptım",
    screens: "Ekranlar",
  },
  about: {
    paragraphs: [
      "Bir fikri alıp insanların gerçekten kullandığı bir uygulamaya dönüştürmekten keyif alıyorum. Veritabanı tasarımından arayüze kadar bir projenin her katmanında çalışmayı seviyorum; bir şeyi baştan sona kendim kurduğumda daha iyi öğreniyorum.",
      "Okul dışında Flutter ile kendi uygulamalarımı yazıyorum. Beslenme, su ve alışkanlık takibi için Vitalis'i yaptım; TÜBİTAK 2209-A kapsamında da afet anında insanların yardım isteyip birbirine ulaşabileceği bir mobil uygulama geliştirdim.",
      "Son zamanlarda en çok yerel LLM'ler ve yapay zekâ ajanları ilgimi çekiyor.",
    ],
    interestsTitle: "İlgi alanları",
    interests: ["Yerel LLM'ler", "Yapay zekâ ajanları", "LLM destekli kurumsal uygulamalar"],
    educationTitle: "Eğitim",
    education: "Selçuk Üniversitesi — Bilgisayar Mühendisliği (Lisans), 2023–2027",
    languagesTitle: "Diller",
    languages: "Türkçe (ana dil), İngilizce (B1)",
    locationTitle: "Konum",
    location: "Konya, Türkiye",
  },
  contact: {
    heading: "Bir proje, staj ya da iş için yazabilirsin",
    sub: "E-posta ya da LinkedIn üzerinden ulaşabilirsin",
    copy: "Kopyala",
    copied: "Kopyalandı",
  },
  footer: {
    colophon: "Geist ile dizildi, Next.js ile yapıldı",
    updated: "Son güncelleme: Kasım 2026",
  },
  menu: "Menü",
  close: "Kapat",
  projects: [
    {
      slug: "kalite-yonetim-sistemi",
      title: "Kalite Yönetim Sistemi",
      context: "Selçuk Üniversitesi Bilgi İşlem",
      role: "Stajyer mühendis, geliştirme ekibinde",
      stack: ["ASP.NET Core", "PostgreSQL", "EF Core", "React", "ECharts", "LDAP"],
      summary:
        "Üniversitelerin kalite süreçleri için rol-yetki yönetimi, KİDR/BİDR, patent ve paydaş katılımı modülleri ile Excel/PDF raporlama içeren kurumsal web uygulaması.",
      points: [
        "ASP.NET Core, PostgreSQL (Entity Framework Core, code-first) ve React ile geliştirdim.",
        "Kullanıcının birimine göre veri erişimini kısıtlayan satır düzeyi yetkilendirme (RLS) üzerinde çalıştım.",
        "Dekan onaylı çok aşamalı kayıt akışını ve LDAP ile merkezi girişi geliştirdim.",
        "Eğitim merkezleri, burslar ve bilimsel faaliyetler gibi modülleri yazdım.",
        "Diğer üniversite API'lerinden veri çeken entegrasyonları, ECharts ile performans panolarını ve Excel dışa aktarımını geliştirdim.",
      ],
      note: "Kurum içi bir proje olduğu için kaynak kodu ve ekran görüntüleri paylaşılamıyor.",
      keywords: ["RLS", "LDAP", "Onay akışı", "ECharts", "Excel"],
    },
    {
      slug: "hedef-sonuc-programi",
      title: "Selçuk Hedef–Sonuç Programı",
      context: "Selçuk Üniversitesi Bilgi İşlem",
      role: "Geliştirici",
      stack: ["Python", "Django", "MSSQL", "Bootstrap"],
      summary:
        "Akademisyenlerin dönemlik hedef ve sonuçlarını kanıt dosyalarıyla girip bölüm başkanı, dekan ve rektörlük kademelerinden onaylatabildiği performans takip portalı.",
      points: [
        "Hedef ve sonuçların kanıt dosyalarıyla girildiği, bölüm başkanı → dekan → rektörlük sırasıyla onaylanan akışı geliştirdim.",
        "Üniversitenin AVİD API'sinden yayın verilerini otomatik çeken entegrasyonu yazdım.",
        "CSV/PDF dışa aktarımını ve fakülte/bölüm toplam raporlarını hazırladım.",
      ],
      note: "Kurum içi bir proje olduğu için kaynak kodu ve ekran görüntüleri paylaşılamıyor.",
      keywords: ["3 kademeli onay", "AVİD API", "CSV/PDF", "Raporlar"],
    },
    {
      slug: "afet-yardim-platformu",
      title: "Afet Yardım Platformu",
      context: "TÜBİTAK 2209-A",
      role: "Proje yürütücüsü, geliştirici",
      stack: ["Flutter", "Firebase", "Google Maps API", "Riverpod"],
      summary:
        "Konum tabanlı yardım talebi, harita üzerinde talep takibi ve mesajlaşma sunan çok dilli mobil uygulama.",
      points: [
        "Kullanıcının konumuyla yardım talebi oluşturabildiği akışı geliştirdim.",
        "Talepleri Google Maps üzerinde gösteren ve takip etmeyi sağlayan harita ekranını yaptım.",
        "Uygulama içi mesajlaşmayı ve çok dilli arayüzü Firebase ve Riverpod üzerine kurdum.",
      ],
      keywords: ["Konum", "Harita", "Mesajlaşma", "Çok dilli"],
    },
    {
      slug: "vitalis",
      title: "Vitalis",
      context: "Kişisel proje",
      role: "Tasarım ve geliştirme",
      stack: ["Flutter", "Hive", "Riverpod", "OpenFoodFacts API"],
      summary:
        "Beslenme, su, alışkanlık, kilo ve görev takibini tek yerde toplayan offline-first mobil uygulama.",
      points: [
        "Beslenme, su, alışkanlık, kilo ve görev takibini tek uygulamada topladım.",
        "Verileri Hive ile cihazda saklayarak uygulamayı internet olmadan da çalışır hale getirdim.",
        "OpenFoodFacts API ile besin değeri sorgulamayı ekledim.",
      ],
      keywords: ["Offline-first", "Hive", "Besin değeri"],
      images: [
        { src: "/work/vitalis-home.jpg", alt: "Vitalis ana sayfa: kalori bütçesi ve su takibi" },
        { src: "/work/vitalis-planner.jpg", alt: "Vitalis planlayıcı: yeni görev ekleme" },
        { src: "/work/vitalis-login.jpg", alt: "Vitalis giriş ekranı" },
      ],
    },
  ],
  jobs: [
    {
      period: "Tem – Ağu 2026",
      role: "Stajyer Mühendis",
      org: "Selçuk Üniversitesi — Dijital Bilgi Teknolojileri ve Uygulama Birimi",
      place: "Konya",
      points: [
        "Üniversitenin Kalite Yönetim Sistemi'ni ASP.NET Core, PostgreSQL (EF Core, code-first) ve React ile geliştirdim.",
        "Birime göre veri erişimini kısıtlayan satır düzeyi yetkilendirme (RLS), dekan onaylı çok aşamalı kayıt akışı ve LDAP ile merkezi giriş üzerinde çalıştım.",
        "Eğitim merkezleri, burslar ve bilimsel faaliyetler modüllerini; diğer üniversite API'lerinden veri çekmeyi, ECharts panolarını ve Excel dışa aktarımını geliştirdim.",
      ],
    },
    {
      period: "Kas 2025 – Haz 2026",
      role: "Yarı Zamanlı Yazılım Geliştirici",
      org: "Selçuk Üniversitesi — Dijital Bilgi Teknolojileri ve Uygulama Birimi",
      place: "Konya",
      points: [
        "ERP otomasyonu ve kalite yönetim yazılımının geliştirme süreçlerinde çalıştım.",
        "Üniversitenin birim ve organizasyon yapısını sistemde izlenebilir bir hiyerarşi olarak modelleyip dijital ortama aktardım.",
      ],
    },
    {
      period: "Tem – Ağu 2025",
      role: "Stajyer Mühendis",
      org: "Adana Büyükşehir Belediyesi — Bilgi İşlem",
      place: "Adana",
      points: ["Bilgi işlem altyapısını ve iç yazılım süreçlerini inceledim; teknik sorunların çözümünde ekibe destek verdim."],
    },
  ],
  skills: [
    { group: "Diller", items: ["C#", "Python", "Dart", "JavaScript", "TypeScript", "SQL"] },
    { group: "Backend", items: ["ASP.NET Core", "Entity Framework Core", "Django", "REST API", "LDAP"] },
    { group: "Frontend / Mobil", items: ["React", "Vite", "Bootstrap", "ECharts", "Flutter", "Riverpod"] },
    { group: "Veritabanı", items: ["PostgreSQL", "MSSQL", "SQLite", "Firestore", "Hive"] },
    { group: "Mimari ve araçlar", items: ["Clean Architecture", "MVVM", "Repository Pattern", "Git", "GitHub"] },
  ],
};

const en: Dictionary = {
  meta: {
    title: "Samet Altunkanat — Web & Mobile Developer",
    description:
      "Senior Computer Engineering student at Selçuk University, building enterprise web apps with ASP.NET Core, Django and React, and mobile apps with Flutter.",
  },
  nav: { work: "Work", experience: "Experience", about: "About", contact: "Contact" },
  hero: {
    role: "Computer Engineering, senior year · Konya",
    tagline: "I turn ideas into working web and mobile apps",
    intro:
      "I'm a senior at Selçuk University. I spent about 10 months building software with ASP.NET Core, Django and React in the university's IT department, and in my free time I build my own apps with Flutter.",
    ctaWork: "Selected work",
    ctaContact: "Get in touch",
  },
  sections: {
    work: "Selected work",
    experience: "Experience",
    skills: "Skills",
    about: "About",
    contact: "Contact",
  },
  work: {
    open: "Details",
    caseLabel: { context: "Context", role: "Role", stack: "Stack" },
    back: "All work",
    next: "Next project",
    whatIDid: "What I did",
    screens: "Screens",
  },
  about: {
    paragraphs: [
      "I enjoy taking an idea and turning it into an app people actually use. I like working across every layer of a project, from database design to the interface; I learn best when I build something end to end myself.",
      "Outside school I write my own apps with Flutter. I built Vitalis for tracking nutrition, water and habits, and under the TÜBİTAK 2209-A programme I built a mobile app that lets people ask for and find help during a disaster.",
      "Lately I'm most interested in local LLMs and AI agents.",
    ],
    interestsTitle: "Interests",
    interests: ["Local LLMs", "AI agents", "LLM-powered enterprise apps"],
    educationTitle: "Education",
    education: "Selçuk University — B.Sc. Computer Engineering, 2023–2027",
    languagesTitle: "Languages",
    languages: "Turkish (native), English (B1)",
    locationTitle: "Based in",
    location: "Konya, Türkiye",
  },
  contact: {
    heading: "Write to me about a project, an internship or a job",
    sub: "You can reach me by email or on LinkedIn",
    copy: "Copy",
    copied: "Copied",
  },
  footer: {
    colophon: "Set in Geist, built with Next.js",
    updated: "Last updated: November 2026",
  },
  menu: "Menu",
  close: "Close",
  projects: [
    {
      slug: "kalite-yonetim-sistemi",
      title: "Quality Management System",
      context: "Selçuk University IT",
      role: "Engineering intern on the development team",
      stack: ["ASP.NET Core", "PostgreSQL", "EF Core", "React", "ECharts", "LDAP"],
      summary:
        "Enterprise web application for university quality processes, with role-based access control, institutional and unit self-evaluation reports, patent and stakeholder engagement modules, and Excel/PDF reporting.",
      points: [
        "Built with ASP.NET Core, PostgreSQL (Entity Framework Core, code-first) and React.",
        "Worked on row-level security (RLS) that restricts data access by the user's unit.",
        "Built a multi-stage approval workflow requiring dean sign-off, and centralized LDAP sign-in.",
        "Wrote modules such as training centers, scholarships and scientific activities.",
        "Integrated data from other university APIs; built ECharts performance dashboards and Excel exports.",
      ],
      note: "This is an internal project, so source code and screenshots can't be shared.",
      keywords: ["RLS", "LDAP", "Approval flow", "ECharts", "Excel"],
    },
    {
      slug: "hedef-sonuc-programi",
      title: "Goal–Outcome Tracking Portal",
      context: "Selçuk University IT",
      role: "Developer",
      stack: ["Python", "Django", "MSSQL", "Bootstrap"],
      summary:
        "A performance tracking portal where faculty members submit term goals and outcomes with supporting evidence, approved through department head, dean and rectorate levels.",
      points: [
        "Built the flow where goals and outcomes are submitted with evidence and approved by department head → dean → rectorate.",
        "Wrote the integration that automatically pulls publication data from the university's AVİD API.",
        "Implemented CSV/PDF exports and aggregated department and faculty reports.",
      ],
      note: "This is an internal project, so source code and screenshots can't be shared.",
      keywords: ["3-level approval", "AVİD API", "CSV/PDF", "Reports"],
    },
    {
      slug: "afet-yardim-platformu",
      title: "Disaster Relief Platform",
      context: "TÜBİTAK 2209-A",
      role: "Principal investigator, developer",
      stack: ["Flutter", "Firebase", "Google Maps API", "Riverpod"],
      summary: "Multilingual mobile app offering location-based help requests, map-based request tracking and in-app messaging.",
      points: [
        "Built the flow for creating a help request from the user's location.",
        "Built the map screen that shows and tracks requests on Google Maps.",
        "Built in-app messaging and the multilingual interface on Firebase and Riverpod.",
      ],
      keywords: ["Location", "Map", "Messaging", "Multilingual"],
    },
    {
      slug: "vitalis",
      title: "Vitalis",
      context: "Personal project",
      role: "Design and development",
      stack: ["Flutter", "Hive", "Riverpod", "OpenFoodFacts API"],
      summary: "An offline-first mobile app that brings nutrition, water, habit, weight and task tracking together.",
      points: [
        "Combined nutrition, water, habit, weight and task tracking in one app.",
        "Stored data on device with Hive so the app works without a connection.",
        "Added nutrition lookups through the OpenFoodFacts API.",
      ],
      keywords: ["Offline-first", "Hive", "Nutrition data"],
      images: [
        { src: "/work/vitalis-home.jpg", alt: "Vitalis home: calorie budget and water tracking" },
        { src: "/work/vitalis-planner.jpg", alt: "Vitalis planner: adding a new task" },
        { src: "/work/vitalis-login.jpg", alt: "Vitalis sign-in screen" },
      ],
    },
  ],
  jobs: [
    {
      period: "Jul – Aug 2026",
      role: "Software Engineering Intern",
      org: "Selçuk University — Digital Information Technologies and Application Unit",
      place: "Konya",
      points: [
        "Developed the university's Quality Management System with ASP.NET Core, PostgreSQL (EF Core, code-first) and React.",
        "Worked on row-level security by unit, a multi-stage approval workflow requiring dean sign-off, and centralized LDAP authentication.",
        "Built training center, scholarship and scientific activity modules; integrated other university APIs; created ECharts dashboards and Excel exports.",
      ],
    },
    {
      period: "Nov 2025 – Jun 2026",
      role: "Part-Time Software Developer",
      org: "Selçuk University — Digital Information Technologies and Application Unit",
      place: "Konya",
      points: [
        "Contributed to ERP automation and quality management software.",
        "Modeled the university's units as a traceable hierarchy and digitized its organizational structure.",
      ],
    },
    {
      period: "Jul – Aug 2025",
      role: "Engineering Intern",
      org: "Adana Metropolitan Municipality — IT Department",
      place: "Adana",
      points: ["Studied the IT infrastructure and internal software processes; supported the team in resolving technical issues."],
    },
  ],
  skills: [
    { group: "Languages", items: ["C#", "Python", "Dart", "JavaScript", "TypeScript", "SQL"] },
    { group: "Backend", items: ["ASP.NET Core", "Entity Framework Core", "Django", "REST API", "LDAP"] },
    { group: "Frontend / Mobile", items: ["React", "Vite", "Bootstrap", "ECharts", "Flutter", "Riverpod"] },
    { group: "Databases", items: ["PostgreSQL", "MSSQL", "SQLite", "Firestore", "Hive"] },
    { group: "Architecture & tools", items: ["Clean Architecture", "MVVM", "Repository Pattern", "Git", "GitHub"] },
  ],
};

export const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

