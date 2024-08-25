import { ProviderRegistryInfo } from "../providers/core/ProviderRegistryInfo";
import {
  IProviderDetails,
  ProviderDetailsRouteMeta,
} from "../shared/model/IProviderDetails";
import { Controller } from "./core/Controller";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class ProviderDetailsController extends Controller {
  constructor() {
    super();
    this.findAll();
  }

  private findAll() {
    this.router.get(
      ProviderDetailsRouteMeta.path,
      SessionInterceptor((_, res) => {
        const providerDetails: IProviderDetails[] = [];
        const providerMetas = ProviderRegistryInfo.findAll();
        providerMetas.forEach((providerMeta) => {
          providerDetails.push({
            title: providerMeta.title,
            type: providerMeta.type,
          });
        });

        res.status(200).send(providerDetails);
      })
    );
  }
}
