import { SC } from "./styled";
import { Switch as AntdSwitch, Typography } from "antd";
import { SwitchProps } from "antd/lib/switch";
import * as FormikAntd from "formik-antd";
import React from "react";

const { Text } = Typography;

interface IProps {
    label?: string;
    isForm?: boolean;
    name?: string;
    switchProps?: SwitchProps;
}

export const Switch = React.memo((props: IProps) => {
    return (
        <SC.Wrapper>
            {props.isForm ? (
                <FormikAntd.Switch
                    name={String(props.name)}
                    {...props.switchProps}
                />
            ) : (
                <AntdSwitch {...props.switchProps} />
            )}
            {props.label && <Text>{props.label}</Text>}
        </SC.Wrapper>
    );
});
