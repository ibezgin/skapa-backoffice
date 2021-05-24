import mongoose, { Document, Schema } from "mongoose";

// @Entity({ name: "users" })
export interface IUsers extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    position: string;
    permission: any;
}

const schema: Schema = new Schema(
    {
        firstname: String,
        lastname: String,
        username: { type: String, unique: true },
        password: String,
        position: String,
        permission: JSON,
    },
    { collection: "users" },
);

export const UsersModel = mongoose.model<IUsers>("users", schema);
