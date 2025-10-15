import BaseController from "../controllers/BaseController.js";

export function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return BaseController.send403(res);
    }
    next();
  };
}
