# 🛡️ S.H.I.E.L.D. Sistema de Reclutamiento - Proyecto SimpleHuman

**Documento Clasificado: Nivel 7 de Autorización Requerido**

Agente, bienvenido a **SimpleHuman**, la plataforma de reclutamiento de S.H.I.E.L.D., diseñada para identificar, registrar y evaluar candidatos potenciales. Este sistema es clave para proteger a la humanidad de amenazas extraordinarias.

🕒 Fecha y hora actual: 05:29 PM -03, Miércoles, 4 de Junio de 2025

---

## 🎯 Resumen de la Misión

SimpleHuman es una aplicación **full-stack** que permite:

- Registrar candidatos con perfiles detallados.
- Buscar y filtrar candidatos por ID, nombre, carrera, institución, puntuación.
- Generar y descargar reportes PDF de candidatos preseleccionados (puntuación ≥ 60).
- Mantener una interfaz segura, amigable y con diseño futurista de S.H.I.E.L.D.

---

## 🗂️ Estructura del Proyecto

### 1. Frontend - Interfaz de Operaciones

- **Tecnologías**:
  - React + TypeScript
  - React Router
  - Axios
  - SweetAlert2
  - CSS Modules
  - Vite

- **Estructura**:
src/
├── assets/img/
├── components/
│ ├── Home/
│ ├── Navbar/
│ └── SearchCandidates/
├── Context/
├── utils/
├── App.tsx
└── main.tsx



- **Páginas**:
- `/`: Formulario de registro + lista
- `/search`: Búsqueda con filtros
- Navbar con navegación y botón de descarga PDF

- **Estilos**:
- Tema: gradiente oscuro (#1a252f a #2c3e50)
- Inputs azules, botones con hover
- Tablas con fondo semitransparente y responsividad

- **Validaciones (utils/validate.ts)**:
- Regex para nombre, correo, institución, carrera, promedio, habilidades y experiencia.
- Campos obligatorios: nombre, correo, institución, carrera, promedio.
- Máximo 10 habilidades (separadas por coma).

- **Descarga PDF**:
- `GET /candidate/report` (responseType: 'blob')
- Genera: `preselected_candidates.pdf` (puntuación ≥ 60)

### 2. Backend - Centro de Datos

- **Tecnologías**:
- NestJS + TypeScript
- class-validator
- pdfkit
- Swagger
- fs (para `Candidates.json`)

- **Estructura**:
src/
├── candidate/
│ ├── candidate.controller.ts
│ ├── candidate.service.ts
│ ├── dto/
│ └── interfaces/
├── app.module.ts
├── main.ts
└── Candidates.json



- **Endpoints**:
- `POST /candidate`: Registrar nuevo candidato
- `GET /candidate`: Listar o filtrar
- `GET /candidate/:id`: Buscar por ID
- `GET /candidate/report`: Descargar PDF

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js (v18+)
- npm o yarn

### Frontend

```bash
git clone <repositorio-frontend>
cd simplehuman-frontend
npm install
npm run dev
# Accede a http://localhost:5173/


Dependencias Clave

"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.1",
  "axios": "^1.5.0",
  "sweetalert2": "^11.7.12"
},
"devDependencies": {
  "@types/react": "^18.2.7",
  "@types/react-dom": "^18.2.4",
  "@vitejs/plugin-react": "^4.0.0",
  "typescript": "^5.0.4",
  "vite": "^4.4.0"
}


✅ Funcionalidades Clave
Registro de Candidatos
Campos: nombre, correo, institución, carrera, promedio, habilidades, experiencia.

Validaciones estrictas por regex.

POST: /candidate

Listado y Búsqueda
Tabla con todos los candidatos (GET /candidate?page=1&limit=100)

Filtros:

Por ID: GET /candidate/:id

Por nombre, carrera, institución, puntaje: GET /candidate?filter[...]

Reportes PDF
Candidatos con puntuación ≥ 60

GET /candidate/report

Genera archivo preselected_candidates.pdf

🔒 Seguridad y Diseño
Validación de entrada en frontend y backend.

Interfaz moderna, consistente y responsive.

Efectos visuales al estilo S.H.I.E.L.D.

🧪 Ejemplo de Registro (POST /candidate)
{
  "nombre_completo": "Tony Stark",
  "correo_electronico": "tony.stark@avengers.com",
  "institucion_educativa": "Instituto Stark",
  "carrera_cursada": "Ingeniería Mecánica",
  "promedio_academico": 9.2,
  "habilidades": ["tecnología", "ingenio", "liderazgo"],
  "experiencia_laboral": "CEO de Stark Industries"
}

🧩 Licencia
Este proyecto forma parte del entrenamiento interno de agentes de S.H.I.E.L.D. No distribuir sin autorización nivel 7 o superior.

¿Deseas que también lo genere como archivo `.md` para descarga o con versiones separadas para frontend y backend?








