import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { htmlFreelance } from "../htmlFreelance";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { error } from "../shared/utils/error";
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
      const htmlSearch: IHTMLSearch = new HTMLSearch(element.origin);

      const createdAt = this.getCreatedAt(htmlSearch);
      const location = this.getLocation(htmlSearch);
      const title = this.getTitle(htmlSearch);
      const url = this.getUrl(htmlSearch);

      const project: IProject = {
        company: "", // not available for freelance.de
        createdAt,
        id: hash.sha256().update(url).digest("hex"),
        location,
        title,
        url,
      };
      projects.push(project);
    });

    return projects;
  }

  private getUrl(htmlSearch: IHTMLSearch) {
    const url = htmlSearch
      .className("action-icons-overlap")
      .first()
      ?.tagName("a")
      .firstAttrValue("href");
    return url
      ? this.createUrl(url)
      : error("Error while getting Url. Url not found");
  }

  private getTitle(htmlSearch: IHTMLSearch) {
    const title =
      htmlSearch
        .className("action-icons-overlap")
        .first()
        ?.tagName("a")
        .firstValue() ?? "";
    return this.harmonizeTitle(title);
  }

  private getLocation(htmlSearch: IHTMLSearch) {
    const location =
      htmlSearch
        .className("icon-list")
        .first()
        ?.tagName("li")
        .indexFinding(1)
        .first()
        ?.lastValue() ?? "";
    return location;
  }

  private getCreatedAt(htmlSearch: IHTMLSearch) {
    const createDate =
      htmlSearch
        .className("icon-list")
        .first()
        ?.tagName("li")
        .last()
        ?.lastValue() ?? "";

    return this.parseDate(createDate);
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
