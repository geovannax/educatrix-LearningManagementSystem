import { Router } from 'express';
const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check do serviço
 *     description: Retorna o status básico do backend (usado para monitoramento e testes).
 *     responses:
 *       200:
 *         description: Serviço operacional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "ok" }
 *                 service: { type: string, example: "educatrix" }
 *                 timestamp: { type: string, format: date-time }
 */
router.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'educatrix', timestamp: new Date().toISOString() });
});

export default router;
