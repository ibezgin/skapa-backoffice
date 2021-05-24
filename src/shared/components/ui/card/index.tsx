import { CardWrapper, CardInner } from "./styled";
import { ReactNode } from "react";
import React from "react";

interface IProps {
    children: ReactNode;
}

export const Card = React.memo((props: IProps) => {
    return (
        <CardWrapper>
            <CardInner>{props.children}</CardInner>
        </CardWrapper>
    );
});
