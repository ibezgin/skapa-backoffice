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

export interface UserInput {
  firstname: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
