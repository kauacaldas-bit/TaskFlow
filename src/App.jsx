import { useState, useEffect } from "react";
import Sidebar from "./componentes/sidebar";
import AppRoutes from "./routes/AppRoutes";
import ShaderBackground from "./componentes/ShaderBackground";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-layout">
      <ShaderBackground theme={theme} />
      <Sidebar />
      <main className="app-conteudo">
        <AppRoutes
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </main>
    </div>
  );
}

export default App;
