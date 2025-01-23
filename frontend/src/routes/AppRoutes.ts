import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  applyMessageGenerator: route("/apply-message-generator"),
  login: route("/login"),
  dashboard: route("/"),
  opportunities: route("/opportunities"),
  timeTracker: route("/time-tracker"),
});
