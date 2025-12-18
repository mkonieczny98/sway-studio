'use client';

import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ marginBottom: '20px' }}>📸 Upload zdjęć</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Wrzuć tutaj zdjęcia - zostaną automatycznie zoptymalizowane. 
        Skopiuj URL i wklej w panelu Keystatic.
      </p>

      <CldUploadWidget
        uploadPreset="sway_studio"
        options={{
          maxFiles: 10,
          resourceType: 'image',
          folder: 'sway-studio',
        }}
        onSuccess={(result: any) => {
          if (result.info?.secure_url) {
            setUploadedImages(prev => [...prev, result.info.secure_url]);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#7d8c6e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            ➕ Wybierz zdjęcia do uploadu
          </button>
        )}
      </CldUploadWidget>

      {uploadedImages.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>Wrzucone zdjęcia:</h2>
          {uploadedImages.map((url, i) => (
            <div key={i} style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f5f5f5',
              borderRadius: '8px'
            }}>
              <Image 
                src={url}
                alt={`Przesłane zdjęcie ${i + 1}`}
                width={300}
                height={200}
                style={{ width: '100%', height: 'auto', maxWidth: '300px', borderRadius: '4px' }}
                priority
              />
              <div style={{ marginTop: '10px' }}>
                <input 
                  type="text" 
                  value={url} 
                  readOnly 
                  style={{ 
                    width: '100%', 
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  onClick={(e) => {
                    (e.target as HTMLInputElement).select();
                    navigator.clipboard.writeText(url);
                  }}
                />
                <small style={{ color: '#666' }}>Kliknij aby skopiować URL</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
