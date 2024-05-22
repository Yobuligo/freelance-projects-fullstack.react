import hash from "hash.js";
import { Provider } from "../decorators/Provider";
import { html } from "../html";
import { HTMLInfo } from "../services/HTMLInfo/HTMLInfo";
import { IHTMLInfo } from "../services/HTMLInfo/IHTMLInfo";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.FreelancerMap)
export class FreelancerMap implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      // const response = await fetch(url);
      // const html = await response.text();
      const htmlInfo = new HTMLInfo(html);
      const projects = this.extractProjects(htmlInfo);
      resolve(projects);
    });
  }

  private extractProjects(htmlInfo: IHTMLInfo): IProject[] {
    const PROJECT_CARD_NAME = "project-container project card box";
    const projects: IProject[] = [];
    const count = htmlInfo.getNumberElementsByClassName(PROJECT_CARD_NAME);
    const host = "https://www.freelancermap.de";
    for (let i = 0; i < count; i++) {
      const element = htmlInfo.findElementByClassName(PROJECT_CARD_NAME, i);
      const company = htmlInfo.findValueByClassName(element, "company", i);
      const createdAt = this.findCreatedAt(htmlInfo, element, i);

      const location = htmlInfo.findValueByClassName(element, "city", i);
      const title = htmlInfo.findValueByClassName(element, "project-title", i);
      const url = `${host}${htmlInfo.findValueByClassNameAndProp(
        "project-title",
        "href",
        i
      )}`;

      const project: IProject = {
        company,
        createdAt,
        id: hash.sha256().update(url).digest("hex"),
        location,
        title,
        url,
      };
      projects.push(project);
    }
    return projects;
  }

  private findCreatedAt(
    htmlInfo: IHTMLInfo,
    element: Element,
    index: number
  ): Date {
    let createdAt = htmlInfo.findValueByClassName(
      element,
      "created-date",
      index
    );

    createdAt = createdAt.replaceAll(" ", "");
    createdAt = createdAt.replace("eingetragenam:", "");
    let [date, time] = createdAt.split("/");
    const [day, month, year] = date.split(".");
    time = time += ":00";

    return new Date(`${year}-${month}-${day}T${time}`);
  }
}
