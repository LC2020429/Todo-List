import { useState, useEffect } from "react";
import { getTasks } from "../services/api";

export function useGetTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks().then((res) => {
      console.log("Respuesta backend:", res); // Debug
      if (res.error) setError(res.message);
      else {
        // Extrae correctamente las tareas del backend
        const arr = Array.isArray(res.data?.tasks) ? res.data.tasks : [];
        setTasks(arr);
      }
      setLoading(false);
    });
  }, []);

  return { tasks, loading, error };
}
