import { BasicFormField, FormFieldStoredValue } from '@keystatic/core';
import { ColorFieldInput } from './color-field-input';

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
      return (
        <ColorFieldInput 
          value={value} 
          onChange={onChange} 
          autoFocus={autoFocus}
          label={config.label}
          description={config.description}
          defaultValue={config.defaultValue}
        />
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
