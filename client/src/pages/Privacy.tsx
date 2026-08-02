import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">{language === 'ar' ? 'سياسة الخصوصية' : 'Gizlilik Politikası'}</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          {language === 'ar' ? (
            <div className="space-y-6 text-muted-foreground">
              <p>نحن نحترم خصوصيتك وملتزمون بحماية بيانات شخصية.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">جمع المعلومات</h2>
              <p>نجمع المعلومات التي تقدمها لنا طواعية عند التواصل معنا.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">استخدام المعلومات</h2>
              <p>نستخدم المعلومات لتحسين خدماتنا والرد على استفساراتك.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">الأمان</h2>
              <p>نتخذ إجراءات أمنية لحماية بيانات العملاء.</p>
            </div>
          ) : (
            <div className="space-y-6 text-muted-foreground">
              <p>Gizliliğinize saygı duyuyoruz ve kişisel verilerinizi korumaya kararlıyız.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">Bilgi Toplama</h2>
              <p>Bize gönüllü olarak sağladığınız bilgileri toplarız.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">Bilgilerin Kullanımı</h2>
              <p>Hizmetlerimizi iyileştirmek ve sorularınıza yanıt vermek için bilgileri kullanırız.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">Güvenlik</h2>
              <p>Müşteri verilerini korumak için güvenlik önlemleri alırız.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
