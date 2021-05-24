import _ from "lodash";
import React from "react";
import { useFormat } from "../../hooks/use-format";

interface IProps {
    numb: number | null | undefined;
    currency?: string | null;
}

export const NumberFormatter = React.memo((props: IProps) => {
    const { numberFormat } = useFormat();

    if (typeof props.numb === "undefined" || _.isNull(props.numb)) {
        return <>{props.numb}</>;
    }
    let color = "";
    if (props.numb !== 0) {
        if (props.numb > 0) {
            color = "green";
        }
        if (props.numb < 0) {
            color = "red";
        }
    }
    return (
        <span
            style={{
                whiteSpace: "nowrap",
                fontWeight: 500,
            }}
            className={color}
        >
            {numberFormat(props.numb)} {props.currency}
        </span>
    );
});
