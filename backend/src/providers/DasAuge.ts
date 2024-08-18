import fs from "node:fs";
import { DOMParser } from "xmldom";
import { isInitial } from "../core/utils/isInitial";
import { Provider } from "../decorators/Provider";
import { HTMLSearch } from "../services/htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../services/htmlSearch/IHTMLSearch";
import { Log } from "../services/logging/Log";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { error } from "../shared/utils/error";
import { isNull } from "../shared/utils/isNull";
import { uuid } from "../utils/uuid";
import { IProvider } from "./core/IProvider";

// https://dasauge.de/jobs/stellenangebote/freelancer/s2?begriff=web+entwicklung
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
    elements.forEach((htmlElement) => {
      const projectHTMLSearch = new HTMLSearch(htmlElement.origin);
      const title = this.extractTitle(projectHTMLSearch);
      const publishedAt = this.extractDate(projectHTMLSearch);
      const companyInfoHtmlSearch = projectHTMLSearch.className(
        "boxsubline toplinie"
      );
      const company = this.extractCompany(companyInfoHtmlSearch) ?? "";
      const location = this.extractLocation(
        projectHTMLSearch,
        companyInfoHtmlSearch
      );
      const url = this.createUrl(
        projectHTMLSearch.tagName("a").firstAttrValue("href")
      );

      const opportunity: IOpportunity = {
        id: uuid(),
        company,
        location,
        provider: ProviderType.DasAuge,
        publishedAt,
        title,
        url,
        createdAt: publishedAt,
        updatedAt: publishedAt,
      };
      opportunities.push(opportunity);
    });

    return opportunities;
  }

  private createUrl(url: string): string {
    const host = "https://dasauge.de";
    return `${host}${url}`;
  }

  private extractCompany(companyInfoHTMLSearch: IHTMLSearch) {
    const companyNode = companyInfoHTMLSearch.first();
    if (isInitial(companyNode)) this.throwParsingError();
    const companySearch = new HTMLSearch(companyNode!.origin)
    return companySearch.findAt(2)?.value;
    // const company = companyInfoHtmlSearch.tagName("em").firstValue();
  }

  private extractDate(projectHTMLSearch: IHTMLSearch): Date {
    const date = projectHTMLSearch.className("date").firstAttrValue("datetime");
    return new Date(date);
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

  private extractTitle(projectHTMLSearch: IHTMLSearch): string {
    const h2 = projectHTMLSearch.className("hassub").first();
    if (isInitial(h2)) this.throwParsingError();
    return new HTMLSearch(h2!.origin).tagName("a").firstValue();
  }

  private throwParsingError() {
    error(
      "Error in provider 'dasAuge.de' during parsing. The site structure might have changed."
    );
  }
}
