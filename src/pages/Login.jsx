import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();

    if (usuario === 'admin' && senha === '1234') {
      login();
      navigate('/', { replace: true });
      return;
    }

    setErro('Usuário ou senha incorretos');
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="login-container">
      <form className={`login-card ${shake ? 'shake' : ''}`} onSubmit={handleLogin}>
        <h1 className="login-logo">TaskFlow</h1>
        <p className="login-subtitulo">Faça login para continuar</p>

        <input
          className="login-input"
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
          autoComplete="username"
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          autoComplete="current-password"
        />

        {erro && <p className="login-erro" role="alert">{erro}</p>}

        <button className="login-btn" type="submit">Entrar</button>
        <p className="login-aviso">Login didático: use admin / 1234.</p>
      </form>
    </div>
  );
}

export default Login;
