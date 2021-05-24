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
// GraphQL mutation operation: AddBrand
// ====================================================

export interface AddBrand_brand {
    __typename: "BrandMutation";
    addBrand: boolean | null;
}

export interface AddBrand {
    brand: AddBrand_brand;
}

export interface AddBrandVariables {
    title: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllBrand
// ====================================================

export interface AllBrand_brand_allBrands {
    __typename: "BrandType";
    id: string;
    title: string;
}

export interface AllBrand_brand {
    __typename: "BrandQuery";
    allBrands: AllBrand_brand_allBrands[];
}

export interface AllBrand {
    brand: AllBrand_brand;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteBrand
// ====================================================

export interface DeleteBrand_brand {
    __typename: "BrandMutation";
    deleteBrand: boolean | null;
}

export interface DeleteBrand {
    brand: DeleteBrand_brand;
}

export interface DeleteBrandVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBrand
// ====================================================

export interface UpdateBrand_brand {
    __typename: "BrandMutation";
    updateBrand: boolean | null;
}

export interface UpdateBrand {
    brand: UpdateBrand_brand;
}

export interface UpdateBrandVariables {
    id: string;
    title: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCarPart
// ====================================================

export interface AddCarPart_carPart {
    __typename: "CarPartMutation";
    addCarPart: boolean | null;
}

export interface AddCarPart {
    carPart: AddCarPart_carPart;
}

export interface AddCarPartVariables {
    title: string;
    price: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCarParts
// ====================================================

export interface AllCarParts_carPart_allCarParts {
    __typename: "CarPartType";
    id: string;
    title: string;
    price: number;
}

export interface AllCarParts_carPart {
    __typename: "CarPartQuery";
    allCarParts: AllCarParts_carPart_allCarParts[];
}

export interface AllCarParts {
    carPart: AllCarParts_carPart;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCarPart
// ====================================================

export interface DeleteCarPart_carPart {
    __typename: "CarPartMutation";
    deleteCarPart: boolean | null;
}

export interface DeleteCarPart {
    carPart: DeleteCarPart_carPart;
}

export interface DeleteCarPartVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCarPart
// ====================================================

export interface UpdateCarPart_carPart {
    __typename: "CarPartMutation";
    updateCarPart: boolean | null;
}

export interface UpdateCarPart {
    carPart: UpdateCarPart_carPart;
}

export interface UpdateCarPartVariables {
    id: string;
    title: string;
    price: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddModel
// ====================================================

export interface AddModel_models {
    __typename: "ModelsMutation";
    addModel: boolean | null;
}

export interface AddModel {
    models: AddModel_models;
}

export interface AddModelVariables {
    title: string;
    brandId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllModels
// ====================================================

export interface AllModels_models_allModels {
    __typename: "ModelType";
    id: string;
    brandId: string | null;
    title: string;
}

export interface AllModels_models {
    __typename: "ModelsQuery";
    allModels: AllModels_models_allModels[];
}

export interface AllModels {
    models: AllModels_models;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteModel
// ====================================================

export interface DeleteModel_models {
    __typename: "ModelsMutation";
    deleteModel: boolean | null;
}

export interface DeleteModel {
    models: DeleteModel_models;
}

export interface DeleteModelVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateModel
// ====================================================

export interface UpdateModel_models {
    __typename: "ModelsMutation";
    updateModel: boolean | null;
}

export interface UpdateModel {
    models: UpdateModel_models;
}

export interface UpdateModelVariables {
    id: string;
    title: string;
    brandId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddService
// ====================================================

export interface AddService_service {
    __typename: "ServiceMutation";
    addService: boolean | null;
}

export interface AddService {
    service: AddService_service;
}

export interface AddServiceVariables {
    title: string;
    price: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllServices
// ====================================================

export interface AllServices_service_allServices {
    __typename: "ServiceType";
    id: string;
    title: string;
    price: number;
}

export interface AllServices_service {
    __typename: "ServiceQuery";
    allServices: AllServices_service_allServices[];
}

export interface AllServices {
    service: AllServices_service;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteService
// ====================================================

export interface DeleteService_service {
    __typename: "ServiceMutation";
    deleteService: boolean | null;
}

export interface DeleteService {
    service: DeleteService_service;
}

export interface DeleteServiceVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateService
// ====================================================

export interface UpdateService_service {
    __typename: "ServiceMutation";
    updateService: boolean | null;
}

export interface UpdateService {
    service: UpdateService_service;
}

export interface UpdateServiceVariables {
    id: string;
    title: string;
    price: number;
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
    data?: UserInput | null;
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
    lastname: string;
    username: string;
    position: string;
    permission: any | null;
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

// ====================================================
// GraphQL mutation operation: AddProposal
// ====================================================

export interface AddProposal_proposal {
    __typename: "ProposalMutation";
    addProposal: boolean | null;
}

export interface AddProposal {
    proposal: AddProposal_proposal;
}

export interface AddProposalVariables {
    data: ProposalInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllProposals
// ====================================================

export interface AllProposals_proposal_allProposals {
    __typename: "ProposalType";
    id: string | null;
    proposal_id: number | null;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string | null;
    proposalReason: string | null;
    technicalInspectionResult: string | null;
    recomendedWork: (string | null)[] | null;
    completedWork: any | null;
    key: string | null;
}

export interface AllProposals_proposal {
    __typename: "ProposalQuery";
    allProposals: AllProposals_proposal_allProposals[];
}

export interface AllProposals {
    proposal: AllProposals_proposal;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProposalById
// ====================================================

export interface ProposalById_proposal_proposalById {
    __typename: "ProposalType";
    id: string | null;
    proposal_id: number | null;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string | null;
    proposalReason: string | null;
    technicalInspectionResult: string | null;
    recomendedWork: (string | null)[] | null;
    completedWork: any | null;
    key: string | null;
}

export interface ProposalById_proposal {
    __typename: "ProposalQuery";
    proposalById: ProposalById_proposal_proposalById;
}

export interface ProposalById {
    proposal: ProposalById_proposal;
}

export interface ProposalByIdVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProposal
// ====================================================

export interface UpdateProposal_proposal {
    __typename: "ProposalMutation";
    updateProposal: boolean | null;
}

export interface UpdateProposal {
    proposal: UpdateProposal_proposal;
}

export interface UpdateProposalVariables {
    id: string;
    data?: ProposalInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCar
// ====================================================

export interface AddCar_cars {
    __typename: "CarsMutation";
    addCar: boolean | null;
}

export interface AddCar {
    cars: AddCar_cars;
}

export interface AddCarVariables {
    data: CarInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCars
// ====================================================

export interface AllCars_cars_allCars {
    __typename: "CarType";
    id: string;
    brandId: string;
    modelId: string;
    clientId: string;
    gosNumber: string;
    color: string;
}

export interface AllCars_cars {
    __typename: "CarsQuery";
    allCars: AllCars_cars_allCars[];
}

export interface AllCars {
    cars: AllCars_cars;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCar
// ====================================================

export interface DeleteCar_cars {
    __typename: "CarsMutation";
    deleteCar: boolean | null;
}

export interface DeleteCar {
    cars: DeleteCar_cars;
}

export interface DeleteCarVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCar
// ====================================================

export interface UpdateCar_cars {
    __typename: "CarsMutation";
    updateCar: boolean | null;
}

export interface UpdateCar {
    cars: UpdateCar_cars;
}

export interface UpdateCarVariables {
    id: string;
    data: CarInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddClient
// ====================================================

export interface AddClient_clients {
    __typename: "ClientsMutation";
    addClient: boolean | null;
}

export interface AddClient {
    clients: AddClient_clients;
}

export interface AddClientVariables {
    data: ClientInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllClients
// ====================================================

export interface AllClients_clients_allClients {
    __typename: "ClientType";
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    createTime: string;
}

export interface AllClients_clients {
    __typename: "ClientsQuery";
    allClients: AllClients_clients_allClients[];
}

export interface AllClients {
    clients: AllClients_clients;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteClient
// ====================================================

export interface DeleteClient_clients {
    __typename: "ClientsMutation";
    deleteClient: boolean | null;
}

export interface DeleteClient {
    clients: DeleteClient_clients;
}

export interface DeleteClientVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateClient
// ====================================================

export interface UpdateClient_clients {
    __typename: "ClientsMutation";
    updateClient: boolean | null;
}

export interface UpdateClient {
    clients: UpdateClient_clients;
}

export interface UpdateClientVariables {
    id: string;
    data: ClientInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReportEveryDay
// ====================================================

export interface ReportEveryDay_reportEveryDay_report_proposals {
    __typename: "ProposalType";
    id: string | null;
    proposal_id: number | null;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string | null;
    proposalReason: string | null;
    technicalInspectionResult: string | null;
    recomendedWork: (string | null)[] | null;
    completedWork: any | null;
    key: string | null;
}

export interface ReportEveryDay_reportEveryDay_report {
    __typename: "ReportEveryDayType";
    count: number;
    date: string;
    proposals: ReportEveryDay_reportEveryDay_report_proposals[];
    key: string | null;
}

export interface ReportEveryDay_reportEveryDay {
    __typename: "ReportEveryDayQuery";
    report: ReportEveryDay_reportEveryDay_report[];
}

export interface ReportEveryDay {
    reportEveryDay: ReportEveryDay_reportEveryDay;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReportTurnover
// ====================================================

export interface ReportTurnover_reportTurnover_report_data_transactions_proposal {
    __typename: "ProposalType";
    id: string | null;
    proposal_id: number | null;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string | null;
    proposalReason: string | null;
    technicalInspectionResult: string | null;
    recomendedWork: (string | null)[] | null;
    completedWork: any | null;
    key: string | null;
}

export interface ReportTurnover_reportTurnover_report_data_transactions {
    __typename: "TransactionsTutnoverType";
    key: string | null;
    proposal: ReportTurnover_reportTurnover_report_data_transactions_proposal | null;
    id: string | null;
    amount: number | null;
    proposalId: string | null;
}

export interface ReportTurnover_reportTurnover_report_data {
    __typename: "TransactionTurnoverByDayType";
    date: string;
    count: number;
    dayAmount: number;
    transactions: ReportTurnover_reportTurnover_report_data_transactions[];
    key: string | null;
}

export interface ReportTurnover_reportTurnover_report {
    __typename: "ReportTurnoverType";
    totalAmount: number | null;
    data: (ReportTurnover_reportTurnover_report_data | null)[] | null;
}

export interface ReportTurnover_reportTurnover {
    __typename: "ReportTurnoverQuery";
    report: ReportTurnover_reportTurnover_report | null;
}

export interface ReportTurnover {
    reportTurnover: ReportTurnover_reportTurnover;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: proposalType
// ====================================================

export interface proposalType {
    __typename: "ProposalType";
    id: string | null;
    proposal_id: number | null;
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string | null;
    proposalReason: string | null;
    technicalInspectionResult: string | null;
    recomendedWork: (string | null)[] | null;
    completedWork: any | null;
    key: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CarInput {
    brandId: string;
    modelId: string;
    clientId: string;
    gosNumber: string;
    color: string;
}

export interface ClientInput {
    firstName: string;
    lastName: string;
    phone: string;
    createTime: string;
}

export interface ProposalInput {
    createTime: string;
    changeTime: string;
    status: number;
    clientId: string;
    carId: string;
    userId: string;
    proposalReason?: string | null;
    technicalInspectionResult?: string | null;
    recomendedWork?: (string | null)[] | null;
    completedWork?: any | null;
}

export interface UserInput {
    firstname: string;
    lastname: string;
    username: string;
    password?: string | null;
    permission?: any | null;
    position: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
