'use client';

import React, { useState } from 'react';

interface SoilData {
  n: number;
  p: number;
  k: number;
  ph: number;
  moisture: number;
  organic_matter: number;
}

interface Props {
  onSubmit: (data: SoilData) => void;
  loading: boolean;
  lang: string;
  t: Record<string, Record<string, string>>;
}

export default function SoilForm({ onSubmit, loading, lang, t }: Props) {
  const [formData, setFormData] = useState({
    n: '', p: '', k: '', ph: '', moisture: '', organic_matter: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { n, p, k, ph, moisture, organic_matter } = formData;

    if (!n || !p || !k || !ph || !moisture || !organic_matter) {
      setError('Please fill in all parameter fields.');
      return;
    }

    setError('');
    onSubmit({
      n: parseFloat(n),
      p: parseFloat(p),
      k: parseFloat(k),
      ph: parseFloat(ph),
      moisture: parseFloat(moisture),
      organic_matter: parseFloat(organic_matter)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 my-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{t[lang].formTitle}</h3>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 font-semibold text-sm">{error}</div>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-gray-600">Nitrogen (N kg/ha)</label>
          <input type="number" name="n" value={formData.n} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="220" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600">Phosphorus (P kg/ha)</label>
          <input type="number" name="p" value={formData.p} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="15" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600">Potassium (K kg/ha)</label>
          <input type="number" name="k" value={formData.k} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="180" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600">Soil pH</label>
          <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="6.5" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600">Moisture (%)</label>
          <input type="number" step="0.1" name="moisture" value={formData.moisture} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="20" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600">Organic Matter (%)</label>
          <input type="number" step="0.01" name="organic_matter" value={formData.organic_matter} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-800" placeholder="0.65" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-5 bg-green-600 text-white font-bold py-4 rounded-xl shadow-md active:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : t[lang].submit}
      </button>
    </form>
  );
}