import { configureRoutes } from "./core/configureRoutes";
import { route } from "./core/route";

export const AppRoutes = configureRoutes({
  login: route("/login"),
  dashboard: route("/"),
  opportunities: route("/opportunities"),
  timeTracker: route("/time-tracker"),
});
