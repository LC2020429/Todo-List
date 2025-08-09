import "./ConfirmEdit.css";

export default function ConfirmEdit({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="confirm-edit-overlay">
      <div className="confirm-edit-modal">
        <div className="confirm-edit-title">¿Seguro que quieres editar esta tarea?</div>
        <div className="confirm-edit-actions">
          <button className="confirm-btn" onClick={onConfirm}>Sí, editar</button>
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
