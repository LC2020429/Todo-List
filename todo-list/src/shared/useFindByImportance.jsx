import { useState, useEffect } from "react";
import { findByImportance } from "../services/api";

export function useFindByImportance(importance) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (importance !== undefined) {
      findByImportance(importance).then(res => {
        if (res.error) setError(res.message);
        else setTasks(res.data);
        setLoading(false);
      });
    }
  }, [importance]);

  return { tasks, loading, error };
}
