import { RequestContext } from ".";

export abstract class AbstractRequestContextHelper {
    protected context: RequestContext;
    public constructor(requestContext: RequestContext) {
        this.context = requestContext;
    }
}
