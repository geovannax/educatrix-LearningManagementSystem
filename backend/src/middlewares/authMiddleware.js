import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "EM PRODUCAO, USAR VARIAVEL DE AMBIENTE";

export function authenticateJWT(req, res, next) {
  // Tenta pegar o token do cookie
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário na req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
