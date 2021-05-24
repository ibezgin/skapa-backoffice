import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
    title: string;
}
const schema: Schema = new Schema(
    {
        title: String,
    },
    { collection: "brand" },
);

export const BrandModel = mongoose.model<IBrand>("brand", schema);
