import { SC } from "./styled";
import moment from "moment";
import React from "react";

interface IProps {
    date: number | string | Date;
}

export const TableDateTime = React.memo((props: IProps) => {
    const date = moment(props.date).format("DD-MM-YY");
    const time = moment(props.date).format("HH:mm:ss");
    return (
        <>
            <SC.Date>{date}</SC.Date>
            <SC.Time>{time}</SC.Time>
        </>
    );
});
