import dns from "dns";

class NetworkInfoDefault {
  async isConnected(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await dns.lookup("www.google.com", async (error) => {
        if (error && error.code === "ENOTFOUND") {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export const NetworkInfo = new NetworkInfoDefault();
