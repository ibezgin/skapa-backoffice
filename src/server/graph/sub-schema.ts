import { IResolvers, ITypedef } from "graphql-tools";
import _ from "lodash";
import { RequestContext } from "../request-context";

export class SubSchema {
    public readonly typeDefs: ITypedef[] | ITypedef;
    public readonly resolverMap: IResolvers;

    public constructor(
        typeDefs: ITypedef[] | ITypedef,
        resolverMap: IResolvers<any, RequestContext>,
    ) {
        if (!_.isArray(typeDefs)) {
            typeDefs = [typeDefs];
        }
        this.typeDefs = typeDefs;
        this.resolverMap = resolverMap;
    }
}
