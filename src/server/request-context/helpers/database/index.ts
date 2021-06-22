import _ from "lodash";
import { Document, Model } from "mongoose";

import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

interface IValuesType {
    [key: string]: any;
}

export class DatabaseContextHelper extends AbstractRequestContextHelper {
    // private isAuthorized = this.context.authentification.isAuthenticated;

    public async getAll<T extends Document>(model: Model<T>) {
        const result = await model.find();
        return result;
    }

    public async getById<T extends Document>(model: Model<T>, id: string) {
        // eslint-disable-next-line no-console
        const result = await model.findById(id);

        return result;
    }

    public async add<T extends Document>(model: Model<T>, values: IValuesType) {
        // const newEntity: any = new entity();
        // // eslint-disable-next-line guard-for-in
        // for (const key in values) {
        //     newEntity[key] = values[key];
        // }
        // const manager = getMongoManager();

        const _model = new model(values);

        const result = await _model.save();
        return !!result;
    }

    public async delete<T extends Document>(model: Model<T>, id: string) {
        const result = await model.findByIdAndDelete(id);
        return _.isEmpty(result);
    }

    public async update<T extends Document>(
        model: Model<T>,
        id: string,
        values: any,
    ) {
        const result = await model.findByIdAndUpdate(id, { ...values });
        return !result;
    }
    // private checkAuth() {
    //     if (this.isAuthorized()) {
    //         return;
    //     }
    //     throw Error("Ошибка авторизации");
    // }
}
