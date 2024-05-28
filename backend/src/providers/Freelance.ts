import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { htmlFreelance } from "../htmlFreelance";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { toDate } from "../utils/toDate";
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
    const elements = htmlSearch.className("list-item-content").find();

    elements.forEach((element) => {
      const htmlSearch = new HTMLSearch(element.origin);

      const createDate =
        htmlSearch
          .className("icon-list")
          .first()
          ?.tagName("li")
          .last()
          ?.lastValue() ?? "";
      const location = htmlSearch
        .className("icon-list")
        .first()
        ?.tagName("li")
        .indexFinding(1)
        .first()
        ?.lastValue();
      const title =
        htmlSearch
          .className("action-icons-overlap")
          .first()
          ?.tagName("a")
          .firstValue() ?? "";

      const url = htmlSearch
        .className("action-icons-overlap")
        .first()
        ?.tagName("a")
        .firstAttrValue("href");

      const project: IProject = {
        company: "", // not available for freelance.de
        createdAt: this.parseDate(createDate),
        id: hash.sha256().update(url).digest("hex"),
        location: location ?? "",
        title: this.harmonizeTitle(title),
        url: url ? this.createUrl(url) : "",
      };
      projects.push(project);
    });

    return projects;
  }

  private createUrl(url: string): string {
    const host = "https://www.freelance.de";
    return `${host}${url}`;
  }

  private harmonizeTitle(title: string): string {
    title = title.replaceAll("\n", "");
    title = title.replaceAll("\t", "");
    title = title.trim();
    return title;
  }

  private parseDate(createDate: string): Date {
    if (createDate.length === 0) {
      return new Date();
    }
    let [date, time] = createDate.split(" ");
    return toDate(date, time);
  }
}
