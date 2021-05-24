import { notification } from "antd";

export function useMutationOptions() {
    return {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };
}
