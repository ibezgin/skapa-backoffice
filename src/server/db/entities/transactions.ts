import mongoose, { Document, Schema } from "mongoose";
import { IProposal } from "./proposal";

// @Entity({ name: "transactions" })
export interface ITransactions extends Document {
    amount: number;
    proposalId: IProposal["_id"];
}

const schema: Schema = new Schema(
    {
        amount: Number,
        proposalId: Schema.Types.ObjectId,
    },
    { collection: "transactions" },
);

export const TransactionsModel = mongoose.model<ITransactions>(
    "transactions",
    schema,
);
