import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { useAuth } from "../contexts/useAuth";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logado, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.ativo}` : styles.link;

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className={`${styles.toggleBtn} ${isOpen ? styles.btnOpen : ""}`}
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="menu-lateral"
          aria-label={isOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
          title={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          Menu
        </button>
      )}

      <aside
        id="menu-lateral"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        {isOpen && (
          <button
            type="button"
            className={styles.closeCorner}
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu lateral"
            title="Fechar menu"
          />
        )}
        <div className={styles.logo}>
          <h1>TaskFlow</h1>
        </div>
        <nav className={styles.nav}>
          {logado && (
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/sobre" className={linkClass}>
            Sobre
          </NavLink>
          {!logado && (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </nav>
        {logado && (
          <button type="button" className={styles.btnLogout} onClick={logout}>
            Sair
          </button>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
