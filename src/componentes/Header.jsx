import styles from './Header.module.css';

function Header({titulo, subtitulo = "Informe o subtítulo", total , pendentes , concluidas, theme, onToggleTheme }) {
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>            
          </div>

          <div className={styles.controls}>
            <div id="contadores">
              <span id="cont-total">{total} tarefas</span>
              <span className="separador">·</span>
              <span id="cont-pendentes">{pendentes} pendentes</span>
              <span className="separador">·</span>
              <span id="cont-concluidas">{concluidas} concluídas</span>
            </div>
            
            <button 
              onClick={onToggleTheme} 
              className={styles.themeToggle}
              title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
  );
}

export default Header;