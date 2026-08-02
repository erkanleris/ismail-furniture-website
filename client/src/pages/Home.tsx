import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Phone, MessageCircle, ArrowRight, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!data) return null;

  const business = data.business[language];
  const contact = data.contact;
  const services = data.services[language];
  const products = data.products[language];
  const testimonials = data.testimonials[language];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <span className="text-accent-foreground font-bold">I</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">{business.name}</span>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'tr' : 'ar')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {language === 'ar' ? 'TR' : 'AR'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            {business.tagline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            {business.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-luxury text-lg" size="lg">
              {language === 'ar' ? 'اكتشف مجموعتنا' : 'Koleksiyonumuzu Keşfet'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button className="btn-luxury-outline text-lg border-white text-white hover:bg-white hover:text-black" size="lg">
              {language === 'ar' ? 'تواصل معنا' : 'Bize Ulaşın'}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            {language === 'ar' ? 'خدماتنا المميزة' : 'Özel Hizmetlerimiz'}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <Card key={service.id} className="card-luxury">
                <div className="text-4xl mb-4">
                  {service.icon === 'sofa' && '🛋️'}
                  {service.icon === 'hammer' && '🔨'}
                  {service.icon === 'refresh' && '🔄'}
                  {service.icon === 'wrench' && '🔧'}
                  {service.icon === 'truck' && '🚚'}
                  {service.icon === 'lightbulb' && '💡'}
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing bg-card">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            {language === 'ar' ? 'منتجاتنا المختارة' : 'Seçilmiş Ürünlerimiz'}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: any) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="btn-luxury">
                      {language === 'ar' ? 'عرض التفاصيل' : 'Detayları Gör'}
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            {language === 'ar' ? 'آراء عملائنا' : 'Müşteri Yorumları'}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any) => (
              <Card key={testimonial.id} className="card-luxury">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="section-spacing bg-card">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            {language === 'ar' ? 'ساعات العمل' : 'Çalışma Saatleri'}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {data.hours[language].map((hour: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b border-border">
                <span className="font-bold">{hour.day}</span>
                <span className="text-muted-foreground">{hour.open} - {hour.close}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'ar' ? 'هل أنت مهتم بمنتجاتنا؟' : 'Ürünlerimizle ilgilendiniz mi?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {language === 'ar' ? 'تواصل معنا اليوم للحصول على عرض خاص' : 'Bugün bize ulaşın ve özel bir teklif alın'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${contact.phone}`} className="btn-luxury bg-accent-foreground text-accent hover:bg-white">
              <Phone className="w-5 h-5 ml-2" />
              {language === 'ar' ? 'اتصل بنا' : 'Bizi Arayın'}
            </a>
            <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-luxury bg-accent-foreground text-accent hover:bg-white">
              <MessageCircle className="w-5 h-5 ml-2" />
              {language === 'ar' ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <a
          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          title="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          title={language === 'ar' ? 'اتصل بنا' : 'Bizi Arayın'}
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-8 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-40"
          title={language === 'ar' ? 'العودة للأعلى' : 'Başa Dön'}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">{language === 'ar' ? 'عن الشركة' : 'Şirket Hakkında'}</h4>
              <p className="text-sm opacity-80">{business.about}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ar' ? 'الخدمات' : 'Hizmetler'}</h4>
              <ul className="text-sm opacity-80 space-y-2">
                <li><a href="#" className="hover:text-accent transition-colors">{language === 'ar' ? 'التنجيد' : 'Döşeme'}</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">{language === 'ar' ? 'التصنيع' : 'İmalat'}</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">{language === 'ar' ? 'التوصيل' : 'Teslimat'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ar' ? 'المعلومات' : 'Bilgiler'}</h4>
              <ul className="text-sm opacity-80 space-y-2">
                <li><a href="#/privacy" className="hover:text-accent transition-colors">{language === 'ar' ? 'سياسة الخصوصية' : 'Gizlilik Politikası'}</a></li>
                <li><a href="#/terms" className="hover:text-accent transition-colors">{language === 'ar' ? 'شروط الاستخدام' : 'Kullanım Şartları'}</a></li>
                <li><a href="#/faq" className="hover:text-accent transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'Sıkça Sorulan Sorular'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ar' ? 'تواصل معنا' : 'İletişim'}</h4>
              <ul className="text-sm opacity-80 space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {contact.address[language]}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 {business.name}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tüm hakları saklıdır.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
