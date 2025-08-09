import { useState, useCallback } from "react";
import { deleteTask } from "../services/api";

export function useDeleteTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const res = await deleteTask(id);
    setLoading(false);
    if (res.error) setError(res.message);
    return res;
  }, []);

  return { remove, loading, error };
}
