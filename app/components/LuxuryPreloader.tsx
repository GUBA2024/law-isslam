"use client";

import { motion } from "framer-motion";

export default function LuxuryPreloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#142745_0%,_#04070f_60%,_#000_100%)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.05, duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4 h-24 w-24 rounded-full border border-[#f0c469]/40 border-t-[#f0c469]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
      />
      <p className="text-lg font-semibold text-[#f6d489]">المستشار إسلام الغرياني</p>
    </motion.div>
  );
}
