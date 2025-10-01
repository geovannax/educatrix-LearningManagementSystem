import ActivityService from "../services/ActivityService.js";
import BaseController from "./BaseController.js";

const activityService = ActivityService;

class ActivityController {
  static async createActivity(req, res) {
    try {
      const newActivity = await activityService.createActivity(req.body);
      return BaseController.send201(
        res,
        newActivity,
        "Atividade criada com sucesso"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }

  static async getAllActivities(req, res) {
    try {
      const activities = await activityService.getAllActivities();
      const total = activities.length;

      let detail;
      if (activities.length === 0) {
        detail = "Nenhuma atividade cadastrada ainda";
      } else {
        detail = `${activities.length} atividade(s) encontrada(s)`;
      }

      return BaseController.send200(res, activities, detail, { total });
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }

  static async getActivityById(req, res) {
    try {
      const activity = await activityService.getActivityById(req.params.id);
      if (!activity) {
        return BaseController.send404(res);
      }
      return BaseController.send200(
        res,
        activity,
        "Atividade recuperada com sucesso"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }

  static async updateActivityById(req, res) {
    try {
      const activity = await activityService.updateActivityById(
        req.params.id,
        req.body
      );

      if (!activity) {
        return BaseController.send404(res);
      }

      return BaseController.send200(
        res,
        activity,
        "Atividade atualizada com sucesso"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }

  static async deleteActivityById(req, res) {
    try {
      const activity = await activityService.deleteActivityById(req.params.id);
      if (!activity) {
        return BaseController.send404(res);
      }
      return BaseController.send204(res);
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  }
}

export default ActivityController;
