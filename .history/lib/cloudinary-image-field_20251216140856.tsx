'use client';

import { BasicFormField, FormFieldStoredValue } from '@keystatic/core';
import { useEffect, useState } from 'react';

// Cloudinary widget script loader
function loadCloudinaryScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).cloudinary) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

interface CloudinaryImageInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

function CloudinaryImageInput({ value, onChange, label, description }: CloudinaryImageInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  const openUploader = async () => {
    setIsLoading(true);
    try {
      await loadCloudinaryScript();
      
      const widget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: 'dmcip8oq4',
          uploadPreset: 'sway_studio',
          folder: 'sway-studio',
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 16/9,
          showSkipCropButton: true,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
          maxFileSize: 10000000, // 10MB
          styles: {
            palette: {
              window: '#FFFFFF',
              windowBorder: '#7d8c6e',
              tabIcon: '#7d8c6e',
              menuIcons: '#5c5145',
              textDark: '#3d3329',
              textLight: '#FFFFFF',
              link: '#7d8c6e',
              action: '#7d8c6e',
              inactiveTabIcon: '#8a7f72',
              error: '#dc3545',
              inProgress: '#7d8c6e',
              complete: '#7d8c6e',
              sourceBg: '#f5f0e8'
            }
          }
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            onChange(result.info.secure_url);
          }
        }
      );
      
      widget.open();
    } catch (err) {
      console.error('Cloudinary widget error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '8px' }}>
      {description && (
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{description}</p>
      )}
      
      {value && (
        <div style={{ marginBottom: '12px' }}>
          <img 
            src={value} 
            alt="Preview" 
            style={{ 
              maxWidth: '100%',
              maxHeight: '200px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              objectFit: 'cover'
            }} 
          />
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={openUploader}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#7d8c6e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'wait' : 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {isLoading ? '⏳ Ładowanie...' : value ? '🔄 Zmień zdjęcie' : '📷 Dodaj zdjęcie'}
        </button>
        
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              padding: '10px 20px',
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
      
      {value && (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="lub wklej URL ręcznie..."
          style={{ 
            marginTop: '12px',
            width: '100%', 
            padding: '8px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#666',
          }}
        />
      )}
    </div>
  );
}

export function cloudinaryImage(config: { 
  label: string; 
  description?: string;
}): BasicFormField<string, string, string> {
  return {
    kind: 'form',
    formKind: 'content',
    label: config.label,
    Input: (props) => (
      <CloudinaryImageInput
        value={props.value}
        onChange={props.onChange}
        label={config.label}
        description={config.description}
      />
    ),
    defaultValue: () => '',
    parse: (value) => (typeof value === 'string' ? value : ''),
    serialize: (value) => ({ value }),
    validate: (value) => ({ isValid: true, value }),
    reader: {
      parse: (value) => (typeof value === 'string' ? value : ''),
    },
  };
}
