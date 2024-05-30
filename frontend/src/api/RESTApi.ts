export abstract class RESTApi {
  protected get<T>(url: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        reject(`Error while fetching data from '${url}'`);
      }
    });
  }

  protected post<T>(url: string, data: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
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
        setTimeout(() => {
          resolve(data);
        }, 2000);
      } else {
        reject(`Error while fetching data from '${url}'`);
      }
    });
  }
}
