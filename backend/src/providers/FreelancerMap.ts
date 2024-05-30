import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { Log } from "../services/logging/Log";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { toDate } from "../utils/toDate";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.FreelancerMap)
export class FreelancerMap implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url);
      const html = await response.text();

      Log.info(`Request freelancerMap projects from freelancerMap server.`);

      const parser = new DOMParser();
      const document = parser.parseFromString(html, "text/html");
      const rootElement = document.getElementsByClassName("project-list")[0];

      const projects = this.extractProjects(rootElement);
      resolve(projects);
    });
  }

  private extractProjects(rootElement: Element): IProject[] {
    const projects: IProject[] = [];
    const htmlSearch = new HTMLSearch(rootElement);
    const elements = htmlSearch
      .className("project-container project card box")
      .find();

    elements.forEach((htmlElement) => {
      const htmlSearch = new HTMLSearch(htmlElement.origin);
      const company = htmlSearch.className("company").firstValue();
      const createdDate = htmlSearch.className("created-date").firstValue();
      const location = htmlSearch.className("city").firstValue();
      const title = htmlSearch.className("project-title").firstValue();
      const url = htmlSearch.className("project-title").firstAttrValue("href");

      const project: IProject = {
        company,
        completed: false,
        createdAt: this.parseDate(createdDate),
        id: hash.sha256().update(url).digest("hex"),
        location,
        provider: ProviderType.FreelancerMap,
        title,
        url: this.createUrl(url),
      };
      projects.push(project);
    });

    return projects;
  }

  private createUrl(url: string): string {
    const host = "https://www.freelancermap.de";
    return `${host}${url}`;
  }

  private parseDate(createDate: string): Date {
    createDate = createDate.replaceAll(" ", "");
    createDate = createDate.replace("eingetragenam:", "");
    let [date, time] = createDate.split("/");
    return toDate(date, time);
  }
}
