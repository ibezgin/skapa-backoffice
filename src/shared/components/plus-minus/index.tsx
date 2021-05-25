import React from "react";

interface IProps {
    value: boolean;
}
export const PlusMinus = React.memo((props: IProps) => {
    const { value } = props;
    return <span className={!value ? "minus" : "plus"} />;
});
