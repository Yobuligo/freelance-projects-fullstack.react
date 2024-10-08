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
// https://dasauge.de/jobs/stellenangebote/freelancer/?begriff=typescript+react+javascript+express+ABAP
@Provider(ProviderType.DasAuge, "dasAuge.de")
export class DasAuge implements IProvider {
  private host = "https://dasauge.de/jobs/stellenangebote/freelancer/";

  request(url: string): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // const response = await fetch(url)
        // const html = await response.text()
        const html = fs.readFileSync("./dist/dasAuge.html", "utf-8");

        Log.info(`Request dasAuge opportunities from dasAuge server.`);

        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const rootElement = this.getRootElement(document);
        const countPages = this.getCountPages(document);

        const opportunities = this.extractOpportunities(rootElement);
        // const opportunitiesOffsetPage = await this.fetchOffsetPages(
        //   url,
        //   countPages
        // );
        // opportunities.push(...opportunitiesOffsetPage);
        resolve(opportunities);
      } catch (error) {
        reject(error);
      }
    });
  }
  private getCountPages(document: Document) {
    return document.getElementsByClassName("zlinks").length;
  }

  private getRootElement(document: Document): Element {
    return document.getElementById("eliste") ?? this.throwParsingError();
  }

  private createDocument(html: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  private async fetchOffsetPages(
    url: string,
    countPages: number
  ): Promise<IOpportunity[]> {
    if (countPages < 2) {
      return [];
    }


    return new Promise(async (resolve, reject) => {
      const opportunities: IOpportunity[] = [];
      for (let i = 2; i <= countPages; i++) {
        const offset = i;
        const splitUrl = url.split(this.host);
        const offsetUrl = `${this.host}s${offset}?${splitUrl[1]}`;
        const response = await fetch(offsetUrl);
        const html = await response.text();

        const document = this.createDocument(html);
        const rootElement = document.getElementById("eliste");
        const extractedOpportunities = this.extractOpportunities(rootElement);
        opportunities.push(...extractedOpportunities);
      }
      resolve(opportunities);
    });
  }

  private extractOpportunities(rootElement: Element | null): IOpportunity[] {
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
      const companyInfoNode = companyInfoHtmlSearch.first();
      if (isInitial(companyInfoNode)) this.throwParsingError();
      const company = this.extractCompany(
        new HTMLSearch(companyInfoNode!.origin)
      );
      const location = this.extractLocation(
        projectHTMLSearch,
        new HTMLSearch(companyInfoNode!.origin)
      );
      const url = this.createUrl(
        projectHTMLSearch.applyTagName("a").firstAttrValue("href")
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

  private extractCompany(companySearch: IHTMLSearch) {
    return companySearch.findAt(5)?.value ?? "";
  }

  private extractDate(projectHTMLSearch: IHTMLSearch): Date {
    const date = projectHTMLSearch.className("date").firstAttrValue("datetime");
    return new Date(date);
  }

  private extractLocation(
    projectHTMLSearch: IHTMLSearch,
    companySearch: IHTMLSearch
  ): string {
    let location = projectHTMLSearch.className("fernarbeit").firstValue();
    if (isInitial(location)) {
      const brNode = companySearch.findAt(7);
      if (isInitial(brNode)) return "";
      location = brNode!.origin!.nextSibling!.nodeValue ?? "";
    }
    return location;
  }

  private extractTitle(projectHTMLSearch: IHTMLSearch): string {
    const h2Element = projectHTMLSearch.className("hassub").first();
    if (isInitial(h2Element)) this.throwParsingError();
    const h2HTMLSearch = new HTMLSearch(h2Element!.origin);
    const title = h2HTMLSearch.applyTagName("a").firstValue();

    if (isInitial(title)) {
      //title is wrapped into b-element
      const aElement = h2HTMLSearch.first();
      if (isInitial(aElement)) this.throwParsingError();
      const aHTMLSearch = new HTMLSearch(aElement!.origin);
      const titleElements = aHTMLSearch.find();
      const filtered = titleElements
        .filter((element) => {
          return !isInitial(element.value) && !(element.tagName === "b");
        })
        .map((element) => element.value);
      return filtered.join("");
    }
    return title.replace("\r\n\t\t\t\t\t\t\t\t\t", " ");
  }

  private throwParsingError(): never {
    return error(
      "Error in provider 'dasAuge.de' during parsing. The site structure might have changed."
    );
  }
}
