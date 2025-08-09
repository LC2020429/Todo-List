import { useState, useEffect } from "react";
import { getTasks } from "../services/api";

export function useGetTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks().then((res) => {
      if (res.error) setError(res.message);
      else {
        const arr = Array.isArray(res.data?.tasks) ? res.data.tasks : [];
        setTasks(arr);
      }
      setLoading(false);
    });
  }, []);

  return { tasks, loading, error };
}
