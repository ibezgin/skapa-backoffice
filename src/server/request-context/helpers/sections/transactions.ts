import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import {
    ITransactions,
    TransactionsModel,
} from "../../../db/entities/transactions";

export class TransactionsContextHelper extends AbstractRequestContextHelper {
    public async allTransactions() {
        return await this.context.helpers.database.getAll<ITransactions>(
            TransactionsModel,
        );
    }

    public async addTransaction(proposalId: string, amount: number) {
        return await this.context.helpers.database.add<ITransactions>(
            TransactionsModel,
            { proposalId, amount },
        );
    }
}
