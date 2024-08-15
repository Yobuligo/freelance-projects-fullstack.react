import { IRouteMeta } from "../types/IRouteMeta";
import { IProject } from "./IProject";

export interface ITimeSheet {
  durationInMilliseconds: number;
  from: Date;
  project: IProject;
  to: Date;
}

export const TimeSheetRouteMeta: IRouteMeta = { path: "/time-sheets" };
