import AuthService from "../services/AuthService.js";
import BaseController from "./BaseController.js";

const authService = AuthService;

class AuthController {
  static async authenticate(req, res) {
    try {
      // Validar entrada básica email e password.
      // quando tiver o frontend, fazer validação mais robusta lá
      const { email, password } = req.body || {};

      if (!email || !password) {
        return BaseController.send400(res, "Email e password são obrigatórios");
      }

      // Service retorna user ou false
      const user = await authService.authenticate(email, password);

      if (!user) {
        return BaseController.send401(res, "Credenciais inválidas");
      }

      // Gerar token no  service
      const token = authService.generateMockToken(user);

      return BaseController.send200(
        res,
        { role: user.role, token: token },
        "Login bem-sucedido"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }
}

export default AuthController;
