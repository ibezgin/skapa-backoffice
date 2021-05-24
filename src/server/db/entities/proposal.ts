import mongoose, { Document, Schema } from "mongoose";
import { IClients } from "./clients";
import { ICars } from "./cars";
import { IUsers } from "./users";

// @Entity({ name: "proposal" })
export interface IProposal extends Document {
    proposal_id: number;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: IClients["_id"];
    carId: ICars["_id"];
    userId: IUsers["_id"];
    proposalReason: string;
    technicalInspectionResult: string;
    recomendedWork: string[];
    completedWork: string;
}

const schema: Schema = new Schema(
    {
        proposal_id: Number,
        createTime: String,
        changeTime: String,
        status: Number,
        clientId: Schema.Types.ObjectId,
        carId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        proposalReason: String,
        technicalInspectionResult: String,
        recomendedWork: [String],
        completedWork: String,
    },
    { collection: "proposal" },
);

export const ProposalModel = mongoose.model<IProposal>("proposal", schema);
