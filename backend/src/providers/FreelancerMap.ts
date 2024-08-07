import { DOMParser } from "xmldom";
import { Provider } from "../decorators/Provider";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { Log } from "../services/logging/Log";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { toDate } from "../utils/toDate";
import { uuid } from "../utils/uuid";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.FreelancerMap, "freelancermap.de")
export class FreelancerMap implements IProvider {
  request(url: string): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        const html = await response.text();

        Log.info(
          `Request freelancerMap opportunities from freelancerMap server.`
        );

        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const rootElement = document.getElementsByClassName("project-list")[0];

        const opportunities = this.extractOpportunities(rootElement);
        resolve(opportunities);
      } catch (error) {
        reject(error);
      }
    });
  }

  private extractOpportunities(rootElement: Element): IOpportunity[] {
    const opportunities: IOpportunity[] = [];
    const htmlSearch = new HTMLSearch(rootElement);
    const elements = htmlSearch
      .className("project-container project card box")
      .find();

    elements.forEach((htmlElement) => {
      const htmlSearch = new HTMLSearch(htmlElement.origin);
      const company = htmlSearch.className("company").firstValue();
      const publishedAt = this.getPublishedAt(htmlSearch);
      const location = htmlSearch.className("city").firstValue();
      const title = htmlSearch.className("project-title").firstValue();
      const url = htmlSearch.className("project-title").firstAttrValue("href");

      const opportunity: IOpportunity = {
        id: uuid(),
        company,
        location,
        provider: ProviderType.FreelancerMap,
        publishedAt,
        title,
        url: this.createUrl(url),
        createdAt: publishedAt,
        updatedAt: publishedAt,
      };
      opportunities.push(opportunity);
    });

    return opportunities;
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

  private getPublishedAt(htmlSearch: IHTMLSearch): Date {
    const publishedAt = htmlSearch.className("created-date").firstValue();
    return this.parseDate(publishedAt);
  }
}
