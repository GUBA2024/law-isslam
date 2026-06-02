"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LuxuryPreloader from "./LuxuryPreloader";
import { ARTICLES, EGYPT_LAW_BRIEF, LEGAL_NEWS, LEGAL_VISUALS, SERVICES } from "@/app/lib/site-content";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#0a1424]" aria-hidden />,
});

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), reduceMotion ? 200 : 1200);
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <>
      {loading && <LuxuryPreloader />}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 12 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <section className="relative min-h-[88vh]">
          <div className="absolute inset-0 -z-10">
            {!reduceMotion ? (
              <HeroScene />
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-[#0a1222] via-[#080d16] to-[#030509]" />
            )}
          </div>
          <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <p className="mb-4 inline-flex rounded-full border border-gold/45 bg-gold/15 px-4 py-2 text-xs text-gold">
                Legal Consultant & Attorney at Law
              </p>
              <h1 className="mb-4 text-4xl font-black leading-tight text-white sm:text-5xl">المستشار إسلام الغرياني</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200">
                منصة قانونية احترافية بخبرة مصرية متخصصة للدفاع عن الحقوق وتقديم الاستشارات القانونية.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/consultations" className="btn-gold">
                  احجز استشارة قانونية
                </Link>
                <Link href="/contact" className="btn-glass">
                  تواصل معنا
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-wrap">
          <h2 className="section-title">هوية قانونية بصرية احترافية</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {LEGAL_VISUALS.map((item, index) => (
              <motion.article
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="glass-card"
              >
                <p className="mb-2 text-3xl">{item.icon}</p>
                <h3 className="mb-2 font-bold text-gold">{item.title}</h3>
                <p className="text-sm text-slate-200">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap">
          <h2 className="section-title">نبذة عن القانون المصري</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EGYPT_LAW_BRIEF.map((item, index) => (
              <motion.article
                key={item}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="glass-card"
              >
                <p className="text-slate-200">{item}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="section-title">الخدمات القانونية</h2>
            <Link href="/services" className="btn-glass">
              عرض كل الخدمات
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.title}
                whileHover={{ y: -8 }}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="service-card"
              >
                <h3 className="mb-2 text-xl font-bold text-gold">{service.title}</h3>
                <p className="text-sm leading-7 text-slate-200">{service.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap">
          <h2 className="section-title">المقالات والأخبار القانونية</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="grid gap-4">
              {ARTICLES.map((article) => (
                <article key={article.title} className="glass-card">
                  <h3 className="mb-2 text-lg font-bold text-gold">{article.title}</h3>
                  <p className="text-slate-200">{article.excerpt}</p>
                </article>
              ))}
            </div>
            <div className="glass-card">
              <h3 className="mb-3 text-lg font-bold text-gold">أحدث الأخبار القانونية</h3>
              <ul className="space-y-3 text-slate-200">
                {LEGAL_NEWS.map((news) => (
                  <li key={news} className="border-r-2 border-gold/45 pr-3">
                    {news}
                  </li>
                ))}
              </ul>
              <Link href="/articles" className="btn-gold mt-6 inline-flex">
                زيارة قسم المقالات
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
