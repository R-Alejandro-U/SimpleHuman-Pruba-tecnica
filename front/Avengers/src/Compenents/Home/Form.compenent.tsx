import type React from "react";
import styles from "./style/Home.module.css";
import logo from '../../assets/img/download-removebg-preview.png';
import type { CandidateFormState, Errors } from "./Interfaces/HomeForm.interface";

export const FormCandidate: React.FC<{
  data: CandidateFormState,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void,
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  errors: Errors | undefined
}> = ({ data, change, submit, errors }) => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Selección de Futuros Agentes de S.H.I.E.L.D.</h1>
        <img
          src={logo}
          alt="Logo de S.H.I.E.L.D."
          className={styles.logo}
        />
      </div>
      <form className={styles.form} onSubmit={submit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Ingresa un Candidato a Agente</legend>
          <div className={styles.formGroup}>
            <label htmlFor="nombre_completo" className={styles.label}>
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Peter Parker"
              name="nombre_completo"
              id="nombre_completo"
              className={styles.input}
              value={data.nombre_completo}
              onChange={change}
            />
            {errors?.nombre_completo && <p className={styles.error}>{errors?.nombre_completo}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="correo_electronico" className={styles.label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="peter.parker@avengers.com"
              name="correo_electronico"
              id="correo_electronico"
              className={styles.input}
              onChange={change}
              value={data.correo_electronico}
            />
            {errors?.correo_electronico && <p className={styles.error}>{errors?.correo_electronico}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="institucion_educativa" className={styles.label}>
              Institución Educativa
            </label>
            <input
              type="text"
              placeholder="Academia de Héroes de Xavier"
              name="institucion_educativa"
              id="institucion_educativa"
              list="instituciones"
              className={styles.input}
              value={data.institucion_educativa}
              onChange={change}
            />
            <datalist id="instituciones">
              <option value="Academia de Héroes de Xavier" />
              <option value="Instituto Stark" />
              <option value="Universidad Asgardiana" />
              ['Academia de Héroes de Xavier','Instituto Stark', 'Universidad Asgardiana']
            </datalist>
            {errors?.institucion_educativa && <p className={styles.error}>{errors?.institucion_educativa}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carrera_cursada" className={styles.label}>
              Carrera
            </label>
            <input
              type="text"
              placeholder="Física Aplicada"
              name="carrera_cursada"
              id="carrera_cursada"
              className={styles.input}
              value={data.carrera_cursada}
              onChange={change}
            />
            {errors?.carrera_cursada && <p className={styles.error}>{errors?.carrera_cursada}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="promedio_academico" className={styles.label}>
              Promedio Académico
            </label>
            <input
              type="number"
              placeholder="9.3"
              name="promedio_academico"
              id="promedio_academico"
              min="3"
              max="10"
              step="0.1"
              className={styles.input}
              value={data.promedio_academico ?? ''}
              onChange={change}
            />
            {errors?.promedio_academico && <p className={styles.error}>{errors?.promedio_academico}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="habilidades" className={styles.label}>
              Habilidades
            </label>
            <input
              type="text"
              placeholder="Agilidad, Tecnología, Liderazgo"
              name="habilidades"
              id="habilidades"
              list="habilidad-opciones"
              className={styles.input}
              onChange={change}
              value={data.habilidades ?? ''}
            />
            <datalist id="habilidad-opciones">
              <option value="agilidad sobrehumana" />
              <option value="combate" />
              <option value="sentido arácnido" />
              <option value="magia" />
            </datalist>
            {errors?.habilidades && <p className={styles.error}>{errors?.habilidades}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="experiencia_laboral" className={styles.label}>
              Experiencia Laboral
            </label>
            <input
              type="text"
              placeholder="Vigilante Nocturno"
              name="experiencia_laboral"
              id="experiencia_laboral"
              className={styles.input}
              onChange={change}
              value={data.experiencia_laboral ?? ''}
            />
            {errors?.experiencia_laboral && <p className={styles.error}>{errors?.experiencia_laboral}</p>}
          </div>
          <button type="submit" className={styles.submitButton}>
            Registrar Candidato
          </button>
        </fieldset>
      </form>
    </main>
  );
};