import { useState } from 'react';

function BuscaUsuario() {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscar() {
    if (!id) return;
    setCarregando(true);
    setErro('');
    setUsuario(null);

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users/' + id);

      if (!resposta.ok) {
        throw new Error('Usuário não encontrado');
      }

      const dados = await resposta.json();
      setUsuario(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section id="busca-usuario">
      <h2>Buscar usuário</h2>
      <div className="campo-linha">
        <input
          type="number"
          placeholder="ID do usuário (1 a 10)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      {carregando && <p className="status-busca">Carregando...</p>}
      {erro && <p className="status-busca erro">{erro}</p>}

      {usuario && (
        <div className="card-usuario">
          <p><strong>Nome:</strong> {usuario.name}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>
      )}
    </section>
  );
}

export default BuscaUsuario;