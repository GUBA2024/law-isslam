"use client";

import { FormEvent, useState } from "react";

const CONSULTATION_TYPES = [
  "استشارة مدنية",
  "استشارة جنائية",
  "استشارة أسرية",
  "استشارة عقود",
  "تحكيم وتسوية نزاع",
] as const;

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="glass-card space-y-4" onSubmit={onSubmit}>
      <h3 className="text-xl font-bold text-gold">نموذج حجز استشارة</h3>
      <label className="block text-sm">
        الاسم الكامل
        <input required className="input" name="fullName" />
      </label>
      <label className="block text-sm">
        رقم الهاتف
        <input required className="input" name="phone" />
      </label>
      <label className="block text-sm">
        البريد الإلكتروني
        <input required type="email" className="input" name="email" />
      </label>
      <label className="block text-sm">
        نوع الاستشارة
        <select required className="input" name="consultationType" defaultValue="">
          <option value="" disabled>
            اختر نوع الاستشارة
          </option>
          {CONSULTATION_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        ملخص الحالة
        <textarea required className="input min-h-28" name="summary" />
      </label>
      <button type="submit" className="btn-gold w-full">
        تأكيد الحجز
      </button>
      {submitted && <p className="text-sm text-emerald-300">تم إرسال طلب الاستشارة بنجاح.</p>}
    </form>
  );
}
