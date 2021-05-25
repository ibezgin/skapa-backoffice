import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { UsersContextHelper } from "./users";

export class SectionsContextHelper extends AbstractRequestContextHelper {
    public get users() {
        return new UsersContextHelper(this.context);
    }
}
