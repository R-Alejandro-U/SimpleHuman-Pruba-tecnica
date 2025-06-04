export interface CandidateFormState {
  nombre_completo: string;
  correo_electronico: string;
  institucion_educativa: string;
  carrera_cursada: string;
  promedio_academico: number | undefined;
  habilidades: string[] | string | undefined;
  experiencia_laboral: string | undefined;
}


export interface Errors {
  nombre_completo?: string;
  correo_electronico?: string;
  institucion_educativa?: string;
  carrera_cursada?: string;
  promedio_academico?: number | string;
  habilidades?: string[] | string | undefined;
  experiencia_laboral?: string | undefined;
}


export interface Regex {
  nombre_completo: RegExp;
  correo_electronico: RegExp;
  institucion_educativa: RegExp;
  carrera_cursada: RegExp;
  promedio_academico: RegExp;
  habilidad: RegExp;
  experiencia_laboral: RegExp;
}