import _ from "lodash";
import format from "format-number";

export function useFormat() {
    const addZeroToId = (id: string, count = 6) => {
        const idLength = id.length;
        if (idLength >= count) {
            return id;
        }
        const otherLength = 6 - idLength;
        let zero = "";
        for (let i = 0; i < otherLength; i++) {
            zero = zero + "0";
        }
        return zero + id;
    };

    const numberFormat = (numb: number) => {
        if (!_.isNumber(numb)) {
            return numb;
        }
        return format({ integerSeparator: " " })(numb);
    };

    return { addZeroToId, numberFormat };
}
