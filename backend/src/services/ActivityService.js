import prisma from "../prisma.js";
import { activitySchema } from "@educatrix/shared/schemas/activitySchema.js";

/**
 * Serviço de Atividades
 * Contém a lógica de negócio relacionada às atividades
 */
class ActivityService {
  /**
   * Cria uma nova atividade
   * @param {Object} activityData - Dados da atividade a ser criada
   * @return {Promise<Object>} Atividade criada
   * @throws {Error} Erro de validação ou criação
   */
  async createActivity(activityData) {
    const result = activitySchema.safeParse(activityData);
    if (!result.success) {
      const error = new Error("Dados de entrada inválidos");
      error.code = 400;
      error.details = result.error.issues.map((e) => e.message);
      throw error;
    }

    const newActivity = await prisma.activity
      .create({
        data: {
          title: activityData.title,
          description: activityData.description,
          type: {
            connect: { type: activityData.type },
          },
          professor: {
            connect: { email: "prof@educatrix.dev" }, // Substitua pelo email real do professor
          },
        },
      })
      .catch((erro) => {
        console.error("Erro ao criar atividade:", erro);
        const error = new Error("Erro ao criar atividade");
        error.code = 400;
        error.details = "Erro ao criar atividade";
        throw error;
      });

    return this.getActivityById(newActivity.id);
  }

  /**
   * Lista todas as atividades
   * @returns {Promise<Array>} Lista de atividades (sempre array, mesmo se vazio)
   * @throws {Error} Erro ao buscar atividades
   */
  async getAllActivities() {
    const activities = await prisma.activity
      .findMany({
        include: {
          type: { select: { type: true } },
        },
      })
      .catch((erro) => {
        const error = new Error("Erro ao buscar atividades");
        error.code = 400;
        error.details = "Erro ao buscar atividades";
        throw error;
      });

    // Mapeia para retornar apenas os campos desejados
    return activities.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type?.type, // retorna só o nome do tipo
      description: a.description,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
  }

  /**
   * Recupera uma atividade pelo ID
   * @returns {Promise<Object|null>} Atividade ou null se não encontrada
   * @param {number} id - ID da atividade
   * @throws {Error} Erro ao buscar atividade
   */
  async getActivityById(id) {
    const activityId = parseInt(id, 10);
    const activity = await prisma.activity
      .findUnique({
        where: { id: activityId },
        include: {
          type: { select: { type: true } },
        },
      })
      .catch((erro) => {
        const error = new Error("Erro ao buscar atividade");
        error.code = 400;
        error.details = "Erro ao buscar atividade";
        throw error;
      });

    if (!activity) {
      return null;
    }

    return {
      id: activity.id,
      title: activity.title,
      type: activity.type?.type, // retorna só o nome do tipo
      description: activity.description,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
    };
  }

  /**
   * Atualiza uma atividade pelo ID
   * @param {number} id - ID da atividade a ser atualizada
   * @param {Object} updateData - Dados a serem atualizados
   * @return {Promise<Object>} Atividade atualizada
   * @throws {Error} Erro de validação ou atualização
   */
  async updateActivityById(id, updateData) {
    const activityId = parseInt(id, 10);

    const result = activitySchema.safeParse(updateData);
    if (!result.success) {
      const error = new Error("Dados de entrada inválidos");
      error.code = 400;
      error.details = result.error.issues.map((e) => e.message);
      throw error;
    }

    const updatedActivity = await prisma.activity
      .update({
        where: { id: activityId },
        data: {
          title: updateData.title,
          description: updateData.description,
          type: {
            connect: { type: updateData.type },
          },
        },
      })
      .catch((erro) => {
        const error = new Error("Erro ao atualizar atividade");
        error.code = 400;
        error.details = "Erro ao atualizar atividade";
        throw error;
      });

    return await this.getActivityById(updatedActivity.id);
  }

  /**
   * Deleta uma atividade pelo ID
   * @param {number} id - ID da atividade a ser deletada
   * @returns {Promise<boolean>} true se deletada, false se não encontrada
   */
  async deleteActivityById(id) {
    const activityId = parseInt(id, 10);

    const activity = await prisma.activity
      .delete({
        where: { id: activityId },
      })
      .catch((erro) => {
        const error = new Error("Erro ao deletar atividade");
        error.code = 400;
        error.details = "Erro ao deletar atividade";
        throw error;
      });

    return !!activity;
  }
}

export default new ActivityService();
