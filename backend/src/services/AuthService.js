import User from "../models/User.js";

class AuthService {
  /**
   * Autentica usuário com email e senha
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Resultado da autenticação
   */
  async authenticate(email, password) {
    const user = User.findByEmail(email);

    if (!user || user.password !== password) {
      return false;
    }

    return user;
  }

  /**
   * Gera token mock baseado no usuário (substituir por JWT futuramente)
   * @param {Object} user - Dados do usuário
   * @returns {string} Token mock
   */
  generateMockToken(user) {
    // Em produção: jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' })
    return `fake-token-${user.role}-${user.id}`;
  }
}

export default new AuthService();
