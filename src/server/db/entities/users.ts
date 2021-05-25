import mongoose, { Document, Schema } from "mongoose";

// @Entity({ name: "users" })
export interface IUsers extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    isAdmin: boolean;
}

const schema: Schema = new Schema(
    {
        firstname: String,
        username: { type: String, unique: true },
        password: String,
        isAdmin: Boolean,
    },
    { collection: "users" },
);

export const UsersModel = mongoose.model<IUsers>("users", schema);
