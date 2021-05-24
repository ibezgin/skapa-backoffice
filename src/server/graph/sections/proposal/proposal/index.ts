import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const proposalSubSchema = new SubSchema(schema, {
    Query: {
        proposal: () => ({}),
    },
    Mutation: {
        proposal: () => ({}),
    },
    ProposalQuery: {
        allProposals: async (_obj, _props, { helpers }) =>
            await helpers.sections.proposal.allProposals(),
        proposalById: async (_obj, { id }, { helpers }) =>
            await helpers.sections.proposal.getProposalById(id),
    },
    ProposalMutation: {
        addProposal: async (_obj, { data }, { helpers }) =>
            await helpers.sections.proposal.addProposal(data),
        deleteProposal: async (_obj, { id }, { helpers }) =>
            await helpers.sections.proposal.deleteProposal(id),
        updateProposal: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.proposal.updateProposal(id, data),
    },
});
