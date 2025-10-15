import AuthService from "../services/AuthService.js";
import BaseController from "./BaseController.js";

const authService = AuthService;

class AuthController {
  static async authenticate(req, res) {
    try {
      // Service retorna o usuário ou erros
      const user = await authService.authenticate(req);

      if (user.status === 400) {
        return BaseController.send400(res, user.message);
      } else if (user.status === 401) {
        return BaseController.send401(res, user.message);
      }

      // Cookie HttpOnly - JavaScript NÃO pode acessar
      res.cookie("authToken", user.token, {
        httpOnly: true,
        secure: true, // Apenas HTTPS
        sameSite: "strict", // Proteção CSRF
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      });

      return BaseController.send200(
        res,
        { role: user.role, name: user.name },
        "Login bem-sucedido"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }
}

export default AuthController;
