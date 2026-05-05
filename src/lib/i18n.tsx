import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type Lang = "ar" | "en" | "tr" | "es" | "de" | "fr";

export const LANGUAGES: {
  code: Lang;
  label: string;
  native: string;
  dir: "ltr" | "rtl";
  flage: string;
}[] = [
  {
    code: "ar",
    label: "Arabic",
    native: "العربية",
    dir: "rtl",
    flage:
      "https://opengraph.githubassets.com/f37a1ec71a1408eaaf1b293f6e5e61c9c13c73b2ee4ed41ec5a99ef02078e61e/Mahmoudm15m/CimaBox",
  },
  { code: "en", label: "English", native: "English", dir: "ltr", flage: "🇬🇧" },
  { code: "tr", label: "Turkish", native: "Türkçe", dir: "ltr", flage: "🇹🇷" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr", flage: "🇪🇸" },
  { code: "de", label: "German", native: "Deutsch", dir: "ltr", flage: "🇩🇪" },
  { code: "fr", label: "French", native: "Français", dir: "ltr", flage: "🇫🇷" },
];

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.features": "Features",
  "nav.statistics": "Statistics",
  "nav.dashboard": "Dashboard",
  "nav.invite": "Invite Bot",
  "nav.language": "Language",
  "nav.theme": "Theme",
  // Hero
  "hero.badge": "A Spiritual Discord Companion",
  "hero.title1": "Quran Radio",
  "hero.title2": "Bot",
  "hero.desc":
    "24/7 Qur'an recitation streaming, daily morning & evening Azkar, and accurate prayer times — bringing tranquility to thousands of Discord servers worldwide.",
  "hero.cta.add": "Add to Discord",
  "hero.cta.explore": "Explore Features",
  // Features
  "features.eyebrow": "Features",
  "features.title1": "More than just a bot —",
  "features.title2": "a complete spiritual experience",
  "features.subtitle":
    "Every feature crafted with care, helping your community draw closer to Allah throughout the day.",
  "feature.radio.title": "Quran Radio Streaming",
  "feature.radio.desc":
    "Continuous 24/7 recitation from world-renowned Qaris, streamed directly into your voice channels with crystal-clear quality.",
  "feature.azkar.title": "Morning & Evening Azkar",
  "feature.azkar.desc":
    "Authentic daily remembrances delivered at the right times — never miss the Adhkar that protect and uplift the heart.",
  "feature.prayer.title": "Prayer Times & Adhan",
  "feature.prayer.desc":
    "Precise prayer schedules for any city, with the Adhan called automatically at every Salah — for the whole community.",
  // Quote
  "quote.translation":
    '"Verily, in the remembrance of Allah do hearts find rest."',
  "quote.source": "— Surah Ar-Ra'd, 13:28",
  "quote.body":
    "Quran Radio brings the timeless beauty of recitation into your daily life — a constant companion of remembrance, peace, and connection with your community.",
  "quote.tag.peace": "Peace of Heart",
  "quote.tag.remembrance": "Remembrance",
  "quote.tag.community": "Spiritual Community",
  // LiveStats
  "stats.live": "Live",
  "stats.offline": "Offline",
  "stats.title1": "Live Bot",
  "stats.title2": "Statistics",
  "stats.connecting": "Connecting…",
  "stats.error": "Live updates paused — check connection.",
  "stats.retryLater": "Connection lost. Retrying later…",
  "stats.subtitle": "Real-time numbers, refreshed every 5 seconds.",
  "stats.errorBox":
    "Couldn't reach the stats endpoint. We'll retry automatically.",
  "stat.totalServers": "Total Servers",
  "stat.totalUsers": "Total Users",
  "stat.totalChannels": "Total Channels",
  "stat.totalRadios": "Total Radios",
  "stat.activeRadios": "Active Radios",
  "stat.activeListeners": "Active Listeners",
  "stat.activeShards": "Active Shards",
  "stat.averagePing": "Average Ping",
  "stat.averageUptime": "Average Uptime",
  // CTA
  "cta.badge": "Free Forever",
  "cta.title1": "Add the bot to your",
  "cta.title2": "server today",
  "cta.desc":
    "Join thousands of communities already enriched by daily recitation, remembrance, and prayer.",
  "cta.button": "Invite Bot to Discord",
  // Footer
  "footer.tagline":
    "A spiritual companion for your Discord community — bringing the recitation of the Holy Qur'an to every server.",
  "footer.navigate": "Navigate",
  "footer.reflection": "Reflection",
  "footer.reflectionEn":
    '"And We send down of the Qur\'an that which is healing and mercy." — 17:82',
  "footer.copyright": "Made with reverence.",
  "footer.ummah": "Built for the Ummah.",
  // Dashboard
  "dash.eyebrow": "Live Monitoring",
  "dash.title": "Bot Dashboard",
  "dash.subtitle":
    "Performance, shards, and active broadcasts — refreshed every 5 seconds.",
  "dash.tab.statistics": "Statistics",
  "dash.tab.shards": "Shards",
  "dash.tab.broadcasts": "Broadcasts",
  "dash.tab.lookup": "Shard Lookup",
  "dash.online": "Online",
  "dash.reconnecting": "Reconnecting…",
  "dash.home": "Home",
  "dash.invite": "Invite",
  "dash.shard": "Shard",
  "dash.guilds": "Guilds",
  "dash.users": "Users",
  "dash.channels": "Channels",
  "dash.uptime": "Uptime",
  "dash.noShards": "No shard data available.",
  "dash.broadcasts.title": "Broadcasts",
  "dash.broadcasts.desc":
    "Active radio sessions across all servers will appear here — coming soon.",
  // Lookup
  "lookup.title": "Shard Lookup",
  "lookup.desc":
    "Find which shard a Discord server belongs to using its Guild ID.",
  "lookup.placeholder": "Enter Server ID",
  "lookup.button": "Find Shard",
  "lookup.serverId": "Server ID",
  "lookup.shard": "Shard",
  "lookup.guildsInShard": "Guilds in shard",
  "lookup.status": "Status",
  "lookup.online": "Online",
  "lookup.copy": "Copy",
  "lookup.copied": "Copied!",
  "lookup.err.empty": "Please enter a Server ID",
  "lookup.err.invalid": "Invalid Server ID",
  "lookup.offline": "Offline",
  "lookup.notfound": "Not Found",
  "lookup.serverName": "Server Name",
  "lookup.members": "Members",
  "lookup.apiError": "API Error",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.features": "المميزات",
  "nav.statistics": "الإحصائيات",
  "nav.dashboard": "لوحة التحكم",
  "nav.invite": "إضافة البوت",
  "nav.language": "اللغة",
  "nav.theme": "المظهر",
  "hero.badge": "رفيق روحاني على ديسكورد",
  "hero.title1": "إذاعة القرآن",
  "hero.title2": "بوت",
  "hero.desc":
    "بث تلاوة القرآن الكريم على مدار الساعة، أذكار الصباح والمساء يومياً، ومواقيت صلاة دقيقة — يجلب السكينة لآلاف خوادم ديسكورد حول العالم.",
  "hero.cta.add": "أضِف إلى ديسكورد",
  "hero.cta.explore": "استكشف المميزات",
  "features.eyebrow": "المميزات",
  "features.title1": "أكثر من مجرد بوت —",
  "features.title2": "تجربة روحانية متكاملة",
  "features.subtitle":
    "كل ميزة صُمّمت بعناية لتقرّب مجتمعك إلى الله طوال اليوم.",
  "feature.radio.title": "بث إذاعة القرآن",
  "feature.radio.desc":
    "تلاوة مستمرة على مدار الساعة من كبار القراء في العالم، تُبث مباشرة في القنوات الصوتية بجودة عالية.",
  "feature.azkar.title": "أذكار الصباح والمساء",
  "feature.azkar.desc":
    "أذكار يومية صحيحة تُرسل في أوقاتها — لا تفوّت الأذكار التي تحفظ القلب وترفعه.",
  "feature.prayer.title": "مواقيت الصلاة والأذان",
  "feature.prayer.desc":
    "مواقيت صلاة دقيقة لأي مدينة، مع رفع الأذان تلقائياً عند كل صلاة — للمجتمع كله.",
  "quote.translation": '"ألا بذكر الله تطمئن القلوب"',
  "quote.source": "— سورة الرعد، ١٣:٢٨",
  "quote.body":
    "إذاعة القرآن تجلب جمال التلاوة الخالد إلى حياتك اليومية — رفيق دائم للذكر والسكينة والتواصل مع مجتمعك.",
  "quote.tag.peace": "طمأنينة القلب",
  "quote.tag.remembrance": "الذِّكر",
  "quote.tag.community": "مجتمع روحاني",
  "stats.live": "مباشر",
  "stats.offline": "غير متصل",
  "stats.title1": "إحصائيات",
  "stats.title2": "البوت المباشرة",
  "stats.connecting": "جارٍ الاتصال…",
  "stats.error": "التحديث المباشر متوقف — تحقق من الاتصال.",
  "stats.retryLater": "انقطع الاتصال. سنحاول لاحقاً…",
  "stats.subtitle": "أرقام لحظية تُحدَّث كل ٥ ثوانٍ.",
  "stats.errorBox": "تعذّر الوصول إلى نقطة الإحصائيات. سنحاول تلقائياً.",
  "stat.totalServers": "إجمالي الخوادم",
  "stat.totalUsers": "إجمالي المستخدمين",
  "stat.totalChannels": "إجمالي القنوات",
  "stat.totalRadios": "إجمالي الإذاعات",
  "stat.activeRadios": "الإذاعات النشطة",
  "stat.activeListeners": "المستمعون النشطون",
  "stat.activeShards": "الـ Shards النشطة",
  "stat.averagePing": "متوسط البِنغ",
  "stat.averageUptime": "متوسط التشغيل",
  "cta.badge": "مجاني للأبد",
  "cta.title1": "أضِف البوت إلى",
  "cta.title2": "خادمك اليوم",
  "cta.desc": "انضم لآلاف المجتمعات التي أثرتها التلاوة والذكر والصلاة يومياً.",
  "cta.button": "أضف البوت إلى ديسكورد",
  "footer.tagline":
    "رفيق روحاني لمجتمع ديسكورد الخاص بك — يجلب تلاوة القرآن الكريم إلى كل خادم.",
  "footer.navigate": "تصفح",
  "footer.reflection": "تأمل",
  "footer.reflectionEn": '"وننزّل من القرآن ما هو شفاء ورحمة" — ١٧:٨٢',
  "footer.copyright": "صُنع بإجلال.",
  "footer.ummah": "بُني لخدمة الأمة.",
  "dash.eyebrow": "مراقبة مباشرة",
  "dash.title": "لوحة تحكم البوت",
  "dash.subtitle": "الأداء والـ Shards والبث النشط — يُحدَّث كل ٥ ثوانٍ.",
  "dash.tab.statistics": "الإحصائيات",
  "dash.tab.shards": "الـ Shards",
  "dash.tab.broadcasts": "البث",
  "dash.tab.lookup": "بحث الـ Shard",
  "dash.online": "متصل",
  "dash.reconnecting": "إعادة الاتصال…",
  "dash.home": "الرئيسية",
  "dash.invite": "إضافة",
  "dash.shard": "Shard",
  "dash.guilds": "الخوادم",
  "dash.users": "المستخدمون",
  "dash.channels": "القنوات",
  "dash.uptime": "التشغيل",
  "dash.noShards": "لا توجد بيانات Shards.",
  "dash.broadcasts.title": "البث",
  "dash.broadcasts.desc":
    "جلسات الراديو النشطة عبر كل الخوادم ستظهر هنا — قريباً.",
  "lookup.title": "بحث عن الـ Shard",
  "lookup.desc":
    "اعرف إلى أي Shard ينتمي خادم ديسكورد من خلال معرّف الخادم (Guild ID).",
  "lookup.placeholder": "أدخل معرّف الخادم",
  "lookup.button": "ابحث عن الـ Shard",
  "lookup.serverId": "معرّف الخادم",
  "lookup.shard": "الـ Shard",
  "lookup.guildsInShard": "عدد الخوادم في هذا الـ Shard",
  "lookup.status": "الحالة",
  "lookup.online": "متصل",
  "lookup.copy": "نسخ",
  "lookup.copied": "تم النسخ!",
  "lookup.err.empty": "الرجاء إدخال معرّف الخادم",
  "lookup.err.invalid": "معرّف خادم غير صالح",
  "lookup.offline": "غير متصل",
  "lookup.notfound": "غير موجود",
  "lookup.serverName": "اسم السيرفر",
  "lookup.members": "الأعضاء",
  "lookup.apiError": "خطأ في السيرفر",
};

const tr: Dict = {
  // Nav
  "nav.home": "Ana Sayfa",
  "nav.features": "Özellikler",
  "nav.statistics": "İstatistikler",
  "nav.dashboard": "Panel",
  "nav.invite": "Botu Davet Et",
  "nav.language": "Dil",
  "nav.theme": "Tema",
  // Hero
  "hero.badge": "Manevi Bir Discord Yoldaşı",
  "hero.title1": "Kuran Radyo",
  "hero.title2": "Botu",
  "hero.desc":
    "7/24 kesintisiz Kur'an-ı Kerim yayını, günlük sabah ve akşam zikirleri ve doğru namaz vakitleri — dünya çapında binlerce Discord sunucusuna huzur getiriyor.",
  "hero.cta.add": "Discord'a Ekle",
  "hero.cta.explore": "Özellikleri Keşfet",
  // Features
  "features.eyebrow": "Özellikler",
  "features.title1": "Sadece bir bottan fazlası —",
  "features.title2": "tam bir manevi deneyim",
  "features.subtitle":
    "Her özellik özenle tasarlandı, topluluğunuzun gün boyunca Allah'a yakınlaşmasına yardımcı olur.",
  "feature.radio.title": "Kuran Radyo Yayını",
  "feature.radio.desc":
    "Dünyaca ünlü kârilerden 7/24 kesintisiz tilavet, kristal netliğinde ses kalitesiyle doğrudan ses kanallarınıza aktarılır.",
  "feature.azkar.title": "Sabah ve Akşam Zikirleri",
  "feature.azkar.desc":
    "Doğru zamanlarda iletilen sahih günlük zikirler — kalbi koruyan ve yücelten ezkarları asla kaçırmayın.",
  "feature.prayer.title": "Namaz Vakitleri ve Ezan",
  "feature.prayer.desc":
    "Herhangi bir şehir için hassas namaz vakitleri, her vakitte otomatik olarak okunan Ezan — tüm topluluk için.",
  // Quote
  "quote.translation":
    '"Bilesiniz ki, kalpler ancak Allah\'ı anmakla huzur bulur."',
  "quote.source": "— Rad Suresi, 13:28",
  "quote.body":
    "Kuran Radyo, tilavetin zamansız güzelliğini günlük hayatınıza taşır — zikir, huzur ve topluluğunuzla bağ kurmanız için daimi bir yoldaş.",
  "quote.tag.peace": "Kalp Huzuru",
  "quote.tag.remembrance": "Zikir",
  "quote.tag.community": "Manevi Topluluk",
  // LiveStats
  "stats.live": "Canlı",
  "stats.offline": "Çevrimdışı",
  "stats.title1": "Canlı Bot",
  "stats.title2": "İstatistikleri",
  "stats.connecting": "Bağlanıyor…",
  "stats.error": "Canlı güncellemeler durduruldu — bağlantıyı kontrol edin.",
  "stats.retryLater": "Bağlantı kesildi. Daha sonra tekrar deneniyor…",
  "stats.subtitle": "Gerçek zamanlı veriler, her 5 saniyede bir yenilenir.",
  "stats.errorBox":
    "İstatistik sunucusuna ulaşılamadı. Otomatik olarak tekrar denenecek.",
  "stat.totalServers": "Toplam Sunucu",
  "stat.totalUsers": "Toplam Kullanıcı",
  "stat.totalChannels": "Toplam Kanal",
  "stat.totalRadios": "Toplam Radyo",
  "stat.activeRadios": "Aktif Radyolar",
  "stat.activeListeners": "Aktif Dinleyiciler",
  "stat.activeShards": "Aktif Shardlar",
  "stat.averagePing": "Ortalama Gecikme",
  "stat.averageUptime": "Çalışma Süresi",
  // CTA
  "cta.badge": "Sonsuza Dek Ücretsiz",
  "cta.title1": "Botu bugün",
  "cta.title2": "sunucuna ekle",
  "cta.desc":
    "Günlük tilavet, zikir ve dualarla zenginleşen binlerce topluluğa katılın.",
  "cta.button": "Botu Discord'a Davet Et",
  // Footer
  "footer.tagline":
    "Discord topluluğunuz için manevi bir yoldaş — Kur'an-ı Kerim tilavetini her sunucuya taşıyoruz.",
  "footer.navigate": "Gezinti",
  "footer.reflection": "Tefekkür",
  "footer.reflectionEn":
    "\"Biz Kur'an'dan öyle bir şey indiriyoruz ki o, müminler için şifa ve rahmettir.\" — 17:82",
  "footer.copyright": "Hürmetle hazırlandı.",
  "footer.ummah": "Ümmet için inşa edildi.",
  // Dashboard
  "dash.eyebrow": "Canlı İzleme",
  "dash.title": "Bot Paneli",
  "dash.subtitle":
    "Performans, shardlar ve aktif yayınlar — her 5 saniyede bir yenilenir.",
  "dash.tab.statistics": "İstatistikler",
  "dash.tab.shards": "Shardlar",
  "dash.tab.broadcasts": "Yayınlar",
  "dash.tab.lookup": "Shard Sorgulama",
  "dash.online": "Çevrimiçi",
  "dash.reconnecting": "Yeniden bağlanıyor…",
  "dash.home": "Ana Sayfa",
  "dash.invite": "Davet Et",
  "dash.shard": "Shard",
  "dash.guilds": "Sunucular",
  "dash.users": "Kullanıcılar",
  "dash.channels": "Kanallar",
  "dash.uptime": "Çalışma Süresi",
  "dash.noShards": "Shard verisi bulunamadı.",
  "dash.broadcasts.title": "Yayınlar",
  "dash.broadcasts.desc":
    "Tüm sunuculardaki aktif radyo oturumları burada görünecek — yakında.",
  // Lookup
  "lookup.title": "Shard Sorgulama",
  "lookup.desc":
    "Bir Discord sunucusunun hangi sharda ait olduğunu Sunucu Kimliği (ID) ile bulun.",
  "lookup.placeholder": "Sunucu ID Girin",
  "lookup.button": "Shardı Bul",
  "lookup.serverId": "Sunucu ID",
  "lookup.shard": "Shard",
  "lookup.guildsInShard": "Shard'daki sunucular",
  "lookup.status": "Durum",
  "lookup.online": "Çevrimiçi",
  "lookup.copy": "Kopyala",
  "lookup.copied": "Kopyalandı!",
  "lookup.err.empty": "Lütfen bir Sunucu ID girin",
  "lookup.err.invalid": "Geçersiz Sunucu ID",
  "lookup.offline": "Çevrimdışı",
  "lookup.notfound": "Bulunamadı",
  "lookup.serverName": "Sunucu Adı",
  "lookup.members": "Üyeler",
  "lookup.apiError": "API Hatası",
};

const es: Dict = {
  // Nav
  "nav.home": "Inicio",
  "nav.features": "Características",
  "nav.statistics": "Estadísticas",
  "nav.dashboard": "Panel de Control",
  "nav.invite": "Invitar Bot",
  "nav.language": "Idioma",
  "nav.theme": "Tema",
  // Hero
  "hero.badge": "Un Compañero Espiritual para Discord",
  "hero.title1": "Radio",
  "hero.title2": "Corán",
  "hero.desc":
    "Transmisión de recitaciones del Corán 24/7, Azkar matutinos y vespertinos, y horarios de oración precisos — llevando tranquilidad a miles de servidores de Discord en todo el mundo.",
  "hero.cta.add": "Añadir a Discord",
  "hero.cta.explore": "Explorar Funciones",
  // Features
  "features.eyebrow": "Características",
  "features.title1": "Más que un simple bot —",
  "features.title2": "una experiencia espiritual completa",
  "features.subtitle":
    "Cada función diseñada con cuidado, ayudando a su comunidad a acercarse a Allah durante todo el día.",
  "feature.radio.title": "Streaming de Radio Corán",
  "feature.radio.desc":
    "Recitación continua 24/7 de Qaris de renombre mundial, transmitida directamente a sus canales de voz con una calidad impecable.",
  "feature.azkar.title": "Azkar de la Mañana y Tarde",
  "feature.azkar.desc":
    "Súplicas diarias auténticas entregadas en los momentos adecuados — nunca pierda los Adhkar que protegen y elevan el corazón.",
  "feature.prayer.title": "Horarios de Oración y Adhan",
  "feature.prayer.desc":
    "Horarios de oración precisos para cualquier ciudad, con el Adhan sonando automáticamente en cada Salah.",
  // Quote
  "quote.translation":
    '"Ciertamente, en el recuerdo de Allah encuentran descanso los corazones."',
  "quote.source": "— Sura Ar-Ra'd, 13:28",
  "quote.body":
    "Radio Corán trae la belleza eterna de la recitación a su vida diaria — un compañero constante de recuerdo, paz y conexión.",
  "quote.tag.peace": "Paz del Corazón",
  "quote.tag.remembrance": "Recuerdo",
  "quote.tag.community": "Comunidad Espiritual",
  // LiveStats
  "stats.live": "En Vivo",
  "stats.offline": "Desconectado",
  "stats.title1": "Estadísticas en Vivo",
  "stats.title2": "del Bot",
  "stats.connecting": "Conectando…",
  "stats.error": "Actualizaciones pausadas — verifique la conexión.",
  "stats.retryLater": "Conexión perdida. Reintentando más tarde…",
  "stats.subtitle": "Números en tiempo real, actualizados cada 5 segundos.",
  "stats.errorBox":
    "No se pudo conectar con el servidor de estadísticas. Reintentando automáticamente.",
  "stat.totalServers": "Servidores Totales",
  "stat.totalUsers": "Usuarios Totales",
  "stat.totalChannels": "Canales Totales",
  "stat.totalRadios": "Radios Totales",
  "stat.activeRadios": "Radios Activas",
  "stat.activeListeners": "Oyentes Activos",
  "stat.activeShards": "Shards Activos",
  "stat.averagePing": "Ping Promedio",
  "stat.averageUptime": "Tiempo de Actividad",
  // CTA
  "cta.badge": "Gratis para Siempre",
  "cta.title1": "Añade el bot a tu",
  "cta.title2": "servidor hoy",
  "cta.desc":
    "Únete a miles de comunidades enriquecidas por la recitación diaria, el recuerdo y la oración.",
  "cta.button": "Invitar Bot a Discord",
  // Footer
  "footer.tagline":
    "Un compañero espiritual para tu comunidad de Discord — llevando la recitación del Noble Corán a cada servidor.",
  "footer.navigate": "Navegar",
  "footer.reflection": "Reflexión",
  "footer.reflectionEn":
    '"Y enviamos del Corán aquello que es curación y misericordia." — 17:82',
  "footer.copyright": "Hecho con reverencia.",
  "footer.ummah": "Construido para la Ummah.",
  // Dashboard
  "dash.eyebrow": "Monitoreo en Vivo",
  "dash.title": "Panel del Bot",
  "dash.subtitle":
    "Rendimiento, shards y transmisiones activas — actualizado cada 5 segundos.",
  "dash.tab.statistics": "Estadísticas",
  "dash.tab.shards": "Shards",
  "dash.tab.broadcasts": "Transmisiones",
  "dash.tab.lookup": "Búsqueda de Shard",
  "dash.online": "En línea",
  "dash.reconnecting": "Reconectando…",
  "dash.home": "Inicio",
  "dash.invite": "Invitar",
  "dash.shard": "Shard",
  "dash.guilds": "Servidores",
  "dash.users": "Usuarios",
  "dash.channels": "Canal",
  "dash.uptime": "Tiempo",
  "dash.noShards": "No hay datos de shards disponibles.",
  "dash.broadcasts.title": "Transmisiones",
  "dash.broadcasts.desc": "Sesiones activas aparecerán aquí próximamente.",
  // Lookup
  "lookup.title": "Búsqueda de Shard",
  "lookup.desc":
    "Encuentra a qué shard pertenece un servidor usando su ID de Servidor.",
  "lookup.placeholder": "Ingresa ID del Servidor",
  "lookup.button": "Buscar Shard",
  "lookup.serverId": "ID del Servidor",
  "lookup.shard": "Shard",
  "lookup.guildsInShard": "Servidores en shard",
  "lookup.status": "Estado",
  "lookup.online": "En línea",
  "lookup.copy": "Copiar",
  "lookup.copied": "¡Copiado!",
  "lookup.err.empty": "Por favor ingresa un ID de Servidor",
  "lookup.err.invalid": "ID de Servidor inválido",
  "lookup.offline": "Desconectado",
  "lookup.notfound": "No encontrado",
  "lookup.serverName": "Nombre del servidor",
  "lookup.members": "Miembros",
  "lookup.apiError": "Error de API",
};
const de: Dict = {
  // Nav
  "nav.home": "Startseite",
  "nav.features": "Funktionen",
  "nav.statistics": "Statistiken",
  "nav.dashboard": "Dashboard",
  "nav.invite": "Bot einladen",
  "nav.language": "Sprache",
  "nav.theme": "Design",
  // Hero
  "hero.badge": "Ein spiritueller Discord-Begleiter",
  "hero.title1": "Koran-Radio",
  "hero.title2": "Bot",
  "hero.desc":
    "24/7 Koran-Rezitation-Streaming, tägliches Morgen- & Abend-Azkar und präzise Gebetszeiten — bringt Ruhe auf tausende Discord-Server weltweit.",
  "hero.cta.add": "Zu Discord hinzufügen",
  "hero.cta.explore": "Funktionen erkunden",
  // Features
  "features.eyebrow": "Funktionen",
  "features.title1": "Mehr als nur ein Bot —",
  "features.title2": "eine vollständige spirituelle Erfahrung",
  "features.subtitle":
    "Jede Funktion mit Sorgfalt entwickelt, um Ihrer Community zu helfen, Allah den ganzen Tag über näher zu kommen.",
  "feature.radio.title": "Koran Radio Streaming",
  "feature.radio.desc":
    "Kontinuierliche 24/7-Rezitation von weltberühmten Rezitatoren (Qaris), direkt in Ihre Sprachkanäle in kristallklarer Qualität gestreamt.",
  "feature.azkar.title": "Morgen- & Abend-Azkar",
  "feature.azkar.desc":
    "Authentische tägliche Gedenksprüche zur richtigen Zeit — verpassen Sie nie die Adhkar, die das Herz schützen und stärken.",
  "feature.prayer.title": "Gebetszeiten & Adhan",
  "feature.prayer.desc":
    "Präzise Gebetspläne für jede Stadt, wobei der Adhan automatisch bei jedem Salah gerufen wird.",
  // Quote
  "quote.translation":
    '"Wahrlich, im Gedenken an Allah finden die Herzen Ruhe."',
  "quote.source": "— Sure Ar-Ra'd, 13:28",
  "quote.body":
    "Koran Radio bringt die zeitlose Schönheit der Rezitation in Ihren Alltag — ein ständiger Begleiter des Gedenkens, des Friedens und der Verbundenheit.",
  "quote.tag.peace": "Seelenfrieden",
  "quote.tag.remembrance": "Gedenken",
  "quote.tag.community": "Spirituelle Gemeinschaft",
  // LiveStats
  "stats.live": "Live",
  "stats.offline": "Offline",
  "stats.title1": "Live Bot-Statistiken",
  "stats.title2": "",
  "stats.connecting": "Verbindung wird hergestellt…",
  "stats.error": "Live-Updates pausiert — Verbindung prüfen.",
  "stats.retryLater": "Verbindung verloren. Erneuter Versuch später…",
  "stats.subtitle": "Echtzeit-Zahlen, alle 5 Sekunden aktualisiert.",
  "stats.errorBox":
    "Statistik-Endpunkt nicht erreichbar. Automatischer Wiederholungsversuch.",
  "stat.totalServers": "Server insgesamt",
  "stat.totalUsers": "Nutzer insgesamt",
  "stat.totalChannels": "Kanäle insgesamt",
  "stat.totalRadios": "Radios insgesamt",
  "stat.activeRadios": "Aktive Radios",
  "stat.activeListeners": "Aktive Hörer",
  "stat.activeShards": "Aktive Shards",
  "stat.averagePing": "Durchschn. Ping",
  "stat.averageUptime": "Durchschn. Uptime",
  // CTA
  "cta.badge": "Ewig Kostenlos",
  "cta.title1": "Füge den Bot heute",
  "cta.title2": "deinem Server hinzu",
  "cta.desc":
    "Schließen Sie sich tausenden Communities an, die bereits durch tägliche Rezitation und Gebet bereichert wurden.",
  "cta.button": "Bot zu Discord einladen",
  // Footer
  "footer.tagline":
    "Ein spiritueller Begleiter für deine Discord-Community — bringt die Rezitation des Heiligen Korans auf jeden Server.",
  "footer.navigate": "Navigation",
  "footer.reflection": "Reflexion",
  "footer.reflectionEn":
    '"Und Wir senden vom Koran das hinab, was Heilung und Barmherzigkeit ist." — 17:82',
  "footer.copyright": "Mit Ehrfurcht erstellt.",
  "footer.ummah": "Für die Ummah entwickelt.",
  // Dashboard
  "dash.eyebrow": "Live-Überwachung",
  "dash.title": "Bot Dashboard",
  "dash.subtitle":
    "Leistung, Shards und aktive Sendungen — alle 5 Sekunden aktualisiert.",
  "dash.tab.statistics": "Statistiken",
  "dash.tab.shards": "Shards",
  "dash.tab.broadcasts": "Übertragungen",
  "dash.tab.lookup": "Shard-Suche",
  "dash.online": "Online",
  "dash.reconnecting": "Verbindung wird wiederhergestellt…",
  "dash.home": "Home",
  "dash.invite": "Einladen",
  "dash.shard": "Shard",
  "dash.guilds": "Server",
  "dash.users": "Nutzer",
  "dash.channels": "Kanäle",
  "dash.uptime": "Laufzeit",
  "dash.noShards": "Keine Shard-Daten verfügbar.",
  "dash.broadcasts.title": "Übertragungen",
  "dash.broadcasts.desc": "Aktive Radio-Sitzungen erscheinen hier in Kürze.",
  // Lookup
  "lookup.title": "Shard-Suche",
  "lookup.desc":
    "Finde heraus, zu welchem Shard ein Server gehört, mithilfe der Server-ID.",
  "lookup.placeholder": "Server-ID eingeben",
  "lookup.button": "Shard finden",
  "lookup.serverId": "Server-ID",
  "lookup.shard": "Shard",
  "lookup.guildsInShard": "Server im Shard",
  "lookup.status": "Status",
  "lookup.online": "Online",
  "lookup.copy": "Kopieren",
  "lookup.copied": "Kopiert!",
  "lookup.err.empty": "Bitte Server-ID eingeben",
  "lookup.err.invalid": "Ungültige Server-ID",
  "lookup.offline": "Offline",
  "lookup.notfound": "Nicht gefunden",
  "lookup.serverName": "Servername",
  "lookup.members": "Mitglieder",
  "lookup.apiError": "API Fehler",
};
const fr: Dict = {
  // Nav
  "nav.home": "Accueil",
  "nav.features": "Fonctionnalités",
  "nav.statistics": "Statistiques",
  "nav.dashboard": "Tableau de bord",
  "nav.invite": "Inviter le Bot",
  "nav.language": "Langue",
  "nav.theme": "Thème",
  // Hero
  "hero.badge": "Un compagnon spirituel pour Discord",
  "hero.title1": "Radio",
  "hero.title2": "Coran",
  "hero.desc":
    "Streaming de récitation du Coran 24h/24, 7j/7, Azkar du matin et du soir, et horaires de prière précis — apportant la sérénité à des milliers de serveurs Discord dans le monde.",
  "hero.cta.add": "Ajouter à Discord",
  "hero.cta.explore": "Explorer les fonctions",
  // Features
  "features.eyebrow": "Fonctionnalités",
  "features.title1": "Plus qu'un simple bot —",
  "features.title2": "une expérience spirituelle complète",
  "features.subtitle":
    "Chaque fonctionnalité est conçue avec soin pour aider votre communauté à se rapprocher d'Allah tout au long de la journée.",
  "feature.radio.title": "Streaming Radio Coran",
  "feature.radio.desc":
    "Récitation continue par des Qaris de renommée mondiale, diffusée directement dans vos salons vocaux avec une qualité cristalline.",
  "feature.azkar.title": "Azkar du Matin et du Soir",
  "feature.azkar.desc":
    "Invocations quotidiennes authentiques livrées aux bons moments — ne manquez jamais les Adhkar qui protègent le cœur.",
  "feature.prayer.title": "Heures de prière et Adhan",
  "feature.prayer.desc":
    "Horaires de prière précis pour n'importe quelle ville, avec l'Adhan appelé automatiquement à chaque Salah.",
  // Quote
  "quote.translation":
    "\"N'est-ce pas par l'évocation d'Allah que les cœurs se tranquillisent ?\"",
  "quote.source": "— Sourate Ar-Ra'd, 13:28",
  "quote.body":
    "Radio Coran apporte la beauté intemporelle de la récitation dans votre vie quotidienne — un compagnon constant de rappel et de paix.",
  "quote.tag.peace": "Paix du cœur",
  "quote.tag.remembrance": "Rappel",
  "quote.tag.community": "Communauté spirituelle",
  // LiveStats
  "stats.live": "En direct",
  "stats.offline": "Hors ligne",
  "stats.title1": "Statistiques",
  "stats.title2": "du Bot",
  "stats.connecting": "Connexion…",
  "stats.error": "Mises à jour suspendues — vérifiez la connexion.",
  "stats.retryLater": "Connexion perdue. Nouvel essai plus tard…",
  "stats.subtitle": "Chiffres en temps réel, actualisés toutes les 5 secondes.",
  "stats.errorBox":
    "Impossible de joindre le serveur de stats. Réessai automatique.",
  "stat.totalServers": "Total Serveurs",
  "stat.totalUsers": "Total Utilisateurs",
  "stat.totalChannels": "Total Salons",
  "stat.totalRadios": "Total Radios",
  "stat.activeRadios": "Radios Actives",
  "stat.activeListeners": "Auditeurs Actifs",
  "stat.activeShards": "Shards Actifs",
  "stat.averagePing": "Ping Moyen",
  "stat.averageUptime": "Uptime Moyen",
  // CTA
  "cta.badge": "Gratuit à vie",
  "cta.title1": "Ajoutez le bot à votre",
  "cta.title2": "serveur dès aujourd'hui",
  "cta.desc":
    "Rejoignez des milliers de communautés déjà enrichies par la récitation quotidienne et la prière.",
  "cta.button": "Inviter le Bot sur Discord",
  // Footer
  "footer.tagline":
    "Un compagnon spirituel pour votre communauté Discord — apportant la récitation du Saint Coran sur chaque serveur.",
  "footer.navigate": "Navigation",
  "footer.reflection": "Réflexion",
  "footer.reflectionEn":
    '"Et Nous faisons descendre du Coran ce qui est une guérison et une miséricorde." — 17:82',
  "footer.copyright": "Fait avec révérence.",
  "footer.ummah": "Construit pour l'Oummah.",
  // Dashboard
  "dash.eyebrow": "Surveillance en direct",
  "dash.title": "Tableau de bord",
  "dash.subtitle":
    "Performance, shards et diffusions actives — actualisé toutes les 5 secondes.",
  "dash.tab.statistics": "Statistiques",
  "dash.tab.shards": "Shards",
  "dash.tab.broadcasts": "Diffusions",
  "dash.tab.lookup": "Recherche de Shard",
  "dash.online": "En ligne",
  "dash.reconnecting": "Reconnexion…",
  "dash.home": "Accueil",
  "dash.invite": "Inviter",
  "dash.shard": "Shard",
  "dash.guilds": "Serveurs",
  "dash.users": "Utilisateurs",
  "dash.channels": "Salons",
  "dash.uptime": "Uptime",
  "dash.noShards": "Aucune donnée de shard disponible.",
  "dash.broadcasts.title": "Diffusions",
  "dash.broadcasts.desc":
    "Les sessions radio actives apparaîtront ici bientôt.",
  // Lookup
  "lookup.title": "Recherche de Shard",
  "lookup.desc":
    "Trouvez à quel shard appartient un serveur en utilisant son ID.",
  "lookup.placeholder": "Entrez l'ID du serveur",
  "lookup.button": "Trouver le Shard",
  "lookup.serverId": "ID du serveur",
  "lookup.shard": "Shard",
  "lookup.guildsInShard": "Serveurs dans le shard",
  "lookup.status": "Statut",
  "lookup.online": "En ligne",
  "lookup.copy": "Copier",
  "lookup.copied": "Copié !",
  "lookup.err.empty": "Veuillez entrer un ID de serveur",
  "lookup.err.invalid": "ID de serveur invalide",
  "lookup.offline": "Hors ligne",
  "lookup.notfound": "Introuvable",
  "lookup.serverName": "Nom du serveur",
  "lookup.members": "Membres",
  "lookup.apiError": "Erreur API",
};

const dictionaries: Record<Lang, Dict> = { ar, en, tr, es, de, fr };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "qr.lang";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ar";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved && dictionaries[saved] ? saved : "ar";
  });

  const dir = useMemo<"ltr" | "rtl">(
    () => LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr",
    [lang],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: string) =>
    dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return (
    <Ctx.Provider value={{ lang, setLang, t, dir }}>{children}</Ctx.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
