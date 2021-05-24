import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { IProposal, ProposalModel } from "../../../db/entities/proposal";
import { ProposalStatus } from "service/enums/proposal-status";

export class ProposalContextHelper extends AbstractRequestContextHelper {
    public async allProposals() {
        return (
            await this.context.helpers.database.getAll<IProposal>(ProposalModel)
        ).sort((a: any, b: any) => b.createTime - a.createTime);
    }
    public async getProposalById(id: string) {
        return await this.context.helpers.database.getById<IProposal>(
            ProposalModel,
            id,
        );
    }

    public async addProposal(data: any) {
        const result = await ProposalModel.findOne({
            order: { proposal_id: "DESC" },
        });
        const lastProposalId = result?.proposal_id || 0;

        data.proposal_id = lastProposalId + 1;

        return await this.context.helpers.database.add<IProposal>(
            ProposalModel,
            data,
        );
    }

    public async deleteProposal(id: string) {
        return await this.context.helpers.database.delete<IProposal>(
            ProposalModel,
            id,
        );
    }

    public async updateProposal(id: string, data: any) {
        if (data.status === ProposalStatus.PAY_AND_COMPLITED) {
            let amount = 0;

            let complitedServiceIds: string[] = [];

            const allServices = await this.context.helpers.sections.service.allServices();

            const complitedWorks = JSON.parse(data.completedWork);

            for (const service in complitedWorks) {
                if (complitedWorks[service]) {
                    complitedServiceIds = [...complitedServiceIds, service];
                }
            }

            const complitedServices = allServices.filter(
                elem => complitedServiceIds.indexOf(String(elem.id)) !== -1,
            );

            complitedServices.forEach(elem => {
                amount += Number(elem.price);
            });

            await this.context.helpers.sections.transactions.addTransaction(
                id,
                amount,
            );
        }
        return await this.context.helpers.database.update<IProposal>(
            ProposalModel,
            id,
            data,
        );
    }
}
