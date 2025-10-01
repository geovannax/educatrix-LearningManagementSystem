import Activity from "../models/Activity.js";
/**
 * Serviço de Atividades
 * Contém a lógica de negócio relacionada às atividades
 */
class ActivityService {
  constructor() {
    // Armazenamento em memória
    this.activities = [];
    this.nextId = 1;
  }

  /**
   * Cria uma nova atividade
   * @param {Object} activityData - Dados da atividade a ser criada
   * @returns {Promise<Activity>} Dados da atividade criada
   * @throws {Error} Erro de validação ou criação
   */
  async createActivity(activityData) {
    // Atribuir ID único
    activityData.id = this.nextId++;

    // Criar instância usando o modelo Activity
    const newActivity = new Activity(activityData);

    // Validações de entrada
    const validationErrors = await newActivity.validateActivityInput();
    if (validationErrors.length > 0) {
      const error = new Error("Dados de entrada inválidos");
      error.code = 400;
      error.details = validationErrors;
      throw error;
    }

    this.activities.push(newActivity);

    // Validar se o tipo de atividade é codigo se sim
    // enviar para API do servidor externo (simulada)

    return newActivity;
  }

  /**
   * Lista todas as atividades
   * @returns {Promise<Array>} Lista de atividades (sempre array, mesmo se vazio)
   */
  async getAllActivities() {
    let result = [...this.activities];
    return result;
  }

  /**
   * Recupera uma atividade pelo ID
   * @param {number} id - ID da atividade
   * @returns {Promise<Activity|null>} Atividade encontrada ou null
   */
  async getActivityById(id) {
    const activityId = parseInt(id, 10);
    const activity = this.activities.find((a) => a.id === activityId);
    return activity || null;
  }

  /**
   * Atualiza uma atividade pelo ID
   * @param {number} id - ID da atividade a ser atualizada
   * @param {Object} updateData - Dados a serem atualizados
   * @returns {Promise<Activity|null>} Atividade atualizada ou null se não encontrada
   * @throws {Error} Erro de validação ou atualização
   */
  async updateActivityById(id, updateData) {
    const activity = await this.getActivityById(id);
    if (!activity) {
      return null;
    }

    // Criar uma cópia e atualiza os campos para validação
    const tempActivity = { ...activity, ...updateData };
    // Atualizar a data de atualização
    tempActivity.updatedAt = new Date().toISOString();

    // Criar instância temporária do modelo para validação
    const activityToValidate = new Activity(tempActivity);

    // Validações de entrada
    const validationErrors = await activityToValidate.validateActivityInput();
    if (validationErrors.length > 0) {
      const error = new Error("Dados de entrada inválidos");
      error.code = 400;
      error.details = validationErrors;
      throw error;
    }

    // Atualiza os dados da atividade
    Object.assign(activity, tempActivity);

    return activity;
  }

  /**
   * Deleta uma atividade pelo ID
   * @param {number} id - ID da atividade a ser deletada
   * @returns {Promise<boolean>} true se deletada, false se não encontrada
   */
  async deleteActivityById(id) {
    const activityId = parseInt(id, 10); // Converter para number
    const activityIndex = this.activities.findIndex((a) => a.id === activityId);
    if (activityIndex === -1) {
      return false;
    }
    this.activities.splice(activityIndex, 1);
    return true;
  }
}

export default new ActivityService();
