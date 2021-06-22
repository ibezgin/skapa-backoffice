import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { IUsers, UsersModel } from "../../../db/entities/users";
import bcrypt from "bcryptjs";
import { UserInput } from "gql/types/operation-result-types";
export class UsersContextHelper extends AbstractRequestContextHelper {
    public async allUsers() {
        const result = await this.context.helpers.database.getAll<IUsers>(
            UsersModel,
        );

        return result;
    }

    public async addUser(data: any) {
        const allUsers = await this.allUsers();
        const checkUserName = allUsers.find(
            (elem: any) => data.username === elem.username,
        );
        if (!checkUserName) {
            const password = await bcrypt.hash(data.password, 10);

            return await this.context.helpers.database.add<IUsers>(UsersModel, {
                ...data,
                password,
            });
        }
        throw Error("Username уже существует");
    }

    public async deleteUser(id: string) {
        return await this.context.helpers.database.delete<IUsers>(
            UsersModel,
            id,
        );
    }

    public async updateUser(id: string, data: UserInput) {
        const user: any = await this.context.helpers.database.getById<IUsers>(
            UsersModel,
            id,
        );
        return await this.context.helpers.database.update<IUsers>(
            UsersModel,
            id,
            {
                // ...user,
                ...data,
                password: data.password
                    ? await bcrypt.hash(data.password, 10)
                    : user.password,
            },
        );
    }
}
