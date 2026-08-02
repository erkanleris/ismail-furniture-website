import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Gallery() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);

  React.useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return null;

  const products = data.products[language];

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-12">{language === 'ar' ? 'معرض الصور' : 'Galeri'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg h-80">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
