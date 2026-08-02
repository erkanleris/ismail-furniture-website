import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState<number | null>(null);

  React.useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return null;

  const faqs = data.faq[language];

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-12">{language === 'ar' ? 'الأسئلة الشائعة' : 'Sıkça Sorulan Sorular'}</h1>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq: any, idx: number) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-secondary transition-colors"
              >
                <h3 className="font-bold text-left">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
              </button>
              {open === idx && (
                <div className="p-6 border-t border-border bg-card">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
