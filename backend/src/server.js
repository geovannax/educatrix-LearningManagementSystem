// backend/src/server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// Rotas da API
import activityRouter from "./routes/activities.js";
import authRouter from "./routes/auth.js";
import healthRouter from "./routes/health.js";

// Docs da API (Swagger UI + JSDoc)
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// --- Inicialização básica
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Swagger (documentação automática)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Educatrix API", version: "0.1.0" },
    servers: [{ url: "http://localhost:3000" }],
  },
  // Arquivos onde estão os comentários @openapi
  apis: [
    path.resolve(__dirname, "./server.js"),
    path.resolve(__dirname, "./routes/*.js"),
  ],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rotas da API
app.use("/health", healthRouter);
app.use("/api/v1/activities", activityRouter);
app.use("/api/v1/auth", authRouter);

// --- Subir servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Educatrix API rodando em http://localhost:${PORT}`);
});
