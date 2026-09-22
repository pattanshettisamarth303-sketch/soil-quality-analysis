'use client';

import React, { useState } from 'react';
import CameraUpload from './components/CameraUpload';
import SoilForm from './components/SoilForm';
import ResultsView from './components/ResultsView';
import { translations } from './utils/translations';

export default function Home() {
  const [lang, setLang] = useState<string>('en');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (soilData: any) => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        soil_health: { soil_health_score: 82, rating: "Good Soil Health" },
        recommendations: {
          fertilizer_recommendations: [
            { status: "Nitrogen Deficient", fertilizer: "Urea (46% N) split application" }
          ]
        },
        crop_suitability_ranking: [
          { crop: "Wheat", score: 94, suitability: "Highly Suitable" },
          { crop: "Maize", score: 88, suitability: "Highly Suitable" }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <header className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 rounded-2xl shadow-md">
        <h1 className="font-bold text-md">{translations[lang].title}</h1>
        <div className="flex gap-1 text-xs">
          <button 
            onClick={() => setLang('en')} 
            className={`px-2 py-1 rounded font-bold ${lang === 'en' ? 'bg-white text-green-800' : 'bg-green-800 text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('hi')} 
            className={`px-2 py-1 rounded font-bold ${lang === 'hi' ? 'bg-white text-green-800' : 'bg-green-800 text-white'}`}
          >
            HI
          </button>
        </div>
      </header>

      <CameraUpload onImageSelect={() => {}} lang={lang} t={translations} />
      <SoilForm onSubmit={handleFormSubmit} loading={loading} lang={lang} t={translations} />
      <ResultsView data={result} lang={lang} t={translations} />
    </div>
  );
}