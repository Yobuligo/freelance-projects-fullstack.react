import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { htmlFreelancerMap } from "../htmlFreelancerMap";
import { HTMLInfo } from "../services/HTML/HTMLInfo";
import { IHTMLInfo } from "../services/HTML/IHTMLInfo";
import { htmlSearch } from "../services/HTML/utils/htmlSearch";
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
      const htmlInfo = new HTMLInfo(htmlFreelancerMap);
      const projects = this.extractProjects(htmlInfo);
      this.extractSecond();
      resolve(projects);
    });
  }

  private extractSecond(): IProject[] {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlFreelancerMap, "text/html");
    const rootElement = document.getElementsByClassName("project-list")[0];
    const projects: IProject[] = [];
    const host = "https://www.freelancermap.de";

    const elements = htmlSearch(rootElement)
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
    });

    return [];
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
