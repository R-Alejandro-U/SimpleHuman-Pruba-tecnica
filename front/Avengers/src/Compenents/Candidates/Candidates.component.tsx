/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './style/SearchCandidates.module.css';
import type { CandidateFormState } from '../Home/Interfaces/HomeForm.interface';

export const SearchCandidates: React.FC = () => {
  const [filters, setFilters] = useState({
    id: '',
    nombre: '',
    carrera: '',
    institucion: '',
    puntaje_min: '',
  });
  const [candidates, setCandidates] = useState<CandidateFormState[]>([]);

  const fetchCandidates = async () => {
    try {
      if(!filters.id){
        const { data } = await axios.get(`http://localhost:3000/candidate?nombre=${filters.nombre}&carrera=${filters.carrera}&institucion=${filters.institucion}&puntaje_min=${+filters.puntaje_min}`);
        setCandidates(data.candidates || []);
      }else{
        const id = parseInt(filters.id, 10);
        if (isNaN(id) || id < 1) throw new Error('El ID debe ser un número positivo.');
        const { data } = await axios.get(`http://localhost:3000/candidate/${id}`);
        setCandidates(data ? [data] : []);
      }
    } catch (error: any) {
        Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || 'No se pudo cargar los candidatos',
            icon: 'error',
            width: 600,
            padding: '3em',
            color: 'red',
            background: `url("https://media.vandal.net/i/1280x720/9-2020/20209911271965_1.jpg.webp") no-repeat center center`,
        });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCandidates();
  };

  return (
    <main className={styles.main}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>Buscar Candidatos</h1>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ej. Tony Stark"
              className={styles.input}
              value={filters.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carrera" className={styles.label}>
              Carrera
            </label>
            <input
              type="text"
              name="carrera"
              id="carrera"
              placeholder="Ej. Ingeniería Mecánica"
              className={styles.input}
              value={filters.carrera}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="institucion" className={styles.label}>
              Institución Educativa
            </label>
            <input
              type="text"
              name="institucion"
              id="institucion"
              placeholder="Ej. Instituto Stark"
              className={styles.input}
              value={filters.institucion}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="puntaje_min" className={styles.label}>
              Puntuación Mínima
            </label>
            <input
              type="number"
              name="puntaje_min"
              id="puntaje_min"
              placeholder="Ej. 60"
              min="0"
              max="100"
              step="1"
              className={styles.input}
              value={filters.puntaje_min}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="id" className={styles.label}>
              Buscar por ID
            </label>
            <input
              type="number"
              name="id"
              id="id"
              placeholder="Ej. 6"
              min="1"
              step="1"
              className={styles.input}
              value={filters.id}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>
      </div>
      <div className={styles.resultsSection}>
        <h2 className={styles.subtitle}>Resultados</h2>
        {candidates.length === 0 ? (
          <p className={styles.noResults}>No se encontraron candidatos.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Institución</th>
                  <th>Carrera</th>
                  <th>Promedio</th>
                  <th>Habilidades</th>
                  <th>Experiencia</th>
                  <th>Puntuación</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.id}</td>
                    <td>{candidate.nombre_completo}</td>
                    <td>{candidate.correo_electronico}</td>
                    <td>{candidate.institucion_educativa}</td>
                    <td>{candidate.carrera_cursada}</td>
                    <td>{candidate.promedio_academico}</td>
                    <td>{candidate.habilidades?.join(', ') || '-'}</td>
                    <td>{candidate.experiencia_laboral || '-'}</td>
                    <td>{candidate.puntuacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};