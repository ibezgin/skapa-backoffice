import mongoose, { Document, Schema } from "mongoose";
import { IBrand } from "./brand";

// @Entity({ name: "models" })
export interface IModels extends Document {
    brandId: IBrand["_id"];
    title: string;
}

const schema: Schema = new Schema(
    {
        brandId: Schema.Types.ObjectId,
        title: String,
    },
    { collection: "models" },
);

export const ModelsModel = mongoose.model<IModels>("models", schema);
