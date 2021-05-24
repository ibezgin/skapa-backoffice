import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const reportTurnoverSubSchema = new SubSchema(schema, {
    Query: {
        reportTurnover: () => ({}),
    },
    Mutation: {
        reportTurnover: () => ({}),
    },
    ReportTurnoverQuery: {
        report: async (_obj, _props, { helpers }) =>
            await helpers.sections.reportTurnover.report(),
    },
    ReportTurnoverMutation: {
        reportMutation: async (_obj, _props, { helpers }) =>
            await helpers.sections.reportTurnover.report(),
    },
});
