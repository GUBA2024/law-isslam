"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FAQS } from "@/app/lib/site-content";

export default function FaqAccordion() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((item, index) => (
        <div key={item.q} className="glass-card overflow-hidden">
          <button
            className="flex w-full items-center justify-between gap-4 text-right text-lg font-semibold"
            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
          >
            <span>{item.q}</span>
            <span className="text-gold">{activeFaq === index ? "−" : "+"}</span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: activeFaq === index ? "auto" : 0, opacity: activeFaq === index ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-slate-200">{item.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
