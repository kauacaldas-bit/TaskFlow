import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { useAuth } from "../contexts/useAuth";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { logado, logout } = useAuth();

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
        <button
          type="button"
          className={styles.btnFullscreen}
          onClick={toggleFullscreen}
          title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
              <path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8V5a2 2 0 0 1 2-2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/>
              <path d="M21 16v3a2 2 0 0 1-2 2h-3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/>
            </svg>
          )}
          {isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
        </button>
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
