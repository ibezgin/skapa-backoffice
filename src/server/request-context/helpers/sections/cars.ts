import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ICars, CarsModel } from "../../../db/entities/cars";

export class CarsContextHelper extends AbstractRequestContextHelper {
    public async allCars() {
        return await this.context.helpers.database.getAll<ICars>(CarsModel);
    }

    public async addCar(data: any) {
        return await this.context.helpers.database.add<ICars>(CarsModel, data);
    }

    public async deleteCar(id: string) {
        return await this.context.helpers.database.delete<ICars>(CarsModel, id);
    }

    public async updateCar(id: string, data: any) {
        return await this.context.helpers.database.update<ICars>(
            CarsModel,
            id,
            data,
        );
    }
}
