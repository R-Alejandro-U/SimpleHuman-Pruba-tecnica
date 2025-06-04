import type React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CandidateContext } from "../../Context/Candidate.context";
import styles from "./styles/Navbar.module.css";

export const Navbar: React.FC = () => {
  const { getPDF } = useContext(CandidateContext);
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <span>Ingresar Agente</span>
      </Link>
      <Link to="/search" className={styles.link}>
        <span>Buscar</span>
      </Link>
      <span>
        <button onClick={getPDF} className={styles.button}>
          Preseleccionados
        </button>
      </span>
    </header>
  );
};