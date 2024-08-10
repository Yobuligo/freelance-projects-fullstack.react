import { Router } from "express";
import { ProviderRegistryInfo } from "../providers/core/ProviderRegistryInfo";
import {
  IProviderDetails,
  ProviderDetailsRouteMeta,
} from "../shared/model/IProviderDetails";

export class ProviderDetailsController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.get(ProviderDetailsRouteMeta.path, (_, res) => {
      const providerDetails: IProviderDetails[] = [];
      const providerMetas = ProviderRegistryInfo.findAll();
      providerMetas.forEach((providerMeta) => {
        providerDetails.push({
          title: providerMeta.title,
          type: providerMeta.type,
        });
      });
            
      res.status(200).send(providerDetails);
    });
  }
}
