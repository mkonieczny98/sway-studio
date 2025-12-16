import { fields, FormFieldStoredValue } from '@keystatic/core';

// Custom field for Cloudinary image upload
// Returns URL string instead of file
export function cloudinaryImage(config: { label: string; description?: string }) {
  return fields.text({
    label: config.label,
    description: config.description || 'Kliknij "Dodaj zdjęcie" aby wrzucić przez Cloudinary',
  });
}
