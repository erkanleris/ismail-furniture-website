import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";

export default function About() {
  const { language, t } = useLanguage();
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  if (!data) return null;

  const business = data.business[language];

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-8">{language === 'ar' ? 'من نحن' : 'Biz Kimiz'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop" alt="About" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-accent">{language === 'ar' ? 'قصتنا' : 'Hikayemiz'}</h2>
            <p className="text-lg mb-4 text-muted-foreground">{business.about}</p>
            <p className="text-lg text-muted-foreground">{business.vision}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">{language === 'ar' ? 'قيمنا' : 'Değerlerimiz'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {business.values.map((value: string, idx: number) => (
            <Card key={idx} className="p-6 card-luxury">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-accent-foreground">✓</span>
                </div>
                <p className="text-lg">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
