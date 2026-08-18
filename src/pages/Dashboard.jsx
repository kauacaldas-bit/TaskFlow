import { useEffect, useState } from 'react';
import Header from '../componentes/Header';
import ListaTarefas from '../componentes/ListaTarefas';
import ModalTarefa from '../componentes/ModalTarefa';

function Dashboard({ theme, onToggleTheme }) {
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem('tarefas');
    return salvas ? JSON.parse(salvas) : [];
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState('afazer');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas');

  const total = tarefas.length;
  const pendentes = tarefas.filter((tarefa) => tarefa.coluna === 'afazer').length;
  const concluidas = tarefas.filter((tarefa) => tarefa.coluna === 'concluido').length;

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    document.title = pendentes > 0 ? `(${pendentes}) TaskFlow` : 'TaskFlow';
  }, [pendentes]);

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  function salvarTarefa(dados) {
    if (dados.id) {
      setTarefas((atuais) => atuais.map((tarefa) => (
        tarefa.id === dados.id ? { ...tarefa, ...dados } : tarefa
      )));
      return;
    }

    setTarefas((atuais) => [...atuais, { ...dados, id: Date.now() }]);
  }

  function deletarTarefa(id) {
    const confirmado = window.confirm('Tem certeza que deseja deletar esta tarefa?');
    if (confirmado) setTarefas((atuais) => atuais.filter((tarefa) => tarefa.id !== id));
  }

  function moverTarefa(id, novaColuna) {
    setTarefas((atuais) => atuais.map((tarefa) => (
      tarefa.id === id
        ? { ...tarefa, coluna: novaColuna }
        : tarefa
    )));
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => (
    filtroPrioridade === 'todas' || tarefa.prioridade === filtroPrioridade
  ));

  const colunas = [
    { id: 'afazer', titulo: 'A Fazer', proxima: 'andamento' },
    { id: 'andamento', titulo: 'Em Andamento', anterior: 'afazer', proxima: 'concluido' },
    { id: 'concluido', titulo: 'Concluído', anterior: 'andamento' },
  ];

  return (
    <>
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" total={total} pendentes={pendentes} concluidas={concluidas} theme={theme} onToggleTheme={onToggleTheme} />
      <div className="container dashboard-container">
        <div className="filtro-prioridade">
          <label htmlFor="filtro-prioridade">Filtrar por prioridade:</label>
          <select id="filtro-prioridade" value={filtroPrioridade} onChange={(event) => setFiltroPrioridade(event.target.value)}>
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>

        <div className="kanban">
          {colunas.map((coluna) => {
            const tarefasDaColuna = tarefas.filter((tarefa) => tarefa.coluna === coluna.id);
            const tarefasVisiveis = tarefasFiltradas.filter((tarefa) => tarefa.coluna === coluna.id);

            return (
              <div className="coluna" key={coluna.id}>
                <div className="kanban-coluna-header">
                  <h2>{coluna.titulo}</h2>
                  <div className="kanban-coluna-controles">
                    <span className="kanban-contador">{tarefasDaColuna.length}</span>
                    <button className="kanban-btn-add" type="button" onClick={() => abrirModalCriar(coluna.id)} aria-label={`Adicionar tarefa em ${coluna.titulo}`}>+</button>
                  </div>
                </div>
                <ListaTarefas tarefas={tarefasVisiveis} onDeletar={deletarTarefa} onEditar={abrirModalEditar} moverTarefa={moverTarefa} />
              </div>
            );
          })}
        </div>
      </div>
      <ModalTarefa aberto={modalAberto} onFechar={() => setModalAberto(false)} onSalvar={salvarTarefa} tarefa={tarefaEditando} coluna={colunaAtiva} />
    </>
  );
}

export default Dashboard;
