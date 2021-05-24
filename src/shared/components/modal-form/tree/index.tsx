import React, { useCallback } from "react";
import { ITreeData } from "../";
import { Tree } from "antd";
import { useFormikContext } from "formik";

interface IProps {
    treeData: ITreeData[];
    name: string;
}

export const ModalFormTree = React.memo((props: IProps) => {
    const { setFieldValue, values } = useFormikContext<any>();

    const onCheck = useCallback(
        selectedKeys => {
            setFieldValue(props.name, selectedKeys);
        },
        [props.name, setFieldValue],
    );

    return (
        <Tree
            checkedKeys={values[props.name] || []}
            checkable
            treeData={props.treeData}
            onCheck={onCheck}
            defaultExpandAll
        />
    );
});
