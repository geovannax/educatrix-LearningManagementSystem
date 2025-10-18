// backend/src/server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

// Rotas da API
import activityRouter from "./routes/activities.js";
import authRouter from "./routes/auth.js";
import healthRouter from "./routes/health.js";

// Docs da API (Swagger UI + JSDoc)
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Prisma Client (ORM)
import prisma from "./prisma.js";

// Variáveis de ambiente
const APP_CORS_ORIGIN = process.env.APP_CORS_ORIGIN;
const APP_LISTEN_PORT = parseInt(process.env.APP_LISTEN_PORT);
const APP_LISTEN_URL = process.env.APP_LISTEN_URL;
const SWAGGER_SPEC_DEFINITION_INFO_TITLE =
  process.env.SWAGGER_SPEC_DEFINITION_INFO_TITLE;
const SWAGGER_SPEC_DEFINITION_INFO_VERSION =
  process.env.SWAGGER_SPEC_DEFINITION_INFO_VERSION;

// --- Inicialização básica
const app = express();
app.use(cors({ origin: APP_CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Swagger (documentação automática)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: SWAGGER_SPEC_DEFINITION_INFO_TITLE,
      version: SWAGGER_SPEC_DEFINITION_INFO_VERSION,
    },
    servers: [{ url: `${APP_LISTEN_URL}:${APP_LISTEN_PORT}` }],
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
const server = app.listen(APP_LISTEN_PORT, () => {
  console.log(`Educatrix API rodando em ${APP_LISTEN_URL}:${APP_LISTEN_PORT}`);
});

// Fechar conexão Prisma ao encerrar o servidor
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Servidor encerrado e conexão Prisma fechada.");
    process.exit(0);
  });
});
