import { Provider } from "../decorators/Provider";
import { HTMLInfo } from "../services/HTMLInfo/HTMLInfo";
import { IHTMLInfo } from "../services/HTMLInfo/IHTMLInfo";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.FreelancerMap)
export class FreelancerMap implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url);
      const html = await response.text();
      const htmlInfo = new HTMLInfo(html);
      const projects = this.extractProjects(htmlInfo);
      resolve(projects);
    });
  }

  private extractProjects(htmlInfo: IHTMLInfo): IProject[] {
    const projects: IProject[] = [];
    const count = htmlInfo.getNumberElementsByClassName("project-title");
    const host = "www.freelancermap.de";
    for (let i = 0; i < count; i++) {
      const company = htmlInfo.findValueByClassName("company", i);
      const createdAt = htmlInfo.findValueByClassName("created-date", i);
      const title = htmlInfo.findValueByClassName("project-title", i);
      const url = `${host}${htmlInfo.findValueByClassNameAndProp(
        "project-title",
        "href",
        i
      )}`;

      const project: IProject = {
        company,
        createdAt,
        location: "",
        title,
        url,
      };
      projects.push(project);
    }
    return projects;
  }
}
