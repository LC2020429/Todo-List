import { useState, useEffect } from "react";
import TaskForm from "./components/taskForm";
import ConfirmDelete from "./components/ConfirmDelete";
import ConfirmEdit from "./components/ConfirmEdit"; // Nuevo componente
import { useGetTask } from "./shared/useGetTask";
import { useAddTask } from "./shared/useAddTask";
import { useEditTask } from "./shared/useEditTask";
import { useDeleteTask } from "./shared/useDeleteTask";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheckSquare,
  FaRegSquare,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [importance, setImportance] = useState("all");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formInitial, setFormInitial] = useState({
    title: "",
    importance: "low",
  });
  const [theme, setTheme] = useState("light");
  const [alert, setAlert] = useState({ show: false });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
  const [confirmEdit, setConfirmEdit] = useState({ show: false, id: null, title: "", importance: "" });

  const { tasks, loading, error, refetch } = useGetTask();
  const { add, loading: addLoading } = useAddTask();
  const { edit, loading: editLoading } = useEditTask();
  const { remove, loading: deleteLoading } = useDeleteTask();

  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(Array.isArray(tasks) ? tasks : []);
  }, [tasks]);

  const handleAddTaskForm = async ({ title, importance }) => {
    const newTask = {
      title,
      importance,
      date: new Date().toLocaleDateString(),
      status: "pending",
    };
    await add(newTask);
    setShowForm(false);
    setEditId(null);
    setFormInitial({ title: "", importance: "low" });
    setLocalTasks((prev) => [...prev, { ...newTask, _id: Math.random().toString() }]);
    refetch();
    setAlert({ show: true }); // Mostrar alerta al agregar
  };

  const handleEditTaskForm = async ({ title, importance }) => {
    await edit(editId, { title, importance });
    setShowForm(false);
    setEditId(null);
    setFormInitial({ title: "", importance: "low" });
    setLocalTasks((prev) =>
      prev.map((t) =>
        t._id === editId ? { ...t, title, importance } : t
      )
    );
    refetch();
    setAlert({ show: true }); // Mostrar alerta al editar
  };

  const handleEdit = (id, title, importance) => {
    setConfirmEdit({ show: true, id, title, importance });
  };

  const handleEditConfirm = () => {
    setEditId(confirmEdit.id);
    setFormInitial({ title: confirmEdit.title, importance: confirmEdit.importance });
    setShowForm(true);
    setConfirmEdit({ show: false, id: null, title: "", importance: "" });
  };

  const handleEditCancel = () => {
    setConfirmEdit({ show: false, id: null, title: "", importance: "" });
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  const handleDeleteConfirm = async () => {
    await remove(confirmDelete.id);
    setLocalTasks((prev) => prev.filter((t) => t._id !== confirmDelete.id));
    refetch();
    setAlert({ show: true });
    setConfirmDelete({ show: false, id: null });
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ show: false, id: null });
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await edit(task._id, { ...task, status: newStatus });
    setLocalTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, status: newStatus } : t
      )
    );
    refetch();
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({ show: false }), 1500);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const filteredTasks = localTasks.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) &&
      (importance === "all" || t.importance === importance)
  );

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <h1 className="main-title">TODOLIST</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </header>
      <div className="controls">
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormInitial({ title: "", importance: "low" });
          }}
        >
          Add Task
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="importance-select"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option value="all">ALL</option>
          <option value="low">LOW</option>
          <option value="medium">MEDIUM</option>
          <option value="high">HIGH</option>
        </select>
      </div>
      <div className="todo-container">
        {(loading || addLoading || editLoading || deleteLoading) && (
          <div className="loading">Cargando...</div>
        )}
        {error && <div className="error">{error}</div>}
        <ul className="task-list">
          {!filteredTasks.length && !loading && (
            <li className="empty-list">No hay tareas para mostrar.</li>
          )}
          {filteredTasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-row">
                <div className="task-left">
                  <button
                    className={`complete-btn${
                      task.status === "completed" ? " completed" : ""
                    }`}
                    onClick={() => handleToggleComplete(task)}
                    aria-label={
                      task.status === "completed"
                        ? "Marcar como pendiente"
                        : "Marcar como completado"
                    }
                    style={{ fontSize: "2rem" }}
                  >
                    {task.status === "completed" ? (
                      <FaCheckSquare />
                    ) : (
                      <FaRegSquare />
                    )}
                  </button>
                  <div className="task-title-date">
                    <span
                      className={`task-title${
                        task.status === "completed" ? " completed" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="task-date">
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString()
                        : task.date}
                    </span>
                  </div>
                </div>
                <div className="task-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(task._id, task.title, task.importance)
                    }
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskForm
              onAdd={editId ? handleEditTaskForm : handleAddTaskForm}
              isEdit={!!editId}
              initialTitle={formInitial.title}
              initialImportance={formInitial.importance}
              onClose={() => {
                setShowForm(false);
                setEditId(null);
                setFormInitial({ title: "", importance: "low" });
              }}
            />
          </div>
        </div>
      )}
      <ConfirmDelete
        show={confirmDelete.show}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <ConfirmEdit
        show={confirmEdit.show}
        onConfirm={handleEditConfirm}
        onCancel={handleEditCancel}
      />
    </div>
  );
}

export default App;
