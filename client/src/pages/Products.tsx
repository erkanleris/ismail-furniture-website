import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Products() {
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
        <h1 className="text-5xl font-bold mb-12">{language === 'ar' ? 'المنتجات' : 'Ürünler'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
