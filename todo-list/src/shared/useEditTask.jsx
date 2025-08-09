import { useState, useCallback } from "react";
import { editTask } from "../services/api";

export function useEditTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const edit = useCallback(async (id, updatedTask) => {
    setLoading(true);
    setError(null);
    const res = await editTask(id, updatedTask);
    setLoading(false);
    if (res.error) setError(res.message);
    return res;
  }, []);

  return { edit, loading, error };
}
