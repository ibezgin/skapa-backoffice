import mongoose, { Schema, Document } from "mongoose";

export interface ICarPart extends Document {
    title: string;
    price: number;
}

const schema: Schema = new Schema(
    { title: String, price: Number },
    { collection: "car-part" },
);

export const CarPartModel = mongoose.model<ICarPart>("car-part", schema);
