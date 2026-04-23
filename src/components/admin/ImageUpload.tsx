'use client';

import { useEffect, useRef, useState } from 'react';

interface ImageUploadProps {
  label: string;
  name: string;
  defaultValue?: string;
  accept?: string;
  maxSizeMB?: number;
  onChange?: (url: string) => void;
}

export default function ImageUpload({ label, name, defaultValue, accept = 'image/*', maxSizeMB = 5, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUrl(defaultValue || null);
  }, [defaultValue]);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`El archivo es demasiado grande. Máximo ${maxSizeMB}MB`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError(null);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al subir imagen');
      }

      const data = await res.json();
      const url = data.url;
      setCurrentUrl(url);
      setPreview(url);
      
      if (onChange) {
        onChange(url);
      }
    } catch (err: any) {
      setError(err.message || 'Error al subir imagen');
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  const displayPreview = preview || currentUrl;

  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input type="hidden" name={name} value={currentUrl || ''} />
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
      >
        {displayPreview ? (
          <div className="relative">
            <img src={displayPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
            <p className="text-center text-sm text-muted-foreground mt-2">Click para cambiar</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {uploading ? 'Subiendo...' : `Click para subir imagen (max ${maxSizeMB}MB)`}
            </p>
          </div>
        )}
      </div>

      <input 
        ref={fileInputRef}
        type="file" 
        accept={accept} 
        onChange={handleFileSelect}
        className="hidden" 
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}