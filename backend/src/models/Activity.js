/**
 * Modelo da entidade Atividade
 * Sistema de armazenamento em memória para desenvolvimento inicial
 */

class Activity {
  constructor(activityData) {
    this.id = activityData.id;
    this.title = activityData.title;
    this.type = activityData.type;
    this.description = activityData.description;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validações
  async validateActivityInput() {
    const errors = [];

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
