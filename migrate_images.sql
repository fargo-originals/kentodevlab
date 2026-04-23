-- Añadir columnas de imagen si no existen
ALTER TABLE public.proyectos ADD COLUMN IF NOT EXISTS imagen TEXT;
ALTER TABLE public.testimonios ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE public.hero ADD COLUMN IF NOT EXISTS imagen TEXT;

-- Verificar columnas creadas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('proyectos', 'testimonios', 'hero')
AND column_name IN ('imagen', 'avatar');