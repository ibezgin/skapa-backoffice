import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandModel, IBrand } from "../../../db/entities/brand";

export class BrandContextHelper extends AbstractRequestContextHelper {
    public async allBrands() {
        return await this.context.helpers.database.getAll<IBrand>(BrandModel);
    }

    public async addBrand(title: string) {
        return await this.context.helpers.database.add<IBrand>(BrandModel, {
            title,
        });
    }

    public async deleteBrand(id: string) {
        return await this.context.helpers.database.delete<IBrand>(
            BrandModel,
            id,
        );
    }

    public async updateBrand(id: string, title: string) {
        return await this.context.helpers.database.update<IBrand>(
            BrandModel,
            id,
            { id, title },
        );
    }
}
