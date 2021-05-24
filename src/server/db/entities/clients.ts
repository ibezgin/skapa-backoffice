import mongoose, { Schema, Document } from "mongoose";

// @Entity({ name: "clients" })
export interface IClients extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    createTime: string;
}

const schema: Schema = new Schema(
    {
        firstName: String,
        lastName: String,
        phone: String,
        createTime: String,
    },
    { collection: "clients" },
);

export const ClientsModel = mongoose.model<IClients>("clients", schema);
