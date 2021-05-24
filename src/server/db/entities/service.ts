import mongoose, { Document, Schema } from "mongoose";

// @Entity({ name: "service" })
export interface IService extends Document {
    title: string;
    price: number;
}

const schema = new Schema(
    { title: String, price: Number },
    { collection: "service" },
);

export const ServiceModel = mongoose.model<IService>("service", schema);
