import { Provider } from "../decorators/Provider";
import { DOMParser } from "xmldom";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { Log } from "../services/logging/Log";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { isNull } from "../shared/utils/isNull";
import { IProvider } from "./core/IProvider";
import fs from "node:fs";
import { uuid } from "../utils/uuid";
import { DateTime } from "../core/date/DateTime";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { isInitial } from "../core/utils/isInitial";

@Provider(ProviderType.DasAuge, "dasAuge.de")
export class DasAuge implements IProvider {
  request(url: string): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // const response = await fetch(url)
        // const html = await response.text()
        const html = fs.readFileSync("./dist/dasAuge.html", "utf-8");

        Log.info(`Request dasAuge opportunities from dasAuge server.`);

        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const rootElement = document.getElementById("eliste");

        const opportunities = this.extractOpportunities(rootElement);
        resolve(opportunities);
      } catch (error) {
        reject(error);
      }
    });
  }
  private extractOpportunities(
    rootElement: HTMLElement | null
  ): IOpportunity[] {
    const opportunities: IOpportunity[] = [];
    if (isNull(rootElement)) return [];
    const htmlSearch = new HTMLSearch(rootElement!);

    const elements = htmlSearch.className("neutral klickbatzen").find();
    console.log(elements.length);
    elements.forEach((htmlElement) => {
      const projectHTMLSearch = new HTMLSearch(htmlElement.origin);
      const title = projectHTMLSearch.className("hassub").firstValue();
      const publishedAt = this.parseDate(
        projectHTMLSearch.className("date").firstValue()
      );
      const companyInfoHtmlSearch = projectHTMLSearch.className(
        "boxsubline toplinie"
      );
      const company = companyInfoHtmlSearch.tagName("em").firstValue();
      const location = this.extractLocation(
        projectHTMLSearch,
        companyInfoHtmlSearch
      );

      const opportunity: IOpportunity = {
        id: uuid(),
        company,
        location,
        provider: ProviderType.DasAuge,
        publishedAt,
        title,
        url: "",
        createdAt: publishedAt,
        updatedAt: publishedAt,
      };
      opportunities.push(opportunity);
    });

    return opportunities;
  }

  private parseDate(date: string): Date {
    // DateTime.create(date)
    return new Date();
  }

  private extractLocation(
    projectHTMLSearch: IHTMLSearch,
    companyInfoHTMLSearch: IHTMLSearch
  ): string {
    let location = projectHTMLSearch.className("fernarbeit").firstValue();
    if (isInitial(location)) {
      location = companyInfoHTMLSearch.findAt(2)?.firstValue() ?? "";
    }
    return location;
  }
}
