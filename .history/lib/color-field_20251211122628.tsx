'use client';

import { BasicFormField, FormFieldStoredValue } from '@keystatic/core';
import { FieldPrimitive } from '@keystar/ui/field';
import { TextArea, TextField } from '@keystar/ui/text-field';
import { useState, useEffect } from 'react';

// Custom Color Field dla Keystatic z color pickerem
export function colorField(config: {
  label: string;
  defaultValue?: string;
  description?: string;
}): BasicFormField<string> {
  return {
    kind: 'form',
    formKind: undefined,
    label: config.label,
    Input({ value, onChange, autoFocus }) {
      const [hexValue, setHexValue] = useState(value || config.defaultValue || '#000000');
      
      useEffect(() => {
        if (value !== hexValue) {
          setHexValue(value || config.defaultValue || '#000000');
        }
      }, [value]);

      const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setHexValue(newColor);
        onChange(newColor);
      };

      const handleTextChange = (newValue: string) => {
        // Walidacja hex koloru
        if (/^#[0-9A-Fa-f]{6}$/.test(newValue) || /^#[0-9A-Fa-f]{3}$/.test(newValue)) {
          setHexValue(newValue);
          onChange(newValue);
        } else {
          setHexValue(newValue);
        }
      };

      return (
        <FieldPrimitive label={config.label} description={config.description}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="color"
              value={hexValue?.startsWith('#') ? hexValue : `#${hexValue}`}
              onChange={handleColorChange}
              style={{
                width: '60px',
                height: '40px',
                padding: '2px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
            <input
              type="text"
              value={hexValue}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="#000000"
              autoFocus={autoFocus}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: hexValue,
                border: '2px solid #e0e0e0',
              }}
            />
          </div>
        </FieldPrimitive>
      );
    },
    defaultValue() {
      return config.defaultValue || '#000000';
    },
    parse(value: FormFieldStoredValue) {
      if (value === undefined) {
        return config.defaultValue || '#000000';
      }
      if (typeof value !== 'string') {
        throw new Error('Must be a string');
      }
      return value;
    },
    serialize(value) {
      return { value };
    },
    validate(value) {
      return value;
    },
    reader: {
      parse(value: FormFieldStoredValue) {
        if (typeof value !== 'string') {
          return config.defaultValue || '#000000';
        }
        return value;
      },
    },
  };
}
