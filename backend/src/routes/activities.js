import { Router } from "express";
import ActivityController from "../controllers/ActivityController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = Router();

// Aplica o middleware para todas as rotas deste router
router.use(authenticateJWT);

// Apenas admin e professor podem acessar estas rotas
router.use(authorizeRole("admin", "professor"));

/**
 * @openapi
 * /api/v1/activities:
 *   post:
 *     summary: Criar Atividade
 *     description: Cria uma nova atividade no sistema
 *     tags:
 *       - Atividades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Introdução ao JavaScript"
 *                 description: "Título da atividade"
 *               type:
 *                 type: string
 *                 enum: [codigo, discursiva, objetiva]
 *                 example: "codigo"
 *                 description: "Tipo da atividade"
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: "Atividade básica sobre conceitos fundamentais de JavaScript"
 *                 description: "Descrição detalhada da atividade"
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Introdução ao JavaScript"
 *                     type:
 *                       type: string
 *                       example: "codigo"
 *                     description:
 *                       type: string
 *                       example: "Atividade básica sobre conceitos fundamentais de JavaScript"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-30T00:37:00.687Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-30T00:37:00.687Z"
 *                 details:
 *                   type: string
 *                   example: "Atividade criada com sucesso"
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Título deve ter pelo menos 3 caracteres"
 *                     - "Descrição deve ter pelo menos 10 caracteres"
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
router.post("/", ActivityController.createActivity);

/**
 * @openapi
 * /api/v1/activities:
 *   get:
 *     summary: Listar Atividades
 *     description: Retorna uma lista de todas as atividades
 *     tags:
 *       - Atividades
 *     responses:
 *       200:
 *         description: Lista de atividades recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Introdução ao JavaScript"
 *                       type:
 *                         type: string
 *                         enum: [codigo, discursiva, objetiva]
 *                         example: "codigo"
 *                       description:
 *                         type: string
 *                         example: "Atividade básica sobre conceitos fundamentais"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-30T00:37:00.687Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-30T00:37:00.687Z"
 *                 details:
 *                   type: string
 *                   example: "1 atividade(s) encontrada(s)"
 *                 total:
 *                   type: integer
 *                   example: 1
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
router.get("/", ActivityController.getAllActivities);

/**
 * @openapi
 * /api/v1/activities/{id}:
 *   get:
 *     summary: Retornar Atividade por ID
 *     description: Retorna uma atividade pelo ID
 *     tags:
 *       - Atividades
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID numérico da atividade
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Atividade recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Introdução ao JavaScript"
 *                     type:
 *                       type: string
 *                       enum: [codigo, discursiva, objetiva]
 *                       example: "codigo"
 *                     description:
 *                       type: string
 *                       example: "Atividade básica sobre conceitos fundamentais"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-30T00:37:00.687Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-30T00:37:00.687Z"
 *                 details:
 *                   type: string
 *                   example: "Atividade recuperada com sucesso"
 *       404:
 *         description: Atividade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Recurso não encontrado"
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
router.get("/:id", ActivityController.getActivityById);

/**
 * @openapi
 * /api/v1/activities/{id}:
 *   put:
 *     summary: Atualizar Atividade
 *     description: Atualiza uma atividade existente pelo ID
 *     tags:
 *       - Atividades
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID numérico da atividade a ser atualizada
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "JavaScript Avançado"
 *                 description: "Novo título da atividade"
 *               type:
 *                 type: string
 *                 enum: [codigo, discursiva, objetiva]
 *                 example: "codigo"
 *                 description: "Novo tipo da atividade"
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: "Atividade atualizada sobre conceitos avançados de JavaScript"
 *                 description: "Nova descrição da atividade"
 *     responses:
 *       200:
 *         description: Atividade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "JavaScript Avançado"
 *                     type:
 *                       type: string
 *                       enum: [codigo, discursiva, objetiva]
 *                       example: "codigo"
 *                     description:
 *                       type: string
 *                       example: "Atividade atualizada sobre conceitos avançados de JavaScript"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-30T00:37:00.687Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-01T10:15:30.123Z"
 *                 details:
 *                   type: string
 *                   example: "Atividade atualizada com sucesso"
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Título deve ter pelo menos 3 caracteres"
 *                     - "Tipo deve ser: codigo, discursiva ou objetiva"
 *       404:
 *         description: Atividade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Recurso não encontrado"
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
router.put("/:id", ActivityController.updateActivityById);

/**
 * @openapi
 * /api/v1/activities/{id}:
 *   delete:
 *     summary: Deletar Atividade
 *     description: Remove uma atividade existente do sistema pelo ID
 *     tags:
 *       - Atividades
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID numérico da atividade a ser deletada
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       204:
 *         description: Atividade excluída com sucesso (sem corpo na resposta)
 *       404:
 *         description: Atividade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   example: "Recurso não encontrado"
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
router.delete("/:id", ActivityController.deleteActivityById);

export default router;
