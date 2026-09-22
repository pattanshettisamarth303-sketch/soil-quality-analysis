'use client';

import React, { useState } from 'react';

interface Props {
  onImageSelect: (file: File) => void;
  lang: string;
  t: Record<string, Record<string, string>>;
}

export default function CameraUpload({ onImageSelect, lang, t }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please provide a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setError('');
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  return (
    <div className="p-4 border-2 border-dashed border-green-600 rounded-2xl bg-green-50 text-center my-4">
      <h3 className="text-lg font-bold text-green-900 mb-2">{t[lang].cameraTitle}</h3>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        id="cameraInput"
        className="hidden"
      />
      <label
        htmlFor="cameraInput"
        className="cursor-pointer inline-block bg-green-600 text-white font-bold text-lg py-3 px-6 rounded-xl shadow-md active:bg-green-700"
      >
        📷 {t[lang].takePhoto}
      </label>

      {error && <p className="text-red-600 font-bold mt-2">{error}</p>}

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Soil Sample"
            className="w-full max-h-52 object-cover rounded-xl border-2 border-green-600"
          />
        </div>
      )}
    </div>
  );
}