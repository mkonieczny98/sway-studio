'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
// eslint-disable-next-line @next/next/no-img-element

interface CloudinaryImageFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CloudinaryImageField({ value, onChange }: CloudinaryImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div style={{ marginTop: '8px' }}>
      {value && (
        <div style={{ marginBottom: '12px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Preview" 
            style={{ 
              maxWidth: '300px', 
              maxHeight: '200px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5'
            }} 
          />
        </div>
      )}
      
      <CldUploadWidget
        uploadPreset="sway_studio"
        options={{
          maxFiles: 1,
          resourceType: 'image',
          folder: 'sway-studio',
          cropping: true,
        }}
        onSuccess={(result: any) => {
          if (result.info?.secure_url) {
            onChange(result.info.secure_url);
          }
          setIsUploading(false);
        }}
        onOpen={() => setIsUploading(true)}
        onClose={() => setIsUploading(false)}
      >
        {({ open }) => (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => open()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#7d8c6e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {value ? '🔄 Zmień zdjęcie' : '📷 Dodaj zdjęcie'}
            </button>
            
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                🗑️ Usuń
              </button>
            )}
          </div>
        )}
      </CldUploadWidget>
      
      {value && (
        <input 
          type="text" 
          value={value} 
          readOnly 
          style={{ 
            marginTop: '8px',
            width: '100%', 
            padding: '6px 10px',
            border: '1px solid #e5e5e5',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#666',
            backgroundColor: '#f9f9f9'
          }}
        />
      )}
    </div>
  );
}
