import { Duration } from "../../core/date/Duration";
import { IRouteMeta } from "../types/IRouteMeta";
import { IProject } from "./IProject";

export interface ITimeSheet {
  duration: Duration;
  from: Date;
  project: IProject;
  to: Date;
}

export const TimeSheetRouteMeta: IRouteMeta = { path: "/time-sheets" };
