import { useState } from "react";
import TaskForm from "./components/taskForm";
import { useGetTask } from "./shared/useGetTask";
import { useAddTask } from "./shared/useAddTask";
import { useEditTask } from "./shared/useEditTask";
import { useDeleteTask } from "./shared/useDeleteTask";

function App() {
  const [search, setSearch] = useState("");
  const [importance, setImportance] = useState("all");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formInitial, setFormInitial] = useState({ title: "", importance: "low" });

  const { tasks, loading, error } = useGetTask();
  const { add, loading: addLoading } = useAddTask();
  const { edit, loading: editLoading } = useEditTask();
  const { remove, loading: deleteLoading } = useDeleteTask();

  const handleAddTaskForm = async ({ title, importance }) => {
    await add({
      title,
      importance,
      date: new Date().toLocaleDateString(),
    });
    setShowForm(false);
    setEditId(null);
    setFormInitial({ title: "", importance: "low" });
  };

  const handleEditTaskForm = async ({ title, importance }) => {
    await edit(editId, { title, importance });
    setShowForm(false);
    setEditId(null);
    setFormInitial({ title: "", importance: "low" });
  };

  const handleChangeImportance = async (id, value) => {
    await edit(id, { importance: value });
  };

  const handleEdit = (id, title, importance) => {
    setEditId(id);
    setFormInitial({ title, importance });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) &&
      (importance === "all" || t.importance === importance)
  );

  return (
    <div style={{ background: "#f5f5f5", color: "#222", minHeight: "100vh" }}>
      <h1>TodoList</h1>
      <div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormInitial({ title: "", importance: "low" });
          }}
        >
          Agregar
        </button>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>
      {showForm && (
        <TaskForm
          onAdd={editId ? handleEditTaskForm : handleAddTaskForm}
          isEdit={!!editId}
          initialTitle={formInitial.title}
          initialImportance={formInitial.importance}
        />
      )}
      {(loading || addLoading || editLoading || deleteLoading) && (
        <div>Cargando...</div>
      )}
      {error && <div>{error}</div>}
      <ul>
        {!filteredTasks.length && !loading && (
          <li>No hay tareas para mostrar.</li>
        )}
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <div>
              <span>{task.title}</span>
              <span>
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : task.date}
              </span>
            </div>
            <select
              value={task.importance}
              onChange={(e) => handleChangeImportance(task._id, e.target.value)}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            <div>
              <button
                onClick={() =>
                  handleEdit(task._id, task.title, task.importance)
                }
              >
                ✏️
              </button>
              <button onClick={() => handleDelete(task._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
