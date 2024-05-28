import { Provider } from "../decorators/Provider";
import { htmlFreelance } from "../htmlFreelance";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.Freelance)
export class Freelance implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      // const response = await fetch(url);
      // const html = await response.text();

      const parser = new DOMParser();
      const document = parser.parseFromString(htmlFreelance, "text/html");
      const rootElement = document.getElementsByClassName("project-list")[0];
      const projects = this.extractProjects(rootElement);
      resolve(projects);
    });
  }

  private extractProjects(rootElement: Element): IProject[] {
    const projects: IProject[] = [];

    const htmlSearch = new HTMLSearch(rootElement);

    return [];
  }
}
