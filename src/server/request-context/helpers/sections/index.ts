import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { PromoCodesContextHelper } from "./promocodes";
import { UsersContextHelper } from "./users";

export class SectionsContextHelper extends AbstractRequestContextHelper {
    public get users() {
        return new UsersContextHelper(this.context);
    }
    public get promocodes() {
        return new PromoCodesContextHelper(this.context);
    }
}
