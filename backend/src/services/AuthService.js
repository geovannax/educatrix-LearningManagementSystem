import prisma from "../prisma.js";
import { loginSchema } from "@educatrix/shared/schemas/loginSchema.js";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "EM PRODUCAO, USAR VARIAVEL DE AMBIENTE";

class AuthService {
  /**
   * Autentica usuário com email e senha
   * @param {string} req - Request do Express
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Resultado da autenticação
   */
  async authenticate(req) {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return { status: 401, message: "Credenciais inválidas" };
    }

    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
      include: { role: true },
    });

    if (!user || user.password !== result.data.password) {
      return { status: 401, message: "Credenciais inválidas" };
    }

    // Gerar token no service
    const token = this.generateJWTToken(user);

    return { ...user, token };
  }

  /**
   * Gera token JWT baseado no usuário
   * @param {Object} user - Dados do usuário
   * @returns {string} Token JWT
   */
  generateJWTToken(user) {
    return jwt.sign({ id: user.id, role: user.role.name }, JWT_SECRET, {
      expiresIn: "24h",
    });
  }
}

export default new AuthService();
