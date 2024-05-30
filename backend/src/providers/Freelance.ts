import hash from "hash.js";
import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { Log } from "../services/logging/Log";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { error } from "../shared/utils/error";
import { toDate } from "../utils/toDate";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.Freelance)
export class Freelance implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url);
      const html = await response.text();

      Log.info(`Request freelance.de projects from freelance.de server.`);

      const document = this.createDocument(html);
      const rootElement = this.getRootElement(document);
      const countPages = this.getCountPages(document);

      const projects = this.extractProjects(rootElement);
      const projectsOffsetPage = await this.fetchOffsetPages(url, countPages);
      projects.push(...projectsOffsetPage);

      resolve(projects);
    });
  }

  private createDocument(html: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  private getRootElement(document: Document): Element {
    return document.getElementsByClassName("project-list")[0];
  }

  private getCountPages(document: Document): number {
    return document.getElementsByClassName("nav-pagination-link").length - 1;
  }

  private async fetchOffsetPages(
    url: string,
    countPages: number
  ): Promise<IProject[]> {
    if (countPages < 2) {
      return [];
    }

    return new Promise(async (resolve, reject) => {
      const projects: IProject[] = [];
      for (let i = 1; i < countPages; i++) {
        const offset = i * 20;
        const offsetUrl = `${url}&_offset=${offset}`;
        const response = await fetch(offsetUrl);
        const html = await response.text();

        const document = this.createDocument(html);
        const rootElement = this.getRootElement(document);
        const extractedProjects = this.extractProjects(rootElement);
        projects.push(...extractedProjects);
      }
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
        completed: false,
        createdAt,
        id: hash.sha256().update(url).digest("hex"),
        location,
        provider: ProviderType.Freelance,
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
