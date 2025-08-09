import "./ConfirmDelete.css";

export default function ConfirmDelete({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="confirm-delete-overlay">
      <div className="confirm-delete-modal">
        <div className="confirm-delete-title">¿Seguro que quieres eliminar esta tarea?</div>
        <div className="confirm-delete-actions">
          <button className="confirm-btn" onClick={onConfirm}>Sí, eliminar</button>
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
