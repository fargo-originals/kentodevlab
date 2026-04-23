export interface Servicio {
  id?: string;
  titulo: string;
  descripcion: string;
  icono: string;
  caracteristicas: string[];
  col_span: string;
  orden?: number;
  activo?: boolean;
}

export interface Proyecto {
  id?: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  orden?: number;
  activo?: boolean;
}

export interface Testimonio {
  id?: string;
  nombre: string;
  empresa: string;
  mensaje: string;
  rating: number;
  avatar?: string;
  orden?: number;
  activo?: boolean;
}

export interface HeroContent {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen?: string;
}

export interface Estadistica {
  id?: string;
  valor: string;
  etiqueta: string;
  orden?: number;
  activo?: boolean;
}