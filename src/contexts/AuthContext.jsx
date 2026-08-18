import { useState } from 'react';
import AuthContext from './AuthContextBase';

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);

  function login() {
    setLogado(true);
  }

  function logout() {
    setLogado(false);
  }

  return (
    <AuthContext.Provider value={{ logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
