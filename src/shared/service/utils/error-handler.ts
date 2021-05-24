import { ApolloError } from "@apollo/client";
import { notification } from "antd";

export const errorHandler = (error: ApolloError) => {
    notification.error({
        message: "Ошибка",
        description: error.message,
    });
};
