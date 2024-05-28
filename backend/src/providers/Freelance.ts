import { IProject } from "../shared/model/IProject";
import { IProvider } from "./core/IProvider";

export class Freelance implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url);
      const html = await response.text();

      const projects: IProject[] = [];
      resolve(projects);
    });
  }
}
