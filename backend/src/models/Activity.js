/**
 * Modelo da entidade Atividade
 * Sistema de armazenamento em memória para desenvolvimento inicial
 */

class Activity {
  constructor(activityData) {
    this.id = activityData.id;
    Object.assign(this, activityData);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validações
  async validateActivityInput() {
    const errors = [];

    await this.requiredFields(this);

    if (!this.title || this.title.trim().length < 3) {
      errors.push("Título deve ter pelo menos 3 caracteres");
    }

    if (!this.description || this.description.trim().length < 10) {
      errors.push("Descrição deve ter pelo menos 10 caracteres");
    }

    if (!["codigo", "discursiva", "objetiva"].includes(this.type)) {
      errors.push("Tipo deve ser: codigo, discursiva ou objetiva");
    }

    return errors;
  }

  async requiredFields(activityData) {
    // Verificar se activityData contém todas as chaves necessárias
    const requiredKeys = ["title", "description", "type"];
    const providedKeys = Object.keys(activityData);
    const hasAllRequiredKeys = requiredKeys.every((key) =>
      providedKeys.includes(key)
    );

    if (!hasAllRequiredKeys) {
      const missingKeys = requiredKeys.filter(
        (key) => !providedKeys.includes(key)
      );
      const error = new Error("Dados de entrada inválidos");
      error.details = `É necessário fornecer todas as chaves obrigatórias. Chaves ausentes: ${missingKeys.join(
        ", "
      )}`;
      error.code = 400;
      throw error;
    }
  }

  // Serialização para JSON
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Activity;
