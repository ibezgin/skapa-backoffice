import { AbstractRequestContextHelper } from "request-context/abstract-request-context-helper";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IRequestParams {
    path: string;
    params?: Record<string, unknown> | undefined;
}

interface IPayloadRequestParams {
    path: string;
    params?: Record<string, unknown> | undefined;
    data?: Record<string, unknown> | undefined;
}

export interface IResponse<T = any> {
    state: "success" | "error";
    error: any;
    value?: T;
}

export class RestContextHelper extends AbstractRequestContextHelper {
    public async get(params: IRequestParams): Promise<any> {
        const requestParams: AxiosRequestConfig = {
            method: "get",
            url: process.env.API_PATH
                ? `${process.env.API_PATH}${params.path}`
                : "localhost:3000/api/backoffice-api",
            headers: await this.getHeaders(),
            params: params.params,
        };

        const response: AxiosResponse<IResponse<any>> = await this.send(
            requestParams,
        );

        const { data } = response;

        return this.checkResponse(data);
    }

    public async delete(params: IPayloadRequestParams): Promise<any> {
        const requestParams: AxiosRequestConfig = {
            method: "delete",
            url: process.env.API_PATH
                ? `${process.env.API_PATH}${params.path}`
                : "localhost:3000/api/backoffice-api",
            headers: await this.getHeaders(),
            params: params.params,
            data: params.data,
        };

        const response: AxiosResponse<IResponse<any>> = await this.send(
            requestParams,
        );

        const { data } = response;

        return this.checkResponse(data);
    }

    public async post(params: IPayloadRequestParams): Promise<any> {
        const requestParams: AxiosRequestConfig = {
            method: "post",
            url: process.env.API_PATH
                ? `${process.env.API_PATH}${params.path}`
                : "localhost:3000/api/backoffice-api",
            headers: await this.getHeaders(),
            params: params.params,
            data: params.data,
        };

        const response: AxiosResponse<IResponse<any>> = await this.send(
            requestParams,
        );

        const { data } = response;

        return this.checkResponse(data);
    }
    public async patch(params: IPayloadRequestParams): Promise<any> {
        const requestParams: AxiosRequestConfig = {
            method: "patch",
            url: process.env.API_PATH
                ? `${process.env.API_PATH}${params.path}`
                : "localhost:3000/api/backoffice-api",
            headers: await this.getHeaders(),
            params: params.params,
            data: params.data,
        };

        const response: AxiosResponse<IResponse<any>> = await this.send(
            requestParams,
        );

        const { data } = response;

        return this.checkResponse(data);
    }

    private send = async (requestConfig: AxiosRequestConfig) => {
        try {
            return await axios(requestConfig);
        } catch (error) {
            throw Error(error.error);
        }
    };

    private checkResponse(data: IResponse) {
        if (data.state === "success") {
            return data.value;
        }

        if (data.state === "error") {
            throw new Error(data.error.writeErrors[0].errmsg);
        }
    }

    private async getHeaders() {
        return {
            "Content-Type": "application/json",
            "skapa-api-key": await this.getToken(),
        };
    }

    private async getToken() {
        const requestParams: AxiosRequestConfig = {
            method: "POST",
            url: process.env.IDENTITY_API_PATH
                ? process.env.IDENTITY_API_PATH
                : "localhost:3000/api/identity-api/token/get-connection-token",
            data: {
                client_id: "backoffice",
                secret: "WxW0NZBes2BO0RizsjUgj2snooPj3G8KDJm5gTD04gy1wsw",
            },
        };

        console.log(requestParams);

        console.log();
        const response: AxiosResponse<IResponse<string>> = await this.send(
            requestParams,
        );

        // eslint-disable-next-line no-console
        console.log(response.data);
        return response?.data?.value;
    }
}
