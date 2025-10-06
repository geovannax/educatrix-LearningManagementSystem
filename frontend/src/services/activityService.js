import api from "./api";

export const activityService = {
  // Criar atividade
  create: async (activityData) => {
    try {
      const response = await api.post("/activities", activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Listar atividades
  getAll: async () => {
    try {
      const response = await api.get("/activities");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar atividade
  update: async (id, activityData) => {
    try {
      const response = await api.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Deletar atividade
  delete: async (id) => {
    try {
      const response = await api.delete(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
