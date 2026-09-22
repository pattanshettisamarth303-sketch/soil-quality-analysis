'use client';

import React from 'react';

interface Props {
  data: any;
  lang: string;
  t: Record<string, Record<string, string>>;
}

export default function ResultsView({ data, lang, t }: Props) {
  if (!data) return null;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    const text = `Soil Health Score is ${data.soil_health.soil_health_score}. ${data.soil_health.rating}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadPdf = () => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((html2pdf) => {
        const element = document.getElementById('report-view');
        if (element) {
          html2pdf.default().from(element).save('Soil_Health_Report.pdf');
        }
      });
    }
  };

  return (
    <div id="report-view" className="bg-white p-5 rounded-2xl shadow-xl border my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold text-green-900">{t[lang].healthScore}</h2>
        <div className="flex space-x-2">
          <button onClick={handleSpeak} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
            🔊 {t[lang].speak}
          </button>
          <button onClick={handleDownloadPdf} className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-bold">
            📄 PDF
          </button>
        </div>
      </div>

      <div className="text-center p-4 bg-green-100 rounded-2xl mb-4">
        <p className="text-4xl font-black text-green-800">{data.soil_health.soil_health_score} / 100</p>
        <p className="text-md font-bold text-green-700 mt-1">{data.soil_health.rating}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">{t[lang].recommendations}</h3>
        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
          {data.recommendations.fertilizer_recommendations.map((item: any, idx: number) => (
            <li key={idx}><strong>{item.status}:</strong> {item.fertilizer || item.action}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">{t[lang].crops}</h3>
        <div className="space-y-2">
          {data.crop_suitability_ranking.slice(0, 3).map((crop: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded-xl border">
              <span className="font-bold text-gray-800">{crop.crop}</span>
              <span className="text-sm font-semibold text-green-600">{crop.score}% - {crop.suitability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}