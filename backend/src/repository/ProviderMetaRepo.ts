import { IProviderMeta } from "../providers/core/IProviderMeta";

class ProviderMetaRepoDefault{
    findAll(): IProviderMeta[]{
        return []
    }
}

export const ProviderMetaRepo = new ProviderMetaRepoDefault()