import { Modal, Radio } from "antd";
import { useCallback } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import { SC } from "../../styled";
import { setLocale } from "store/app/actions";
import { useDispatch, useSelector } from "react-redux";
import { Locale } from "store/app/types";
import React from "react";

interface IProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

export const LanguageListModal = React.memo((props: IProps) => {
    const locale: string = useSelector((state: any) => state.locale);

    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: RadioChangeEvent) => {
            dispatch(setLocale(e.target.value as Locale));
            props.setVisible(false);
        },
        [dispatch, props],
    );

    return (
        <Modal
            visible={props.visible}
            centered={true}
            footer={null}
            onCancel={() => {
                props.setVisible(false);
            }}
            width={220}
        >
            <Radio.Group onChange={handleLocaleChange} value={locale}>
                <SC.CheckboxListRadio key="ru_RU" value="ru_RU">
                    Русский
                </SC.CheckboxListRadio>{" "}
                <SC.CheckboxListRadio key="en_US" value="en_US">
                    English
                </SC.CheckboxListRadio>
            </Radio.Group>
        </Modal>
    );
});
