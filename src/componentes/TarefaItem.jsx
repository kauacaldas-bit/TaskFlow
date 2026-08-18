import styles from "./TarefaItem.module.css";

function TarefaItem({
  id,
  texto,
  coluna,
  moverTarefa,
  prioridade = "media",
  cidade,
  onDeletar,
  onEditar,
}) {
  const isConcluida = coluna === "concluido";

  const classeItem =
    (isConcluida ? styles.tarefa + " " + styles.concluida : styles.tarefa) +
    " " +
    styles[prioridade];

  const classeTexto = isConcluida
    ? styles.textoTarefa + " " + styles["texto-tarefa"]
    : styles.textoTarefa;

  const classePrioridade =
    styles["badge-prioridade"] + " " + styles["badge-" + prioridade];

  return (
    <li className={classeItem}>
      <div className={styles.conteudo}>
        <span className={classeTexto} onDoubleClick={onEditar} title="Duplo clique para editar">
          {texto}
        </span>

        <div className={styles.badges}>
          {cidade && <span className={styles["badge-cidade"]}>📍 {cidade}</span>}
          <span className={classePrioridade}>{prioridade}</span>
        </div>
      </div>

      <div className={styles.acoes}>
        {coluna !== "afazer" && (
          <button
            onClick={() =>
              moverTarefa(id, coluna === "concluido" ? "andamento" : "afazer")
            }
            title="Mover para esquerda"
          >
            ←
          </button>
        )}

        {coluna !== "concluido" && (
          <button
            onClick={() =>
              moverTarefa(id, coluna === "afazer" ? "andamento" : "concluido")
            }
            title="Mover para direita"
          >
            →
          </button>
        )}

        <button className={styles.btnDeletar} onClick={onDeletar} title="Excluir tarefa">
          X
        </button>
      </div>
    </li>
  );
}

export default TarefaItem;
