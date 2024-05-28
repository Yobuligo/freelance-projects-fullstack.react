import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { htmlFreelancerMap } from "../htmlFreelancerMap";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.FreelancerMap)
export class FreelancerMap implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      // const response = await fetch(url);
      // const html = await response.text();
      // const projects = this.extractProjects(htmlInfo);
      const projects = this.extractProjects();
      resolve(projects);
    });
  }

  private extractProjects(): IProject[] {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlFreelancerMap, "text/html");
    const rootElement = document.getElementsByClassName("project-list")[0];
    const projects: IProject[] = [];

    const elements = new HTMLSearch(rootElement)
      .className("project-container project card box")
      .find();

    elements.forEach((htmlElement) => {
      const htmlSearch = new HTMLSearch(htmlElement.origin);
      const company = htmlSearch.className("company").findFirstValue();
      const createdDate = htmlSearch.className("created-date").findFirstValue();
      const location = htmlSearch.className("city").findFirstValue();
      const title = htmlSearch.className("project-title").findFirstValue();
      const url = htmlSearch
        .className("project-title")
        .findFirstAttrValue("href");

      const project: IProject = {
        company,
        createdAt: this.parseDate(createdDate),
        id: hash.sha256().update(url).digest("hex"),
        location,
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
    const [day, month, year] = date.split(".");
    time = time += ":00";

    return new Date(`${year}-${month}-${day}T${time}`);
  }
}
