import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import healthRouter from './routes/health.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/health', healthRouter);

// >>> servir o frontend estático na raiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.resolve(__dirname, '../../frontend')));
// <<<

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Educatrix API rodando em http://localhost:${PORT}`);
});
