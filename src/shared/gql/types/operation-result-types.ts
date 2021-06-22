/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_authentication_currentUser {
    __typename: "LoginType";
    id: string | null;
    username: string | null;
    permission: any | null;
    position: string | null;
}

export interface CurrentUser_authentication {
    __typename: "AuthenticationQuery";
    currentUser: CurrentUser_authentication_currentUser | null;
}

export interface CurrentUser {
    authentication: CurrentUser_authentication;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_authentication_login {
    __typename: "LoginType";
    id: string | null;
    username: string | null;
}

export interface Login_authentication {
    __typename: "AuthenticationMutation";
    login: Login_authentication_login | null;
}

export interface Login {
    authentication: Login_authentication;
}

export interface LoginVariables {
    username?: string | null;
    password?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_authentication {
    __typename: "AuthenticationMutation";
    logout: boolean | null;
}

export interface Logout {
    authentication: Logout_authentication;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddManyPromocodes
// ====================================================

export interface AddManyPromocodes_promoCodes {
    __typename: "PromoCodesMutation";
    addMany: boolean | null;
}

export interface AddManyPromocodes {
    promoCodes: AddManyPromocodes_promoCodes;
}

export interface AddManyPromocodesVariables {
    data: PromoCodeInput[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPromocode
// ====================================================

export interface AddPromocode_promoCodes {
    __typename: "PromoCodesMutation";
    add: boolean | null;
}

export interface AddPromocode {
    promoCodes: AddPromocode_promoCodes;
}

export interface AddPromocodeVariables {
    data: PromoCodeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPromocodes
// ====================================================

export interface AllPromocodes_promoCodes_all_data {
    __typename: "PromoCodeType";
    id: string | null;
    name: string | null;
    sale: string | null;
    createdAt: string | null;
    adminId: string | null;
    used: boolean | null;
    QRCodeId: string | null;
}

export interface AllPromocodes_promoCodes_all {
    __typename: "AllPromoCodeType";
    data: AllPromocodes_promoCodes_all_data[];
    count: number;
}

export interface AllPromocodes_promoCodes {
    __typename: "PromoCodesQuery";
    all: AllPromocodes_promoCodes_all | null;
}

export interface AllPromocodes {
    promoCodes: AllPromocodes_promoCodes;
}

export interface AllPromocodesVariables {
    count?: number | null;
    offset?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePromocode
// ====================================================

export interface DeletePromocode_promoCodes {
    __typename: "PromoCodesMutation";
    delete: boolean | null;
}

export interface DeletePromocode {
    promoCodes: DeletePromocode_promoCodes;
}

export interface DeletePromocodeVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePromocode
// ====================================================

export interface UpdatePromocode_promoCodes {
    __typename: "PromoCodesMutation";
    update: boolean | null;
}

export interface UpdatePromocode {
    promoCodes: UpdatePromocode_promoCodes;
}

export interface UpdatePromocodeVariables {
    id?: string | null;
    data: PromoCodeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_users {
    __typename: "UsersMutation";
    addUser: boolean | null;
}

export interface AddUser {
    users: AddUser_users;
}

export interface AddUserVariables {
    data: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllUsers
// ====================================================

export interface AllUsers_users_allUsers {
    __typename: "UserType";
    id: string;
    firstname: string;
    username: string;
    isAdmin: boolean | null;
}

export interface AllUsers_users {
    __typename: "UsersQuery";
    allUsers: (AllUsers_users_allUsers | null)[] | null;
}

export interface AllUsers {
    users: AllUsers_users;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_users {
    __typename: "UsersMutation";
    deleteUser: boolean | null;
}

export interface DeleteUser {
    users: DeleteUser_users;
}

export interface DeleteUserVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_users {
    __typename: "UsersMutation";
    updateUser: boolean | null;
}

export interface UpdateUser {
    users: UpdateUser_users;
}

export interface UpdateUserVariables {
    id: string;
    data: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface PromoCodeInput {
    name?: string | null;
    sale?: string | null;
    adminId?: string | null;
    QRCodeId?: string | null;
}

export interface UserInput {
    firstname: string;
    username: string;
    password?: string | null;
    isAdmin: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
