class BaseController {
  static send2xx(res, status, data, message, extra = {}) {
    return res.status(status).json({
      data,
      details: message,
      ...extra,
    });
  }

  static send201(res, data, message, extra = {}) {
    return this.send2xx(res, 201, data, message, extra);
  }

  static send200(res, data, message, extra = {}) {
    return this.send2xx(res, 200, data, message, extra);
  }

  static send204(res) {
    return res.status(204).end();
  }

  static send400(res, message = "Requisição inválida") {
    return res.status(400).json({
      details: message,
    });
  }

  static send401(res, message = "Requisição não autorizada") {
    return res.status(401).json({
      details: message,
    });
  }

  static send403(res, message = "Acesso negado") {
    return res.status(403).json({
      details: message,
    });
  }

  static send404(res, message = "Recurso não encontrado") {
    return res.status(404).json({
      details: message,
    });
  }

  static sendError(res, error) {
    return res.status(error.code || 500).json({
      details: error.details || "Erro interno do servidor",
    });
  }
}

export default BaseController;
