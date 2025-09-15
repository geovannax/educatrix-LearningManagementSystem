import { Router } from 'express';
const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login (mock)
 *     description: Valida email e senha estáticos apenas para destravar o fluxo inicial.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: "prof@educatrix.dev" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200: { description: Sucesso (mock) }
 *       400: { description: Campos ausentes }
 *       401: { description: Credenciais inválidas }
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email e password são obrigatórios' });
  if (email === 'prof@educatrix.dev' && password === '123456') {
    return res.status(200).json({ message: 'Login bem-sucedido', role: 'professor', token: 'fake-token-educatrix' });
  }
  return res.status(401).json({ message: 'Credenciais inválidas' });
});

export default router;
