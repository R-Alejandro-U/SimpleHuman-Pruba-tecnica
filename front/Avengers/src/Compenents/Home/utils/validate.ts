import type { CandidateFormState, Errors, Regex } from "../Interfaces/HomeForm.interface";

export const validate = (candidate: CandidateFormState) => {
    const errors: Errors = {};
    const regex: Regex  = {
    nombre_completo: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/,
    correo_electronico: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    institucion_educativa: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s&-]{3,100}$/,
    carrera_cursada: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]{3,100}$/,
    promedio_academico: /^(?:[3-9](?:\.[0-9]{1,2})?|10(?:\.0{1,2})?)$/,
    habilidad: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
    experiencia_laboral: /^[\w\sÁÉÍÓÚáéíóúÑñ,.-]{0,500}$/,
  };

  if (candidate.nombre_completo.length) {
    if (!regex.nombre_completo.test(candidate.nombre_completo)) {
      errors.nombre_completo = 'El nombre debe ser una cadena de texto entre 3 y 100 caracteres';
    }
  }

  if (candidate.correo_electronico.length) {
    if (!regex.correo_electronico.test(candidate.correo_electronico)) {
      errors.correo_electronico = 'El correo electrónico debe ser válido';
    }
  }

  if (candidate.institucion_educativa.length) {
    if (!regex.institucion_educativa.test(candidate.institucion_educativa)) {
      errors.institucion_educativa = 'La institución debe ser una cadena de texto entre 3 y 100 caracteres';
    }
  }

  if (candidate.carrera_cursada.length) {
    if (!regex.carrera_cursada.test(candidate.carrera_cursada)) {
      errors.carrera_cursada = 'La carrera debe ser una cadena de texto entre 3 y 100 caracteres';
    }
  } 

  if (candidate.promedio_academico !== undefined) {
    if (!regex.promedio_academico.test(candidate.promedio_academico.toString())) {
      errors.promedio_academico = 'El promedio debe estar entre 3.0 y 10.0';
    }
  }

  if (candidate.habilidades?.length) {
    if (candidate.habilidades?.length > 10) {
      errors.habilidades = 'Máximo 10 habilidades permitidas';
    } else if (Array.isArray(candidate.habilidades) ? !candidate.habilidades.every((h) => regex.habilidad.test(h)) : 0) {
      errors.habilidades = 'Cada habilidad debe ser una cadena de texto entre 2 y 50 caracteres';
    }
  } 

  if (candidate.experiencia_laboral?.length) {
    if (!regex.experiencia_laboral.test(candidate.experiencia_laboral)) {
      errors.experiencia_laboral = 'La experiencia laboral debe ser una cadena válida (máximo 500 caracteres)';
    }
  }
  
    return Object.keys(errors).length ? errors : undefined;
} 