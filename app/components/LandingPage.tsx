"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LuxuryPreloader from "./LuxuryPreloader";
import ThemeToggle from "./ThemeToggle";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#0a1424]" aria-hidden />,
});

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  ["⚖️", "الاستشارات القانونية", "توجيه قانوني دقيق لحماية حقوقكم واتخاذ القرار الصحيح."],
  ["🏛️", "القضايا المدنية", "تمثيل احترافي في الدعاوى المدنية والتعويضات والنزاعات."],
  ["🛡️", "القضايا الجنائية", "دفاع قانوني متكامل وفق أعلى معايير المهنية والسرية."],
  ["👨‍👩‍👧", "الأحوال الشخصية", "حلول قانونية لمسائل الأسرة والميراث والنفقات."] ,
  ["🏢", "تأسيس الشركات", "تأسيس الكيانات التجارية وصياغة الهياكل القانونية السليمة."],
  ["📜", "صياغة العقود", "إعداد ومراجعة العقود باحترافية تمنع المخاطر المستقبلية."],
  ["📈", "القضايا التجارية", "معالجة النزاعات التجارية وحماية المصالح الاستثمارية."],
  ["🤝", "التحكيم وتسوية المنازعات", "تسويات فعالة تحفظ الوقت والسمعة والموارد."],
  ["💼", "قضايا العمل", "تمثيل أصحاب الأعمال والعاملين وفق قانون العمل المصري."],
  ["📂", "متابعة الإجراءات القانونية", "متابعة دقيقة لكل خطوة إجرائية أمام الجهات المختصة."],
] as const;

const FAQS = [
  ["كيف يمكنني حجز استشارة قانونية؟", "يمكنكم الحجز عبر نموذج التواصل أو الاتصال المباشر أو واتساب."],
  ["هل يتم الحفاظ على سرية البيانات؟", "نلتزم بسرية تامة لكل المعلومات والمستندات القانونية دون استثناء."],
  ["هل تقدمون خدمات للشركات والأفراد؟", "نعم، نقدم حلولاً قانونية متكاملة للشركات والأفراد في مختلف التخصصات."],
  ["هل تتوفر متابعة دورية للقضية؟", "نحرص على تحديث العميل بشكل دوري وشفاف بكل التطورات القانونية."],
] as const;

const ARTICLES = [
  "أحدث الأخبار القانونية",
  "مقالات التوعية القانونية",
  "تحديثات القوانين المصرية",
  "حقوق المواطنين",
] as const;

const TESTIMONIALS = [
  "تعامل احترافي ووضوح كامل في كل تفاصيل القضية.",
  "دعم قانوني قوي وسرعة استجابة عالية في أصعب المواقف.",
  "خبرة واضحة وثقة كبيرة في إدارة النزاعات القانونية.",
] as const;

const STATS: ReadonlyArray<readonly [number, string]> = [
  [15, "سنوات الخبرة"],
  [950, "عدد القضايا الناجحة"],
  [1200, "عدد العملاء"],
  [98, "نسبة رضا العملاء"],
];

function Counter({ value, label }: { value: number; label: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = Math.max(1, Math.ceil(value / (duration / 16)));
    const id = setInterval(() => {
      start += step;
      if (start >= value) {
        setCurrent(value);
        clearInterval(id);
        return;
      }
      setCurrent(start);
    }, 16);
    return () => clearInterval(id);
  }, [value]);

  return (
    <div className="glass-card text-center">
      <p className="mb-2 text-4xl font-bold text-gold">{current}{label.includes("نسبة") ? "%" : "+"}</p>
      <p className="text-sm text-slate-300 dark:text-slate-300">{label}</p>
    </div>
  );
}

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [testimonial, setTestimonial] = useState(0);
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), reduceMotion ? 400 : 1450);
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduceMotion || !timelineRef.current) return;
    gsap.from(".timeline-item", {
      scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, [reduceMotion]);

  const mapSrc = useMemo(
    () =>
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ??
      "https://www.google.com/maps?q=Cairo%20Egypt&output=embed",
    []
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {loading && <LuxuryPreloader />}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 16 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-x-hidden"
      >
        <div className="floating-particles" aria-hidden>
          {new Array(16).fill(null).map((_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.5}s` }} />
          ))}
        </div>

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#hero" className="text-lg font-bold text-gold">المستشار إسلام الغرياني</a>
            <nav className="hidden gap-6 text-sm md:flex">
              {[
                ["من نحن", "about"],
                ["الخدمات", "services"],
                ["المقالات", "articles"],
                ["تواصل", "contact"],
              ].map(([label, id]) => (
                <a key={id} href={`#${id}`} className="text-slate-100/85 transition hover:text-gold">{label}</a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <section id="hero" className="relative min-h-[95vh]">
          <div className="absolute inset-0 -z-10">
            {!reduceMotion ? <HeroScene /> : <div className="h-full w-full bg-gradient-to-b from-[#0a1222] via-[#080d16] to-[#030509]" />}
          </div>
          <div className="mx-auto grid min-h-[95vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <p className="mb-4 inline-flex rounded-full border border-gold/45 bg-gold/15 px-4 py-2 text-xs text-gold">Legal Consultant & Attorney at Law</p>
              <h1 className="mb-4 text-4xl font-black leading-tight text-white sm:text-5xl">المستشار إسلام الغرياني</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200">خبرة قانونية متخصصة في تقديم الاستشارات القانونية والدفاع عن الحقوق وفقًا للقانون المصري.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="btn-gold">احجز استشارة قانونية</a>
                <a href="#contact" className="btn-glass">تواصل معنا</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-wrap">
          <h2 className="section-title">من نحن</h2>
          <p className="section-text">نقدم خدمات قانونية احترافية بقيادة المستشار إسلام الغرياني، مع التزام راسخ بسيادة القانون والعدالة والسرية التامة. نعمل على حماية حقوق موكلينا عبر استراتيجيات دقيقة، وتمثيل قانوني موثوق أمام الجهات القضائية، ومتابعة متكاملة تضمن أفضل النتائج الممكنة.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["ميزان العدالة", "المحكمة", "العقود القانونية", "المطرقة القضائية"].map((item, index) => (
              <motion.div key={item} whileHover={{ y: -6 }} className="glass-card flex items-center gap-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
                <span className="text-2xl text-gold">{["⚖️", "🏛️", "📃", "🔨"][index]}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="egypt-law" className="section-wrap">
          <h2 className="section-title">نبذة عن القانون المصري</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["مفهوم القانون المصري", "منظومة تشريعية تنظم العلاقات والحقوق والواجبات داخل الدولة."],
              ["دور القانون في تحقيق العدالة", "ضمان المساواة وحماية الحقوق وترسيخ الاستقرار المجتمعي."],
              ["النظام القضائي المصري", "هيكل قضائي متدرج يضمن حق التقاضي وفق إجراءات قانونية منظمة."],
              ["حقوق وواجبات المواطنين", "يكفل القانون حقوق الأفراد ويلزمهم باحترام الواجبات العامة."],
              ["أهمية الاستشارات القانونية", "الاستشارة المبكرة تقلل المخاطر وتدعم القرارات القانونية السليمة."],
            ].map(([title, text]) => (
              <article key={title} className="glass-card">
                <h3 className="mb-2 text-lg font-bold text-gold">{title}</h3>
                <p className="text-slate-200">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section-wrap">
          <h2 className="section-title">الخدمات القانونية</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([icon, title, text]) => (
              <motion.article key={title} whileHover={{ y: -9, rotateX: 4, rotateY: -4 }} className="service-card" style={{ transformStyle: "preserve-3d" }}>
                <span className="mb-4 inline-block text-3xl">{icon}</span>
                <h3 className="mb-2 text-xl font-bold text-gold">{title}</h3>
                <p className="text-sm leading-7 text-slate-200">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="why-us" className="section-wrap">
          <h2 className="section-title">لماذا نحن</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([value, label]) => (
              <Counter key={label} value={value} label={label} />
            ))}
          </div>
          <div ref={timelineRef} className="mt-8 space-y-4">
            {["2009 بداية المسيرة القانونية", "2014 التوسع في القضايا التجارية", "2019 تأسيس منظومة استشارات متخصصة", "2026 تطوير تجربة رقمية قانونية متكاملة"].map((item) => (
              <div key={item} className="timeline-item glass-card border-r-4 border-gold">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="articles" className="section-wrap">
          <h2 className="section-title">مقالات قانونية</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ARTICLES.map((article) => (
              <article key={article} className="glass-card hover:-translate-y-1 transition">
                <h3 className="mb-2 text-lg font-semibold text-gold">{article}</h3>
                <p className="text-sm text-slate-200">محتوى قانوني احترافي يواكب التطورات التشريعية ويعزز الوعي القانوني.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="section-wrap">
          <h2 className="section-title">آراء العملاء</h2>
          <motion.blockquote key={testimonial} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-6 max-w-3xl rounded-2xl border border-gold/40 bg-white/8 p-8 text-center text-xl leading-9 text-white shadow-[0_14px_45px_rgba(0,0,0,.4)]">
            “{TESTIMONIALS[testimonial]}”
          </motion.blockquote>
        </section>

        <section id="faq" className="section-wrap">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map(([question, answer], index) => (
              <div key={question} className="glass-card overflow-hidden">
                <button className="flex w-full items-center justify-between gap-4 text-right text-lg font-semibold" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                  <span>{question}</span>
                  <span className="text-gold">{activeFaq === index ? "−" : "+"}</span>
                </button>
                <motion.div initial={false} animate={{ height: activeFaq === index ? "auto" : 0, opacity: activeFaq === index ? 1 : 0 }} className="overflow-hidden">
                  <p className="pt-3 text-slate-200">{answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-wrap">
          <h2 className="section-title">تواصل معنا</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <form className="glass-card space-y-4" onSubmit={onSubmit}>
              <label className="block text-sm">الاسم<input required className="input" name="name" /></label>
              <label className="block text-sm">رقم الهاتف<input required className="input" name="phone" /></label>
              <label className="block text-sm">البريد الإلكتروني<input required type="email" className="input" name="email" /></label>
              <label className="block text-sm">الرسالة<textarea required className="input min-h-28" name="message" /></label>
              <button type="submit" className="btn-gold w-full">إرسال الطلب</button>
              <div className="flex flex-wrap gap-3 pt-2">
                <a className="btn-glass" href="https://wa.me/201000000000" target="_blank" rel="noreferrer">واتساب</a>
                <a className="btn-glass" href="tel:+201000000000">اتصال مباشر</a>
              </div>
            </form>
            <div className="glass-card min-h-80 overflow-hidden p-0">
              <iframe title="موقع المكتب" src={mapSrc} className="h-full min-h-80 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/55">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
            <div>
              <h3 className="mb-3 font-bold text-gold">روابط سريعة</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#about">من نحن</a></li>
                <li><a href="#services">الخدمات</a></li>
                <li><a href="#contact">تواصل معنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-gold">الخدمات القانونية</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>الاستشارات القانونية</li>
                <li>القضايا الجنائية</li>
                <li>صياغة العقود</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-gold">وسائل التواصل الاجتماعي</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" aria-label="Facebook">Facebook</a></li>
                <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
                <li><a href="#" aria-label="Instagram">Instagram</a></li>
              </ul>
            </div>
          </div>
          <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">© 2026 المستشار إسلام الغرياني - جميع الحقوق محفوظة</p>
        </footer>
      </motion.main>
    </>
  );
}
