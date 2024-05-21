import { IProject } from "../../shared/model/IProject";
import { HTMLInfo } from "../HTMLInfo/HTMLInfo";
import { IHTMLInfo } from "../HTMLInfo/IHTMLInfo";
import { IProjectRequestor } from "../IProjectRequestor";

export class FreelancerMapProjectRequestor implements IProjectRequestor {
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
    const count = htmlInfo.getNumberElementsByClassName("company");
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
