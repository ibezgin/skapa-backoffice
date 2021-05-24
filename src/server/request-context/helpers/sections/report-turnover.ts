import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import _ from "lodash";
import moment from "moment";
// import { ProposalStatus } from "service/enums/proposal-status";

export class ReportTurnoverContextHelper extends AbstractRequestContextHelper {
    public async report() {
        const allTransactions = await this.context.helpers.sections.transactions.allTransactions();
        const allProposals = await this.context.helpers.sections.proposal.allProposals();
        const connectProposalsAndTransactions = allTransactions.map(elem => ({
            ...elem,
            proposal: allProposals.find(
                proposal => String(proposal.id) === String(elem.proposalId),
            ),
        }));
        let result: any = [];
        let totalAmount = 0;
        _.forIn(
            _.groupBy(connectProposalsAndTransactions, elem => {
                const date = moment(Number(elem.proposal?.changeTime) * 1000)
                    .startOf("day")
                    .format("YYYY-MM-DD");

                return date;
            }),
            (value, key) => {
                let dayAmount = 0;
                for (const transaction of value) {
                    dayAmount += transaction.amount;
                }

                totalAmount += dayAmount;
                result = [
                    ...result,
                    {
                        date: key,
                        count: value.length,
                        dayAmount,
                        transactions: value.map(elem => ({
                            ...elem,
                            key: String(elem.id),
                        })),
                        key,
                    },
                ];
            },
        );

        return { totalAmount, data: result };
    }
}
