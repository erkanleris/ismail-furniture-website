import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">{language === 'ar' ? 'شروط الاستخدام' : 'Kullanım Şartları'}</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          {language === 'ar' ? (
            <div className="space-y-6 text-muted-foreground">
              <p>باستخدام موقعنا، فإنك توافق على شروط الاستخدام هذه.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">الاستخدام المسموح</h2>
              <p>يجب استخدام الموقع فقط للأغراض القانونية والمشروعة.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">المسؤولية</h2>
              <p>لا نتحمل مسؤولية عن أي أضرار ناجمة عن استخدام الموقع.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">الملكية الفكرية</h2>
              <p>جميع المحتوى محمي بحقوق الملكية الفكرية.</p>
            </div>
          ) : (
            <div className="space-y-6 text-muted-foreground">
              <p>Sitemizi kullanarak bu kullanım şartlarını kabul etmiş olursunuz.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">İzin Verilen Kullanım</h2>
              <p>Siteyi yalnızca yasal ve meşru amaçlar için kullanmalısınız.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">Sorumluluk</h2>
              <p>Siteyi kullanmaktan kaynaklanan hiçbir hasardan sorumlu değiliz.</p>
              <h2 className="text-2xl font-bold text-foreground mt-6">Fikri Mülkiyet</h2>
              <p>Tüm içerik fikri mülkiyet hakları tarafından korunmaktadır.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
