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
        color: 'inherit'
      }}>
        {label}
      </label>
      {description && (
        <p style={{ 
          fontSize: '12px', 
          color: 'inherit',
          opacity: 0.7,
          marginBottom: '8px',
          marginTop: 0 
        }}>
          {description}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Kontener z checkerboard pattern dla widoczności jasnych kolorów */}
        <div style={{
          width: '50px',
          height: '38px',
          borderRadius: '6px',
          border: '2px solid #333',
          background: `
            linear-gradient(45deg, #808080 25%, transparent 25%),
            linear-gradient(-45deg, #808080 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #808080 75%),
            linear-gradient(-45deg, transparent 75%, #808080 75%)
          `,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <input
            type="color"
            value={hexValue?.startsWith('#') ? hexValue : `#${hexValue}`}
            onChange={handleColorChange}
            style={{
              width: '100%',
              height: '100%',
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          />
        </div>
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
        {/* Podgląd z checkerboard dla jasnych kolorów */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '6px',
            border: '2px solid #333',
            background: `
              linear-gradient(45deg, #666 25%, transparent 25%),
              linear-gradient(-45deg, #666 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #666 75%),
              linear-gradient(-45deg, transparent 75%, #666 75%)
            `,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            position: 'relative',
            flexShrink: 0,
          }}
          title="Podgląd koloru"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '4px',
              backgroundColor: /^#[0-9A-Fa-f]{3,6}$/i.test(hexValue) ? hexValue : '#ccc',
            }}
          />
        </div>
      </div>
    </div>
  );
}
