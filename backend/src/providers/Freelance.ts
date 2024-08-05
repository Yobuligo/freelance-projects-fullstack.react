import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { Log } from "../services/logging/Log";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { error } from "../shared/utils/error";
import { toDate } from "../utils/toDate";
import { uuid } from "../utils/uuid";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.Freelance, "freelance.de")
export class Freelance implements IProvider {
  request(url: string): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        reject(error);
      }
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
  ): Promise<IOpportunity[]> {
    if (countPages < 2) {
      return [];
    }

    return new Promise(async (resolve, reject) => {
      const projects: IOpportunity[] = [];
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

  private extractProjects(rootElement: Element): IOpportunity[] {
    const projects: IOpportunity[] = [];
    const htmlSearch = new HTMLSearch(rootElement);
    const elements = htmlSearch.className("list-item-content").find();

    elements.forEach((element) => {
      const htmlSearch: IHTMLSearch = new HTMLSearch(element.origin);

      const publishedAt = this.getPublishedAt(htmlSearch);
      const location = this.getLocation(htmlSearch);
      const title = this.getTitle(htmlSearch);
      const url = this.getUrl(htmlSearch);

      const project: IOpportunity = {
        id: uuid(),
        company: "", // not available for freelance.de
        location,
        provider: ProviderType.Freelance,
        publishedAt,
        title,
        url,
        createdAt: publishedAt,
        updatedAt: publishedAt,
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

  private getPublishedAt(htmlSearch: IHTMLSearch) {
    const createDate =
      htmlSearch
        .className("icon-list")
        .first()
        ?.tagName("li")
        .last()
        ?.lastValue() ?? "";

    return this.parseDate(createDate);
  }

  private removeHighlightArgument(url: string): string {
    const index = url.indexOf("/highlight=");
    if (index === -1) {
      return url;
    }

    const substring = url.substring(0, index);
    return substring;
  }

  private createUrl(url: string): string {
    url = this.removeHighlightArgument(url);
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
