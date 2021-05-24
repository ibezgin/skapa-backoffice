import { RequestContextHelpers } from "./helpers";
import { Request, Response } from "express";
import { buildContext } from "graphql-passport";
import { Context } from "graphql-passport/lib/buildContext";
export class RequestContext {
    /**
     *  Helpers
     */
    public readonly helpers: RequestContextHelpers;

    public request: Request;

    public response: Response;

    public authentification: Context<any>;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
        this.helpers = new RequestContextHelpers(this);
        this.authentification = buildContext({ req: request, res: response });
    }
}
