import _ from "lodash";
import voucher_codes from "voucher-code-generator";

export function useGenerateCode() {
    const generateTemporyCode = (length = 10) =>
        _.padStart(_.random(Math.pow(10, length) - 1) + "", length, "0");

    const generatePromoCode = (params?: { length: 8; count: 1 }) => {
        const promoCode = voucher_codes.generate({
            ...params,
            charset: voucher_codes.charset("alphabetic"),
        });
        return promoCode[0];
    };
    return {
        generateTemporyCode,
        generatePromoCode,
    };
}
