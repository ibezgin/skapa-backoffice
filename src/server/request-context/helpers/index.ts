import { AbstractRequestContextHelper } from "../abstract-request-context-helper";
import { DatabaseContextHelper } from "./database";
import { RestContextHelper } from "./rest";
import { SectionsContextHelper } from "./sections";

export class RequestContextHelpers extends AbstractRequestContextHelper {
    private cache: {
        sections?: SectionsContextHelper;
        database?: DatabaseContextHelper;
        rest?: RestContextHelper;
    } = {};

    public get sections() {
        return (
            this.cache.sections ||
            (this.cache.sections = new SectionsContextHelper(this.context))
        );
    }

    public get database() {
        return (
            this.cache.database ||
            (this.cache.database = new DatabaseContextHelper(this.context))
        );
    }

    public get rest() {
        return (
            this.cache.rest ||
            (this.cache.rest = new RestContextHelper(this.context))
        );
    }
}
