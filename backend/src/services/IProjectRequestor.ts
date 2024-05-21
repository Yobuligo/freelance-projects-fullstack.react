import { IProject } from "../shared/model/IProject";

export interface IProjectRequestor {
  request(url: string): Promise<IProject[]>;
}
