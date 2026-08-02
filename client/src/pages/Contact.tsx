import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);

  React.useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return null;

  const contact = data.contact;

  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-12">{language === 'ar' ? 'تواصل معنا' : 'Bize Ulaşın'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">{language === 'ar' ? 'الهاتف' : 'Telefon'}</h3>
                  <a href={`tel:${contact.phone}`} className="text-accent hover:underline">{contact.phone}</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">{language === 'ar' ? 'البريد الإلكتروني' : 'E-posta'}</h3>
                  <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">{language === 'ar' ? 'العنوان' : 'Adres'}</h3>
                  <p>{contact.address[language]}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.8${contact.coordinates.lat}!2d${contact.coordinates.lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f8b30c3ab809d41%3A0x37e4b9aa2982222b!2sIsmail%20Furniture!5e0!3m2!1s${language}!2str!4v`} width="100%" height="400" style={{ border: 0, borderRadius: '8px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
