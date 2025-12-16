'use client';

import { useState, useEffect } from 'react';

interface ColorFieldInputProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  label: string;
  description?: string;
  defaultValue?: string;
}

export function ColorFieldInput({ 
  value, 
  onChange, 
  autoFocus, 
  label, 
  description,
  defaultValue = '#000000'
}: ColorFieldInputProps) {
  const [hexValue, setHexValue] = useState(value || defaultValue);
  
  useEffect(() => {
    if (value !== hexValue) {
      setHexValue(value || defaultValue);
    }
  }, [value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setHexValue(newColor);
    onChange(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    // Aktualizuj wartość jeśli jest poprawnym hexem
    if (/^#[0-9A-Fa-f]{6}$/i.test(newValue) || /^#[0-9A-Fa-f]{3}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    // Przy opuszczeniu pola, jeśli wartość jest poprawna, zapisz ją
    if (/^#[0-9A-Fa-f]{6}$/i.test(hexValue) || /^#[0-9A-Fa-f]{3}$/i.test(hexValue)) {
      onChange(hexValue);
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '6px', 
        fontSize: '14px', 
        fontWeight: 500,
        color: '#ffffff'
      }}>
        {label}
      </label>
      {description && (
        <p style={{ 
          fontSize: '12px', 
          color: '#a0a0a0', 
          marginBottom: '8px',
          marginTop: 0 
        }}>
          {description}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="color"
          value={hexValue?.startsWith('#') ? hexValue : `#${hexValue}`}
          onChange={handleColorChange}
          style={{
            width: '50px',
            height: '38px',
            padding: '2px',
            border: '1px solid #555',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        />
        <input
          type="text"
          value={hexValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
          placeholder="#000000"
          autoFocus={autoFocus}
          style={{
            flex: 1,
            maxWidth: '120px',
            padding: '8px 12px',
            border: '1px solid #555',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'ui-monospace, monospace',
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
          }}
        />
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '6px',
            backgroundColor: /^#[0-9A-Fa-f]{3,6}$/i.test(hexValue) ? hexValue : '#ccc',
            border: '1px solid #555',
            flexShrink: 0,
          }}
          title="Podgląd koloru"
        />
      </div>
    </div>
  );
}
