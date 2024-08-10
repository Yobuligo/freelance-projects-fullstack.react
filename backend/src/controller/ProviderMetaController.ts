import { Router } from "express";
import { ProviderMetaMeta } from "../providers/core/IProviderMeta";
import { ProviderRegistryInfo } from "../providers/core/ProviderRegistryInfo";

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
