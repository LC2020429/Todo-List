import { useState } from 'react'
import "../assets/taskForm.css"

function TaskForm({ onAdd, isEdit = false, initialTitle = '', initialImportance = 'low', onClose }) {
  const [title, setTitle] = useState(initialTitle)
  const [importance, setImportance] = useState(initialImportance)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }
    onAdd({ title, importance })
    setTitle('')
    setImportance('low')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {onClose && (
        <button
          type="button"
          className="form-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
      <label>
        Título
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Escribe la tarea..."
        />
      </label>
      <label>
        Importancia
        <select
          value={importance}
          onChange={e => setImportance(e.target.value)}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </label>
      {error && (
        <div>{error}</div>
      )}
      <button type="submit">
        {isEdit ? 'Actualizar tarea' : 'Agregar tarea'}
      </button>
    </form>
  )
}

export default TaskForm