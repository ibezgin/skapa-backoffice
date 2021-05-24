import mongoose, { Schema, Document } from "mongoose";
import { IBrand } from "./brand";
import { IClients } from "./clients";
import { IModels } from "./models";

export interface ICars extends Document {
    brandId: IBrand["_id"];
    modelId: IModels["_id"];
    clientId: IClients["_id"];
    gosNumber: string;
    color: string;
}

const schema: Schema = new Schema(
    {
        brandId: Schema.Types.ObjectId,
        modelId: Schema.Types.ObjectId,
        clientId: Schema.Types.ObjectId,
        gosNumber: String,
        color: String,
    },
    { collection: "cars" },
);

export const CarsModel = mongoose.model<ICars>("cars", schema);
