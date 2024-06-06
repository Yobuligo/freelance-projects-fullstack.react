import { AppConfig } from "../AppConfig";

export abstract class RESTApi {
  protected get<T>(url: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          reject(`Error while fetching data from '${url}'`);
        }
      } catch (error) {
        reject(`Error while fetching data from '${url}'`);
      }
    });
  }

  protected post<T>(url: string, data: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const body = JSON.stringify(data);
        const response = await fetch(url, {
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          mode: "cors",
        });
        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          reject(`Error while fetching data from '${url}'`);
        }
      } catch (error) {
        reject(`Error while fetching data from '${url}'`);
      }
    });
  }

  protected get host(): string {
    return AppConfig.HOST;
  }
}
