import { Router } from "express";
import { ProviderRegistryInfo } from "../providers/core/ProviderRegistryInfo";
import { ProviderMetaMeta } from "../shared/model/IProviderMeta";

export class ProviderMetaController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.get(ProviderMetaMeta.path, (req, res) => {
      const providerMeta = ProviderRegistryInfo.findAll();
      res.status(200).send(providerMeta);
    });
  }
}
