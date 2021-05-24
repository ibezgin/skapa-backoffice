import React from "react";
import { SC } from "./styled";

interface IProps {
    nameAndLastName: string;
    phoneNumber: string;
}

export const TableClientInfo = React.memo((props: IProps) => {
    const { nameAndLastName, phoneNumber } = props;
    return (
        <>
            <SC.Name>{nameAndLastName}</SC.Name>
            <SC.Phone>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>,
            </SC.Phone>
        </>
    );
});
