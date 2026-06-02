"use client";

import { FormEvent, useState } from "react";

export default function ContactForm({ title = "نموذج التواصل" }: { title?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="glass-card space-y-4" onSubmit={onSubmit}>
      <h3 className="text-xl font-bold text-gold">{title}</h3>
      <label className="block text-sm">
        الاسم
        <input required className="input" name="name" />
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
        الرسالة
        <textarea required className="input min-h-28" name="message" />
      </label>
      <button type="submit" className="btn-gold w-full">
        إرسال الطلب
      </button>
      {submitted && <p className="text-sm text-emerald-300">تم استلام طلبك بنجاح وسيتم التواصل معك قريبًا.</p>}
    </form>
  );
}
