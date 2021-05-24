import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { CarPartModel, ICarPart } from "../../../db/entities/car-part";

export class CarPartContextHelper extends AbstractRequestContextHelper {
    public async allCarParts() {
        return await this.context.helpers.database.getAll<ICarPart>(
            CarPartModel,
        );
    }

    public async addCarPart(title: string, price: number) {
        return await this.context.helpers.database.add<ICarPart>(CarPartModel, {
            title,
            price,
        });
    }

    public async deleteCarPart(id: string) {
        return await this.context.helpers.database.delete<ICarPart>(
            CarPartModel,
            id,
        );
    }

    public async updateCarPart(id: string, title: string, price: number) {
        return await this.context.helpers.database.update<ICarPart>(
            CarPartModel,
            id,
            {
                id,
                title,
                price,
            },
        );
    }
}
