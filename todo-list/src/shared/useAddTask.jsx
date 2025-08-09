import { useState, useCallback } from "react";
import { addTask } from "../services/api";

export function useAddTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const add = useCallback(async (task) => {
    setLoading(true);
    setError(null);
    const res = await addTask(task);
    setLoading(false);
    if (res.error) setError(res.message);
    return res;
  }, []);

  return { add, loading, error };
}
