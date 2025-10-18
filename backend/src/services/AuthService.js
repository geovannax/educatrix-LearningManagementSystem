import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@educatrix/shared/schemas/loginSchema.js";
import prisma from "../prisma.js";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_SECRET = process.env.JWT_SECRET;

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

    // Buscar usuário incluindo o role relacionado
    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
      include: { role: true },
    });

    // Comparar senha plain com hash armazenado
    const match = await bcrypt.compare(result.data.password, user.password);

    if (!user || !match) {
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
      expiresIn: `${JWT_EXPIRES_IN}h`,
    });
  }
}

export default new AuthService();
