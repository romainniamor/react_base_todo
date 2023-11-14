export function DoItem({
  id,
  name,
  content,
  priority,
  onDelete,
  onPriority,
  colorClass,
}) {
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>{content}</p>
      <div className="button-section">
        <button className={colorClass} onClick={() => onPriority(id)}>
          Prioritée {priority}
        </button>
        <button
          className="delete"
          onClick={() => {
            onDelete(id);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
