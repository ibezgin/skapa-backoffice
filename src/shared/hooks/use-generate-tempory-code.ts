import _ from "lodash";

export function useGenerateCode() {
    const generateTemporyCode = (length = 10) =>
        _.padStart(_.random(Math.pow(10, length) - 1) + "", length, "0");

    return {
        generateTemporyCode,
    };
}
