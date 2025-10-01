import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     description: Autentica usuário com email e senha usando dados seed
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "prof@educatrix.dev"
 *                 description: "Email do usuário"
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: "Senha do usuário"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       example: "professor"
 *                     token:
 *                       type: string
 *                       example: "fake-token-professor-1"
 *                 details:
 *                   type: string
 *                   example: "Login bem-sucedido"
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Email e password são obrigatórios"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Credenciais inválidas"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Erro interno do servidor"
 */
router.post("/login", AuthController.authenticate);

export default router;
