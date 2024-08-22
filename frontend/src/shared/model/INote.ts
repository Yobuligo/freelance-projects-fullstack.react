import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";

export interface INote extends IEntity {
  text: string;
}

export const NoteRouteMeta: IRouteMeta = { path: "/notes" };
