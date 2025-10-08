import { useState, useEffect } from "react";
import { activityService } from "../services/activityService";

function delayDevelopment(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [isLoadingActivity, setLoadingActivity] = useState(false);
  const [errorActivity, setErrorActivity] = useState(null);

  // Carregar atividades
  const loadActivities = async () => {
    setLoadingActivity(true);
    setErrorActivity(null);

    try {
      const response = await activityService.getAll();
      setActivities(response.data || response);
    } catch (err) {
      setErrorActivity(
        err.response?.data?.details || "Erro ao carregar atividades"
      );
    } finally {
      setLoadingActivity(false);
    }
  };

  // Criar atividade
  const createActivity = async (activityData) => {
    setLoadingActivity(true);
    setErrorActivity(null);

    // Simula atraso para desenvolvimento
    await delayDevelopment();

    try {
      const newActivity = await activityService.create(activityData);
      setActivities((prev) => [...prev, newActivity.data || newActivity]);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.details || "Erro ao criar atividade";

      if (typeof errorMessage === "string") {
        setErrorActivity(`API: ${errorMessage}`);
      } else if (Array.isArray(errorMessage)) {
        const errorsWithPrefix = errorMessage.map((error) => `API: ${error}`);
        setErrorActivity(errorsWithPrefix);
      }
      return { success: false };
    } finally {
      setLoadingActivity(false);
    }
  };

  // Deletar atividade
  const deleteActivity = async (id) => {
    setLoadingActivity(true);
    setErrorActivity(null);

    // Simula atraso para desenvolvimento
    await delayDevelopment();

    try {
      await activityService.delete(id);
      setActivities((prev) => prev.filter((activity) => activity.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.details || "Erro ao deletar atividade";
      setErrorActivity(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoadingActivity(false);
    }
  };

  // Deletar atividade
  const updateActivity = async (id, activityData) => {
    setLoadingActivity(true);
    setErrorActivity(null);

    // Simula atraso para desenvolvimento
    await delayDevelopment();

    try {
      const result = await activityService.update(id, activityData);
      setActivities((prev) =>
        prev.map((activity) => (activity.id === id ? result.data : activity))
      );
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.details || "Erro ao atualizar atividade";
      setErrorActivity(`API: ${errorMessage}`);
      return { success: false };
    } finally {
      setLoadingActivity(false);
    }
  };

  // Carregar atividades ao montar o componente
  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    isLoadingActivity,
    errorActivity,
    createActivity,
    deleteActivity,
    updateActivity,
    loadActivities,
    clearError: () => setErrorActivity(null),
  };
}
