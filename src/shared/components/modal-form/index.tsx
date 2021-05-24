import Modal from "antd/lib/modal/Modal";
import { Field, Formik, FormikHelpers } from "formik";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import * as FormikAntd from "formik-antd";
import { Typography } from "antd";
import _ from "lodash";
import { ModalFormTree } from "./tree";
import MaskedInput from "antd-mask-input";

const { Title } = Typography;

type FormFieldType =
    | "textField"
    | "numberField"
    | "selectField"
    | "checkboxField"
    | "phoneField"
    | "passwordField"
    | "gosNumberField"
    | "treeField";

type IField = {
    [key in FormFieldType]: any;
};

interface IFormikValues {
    [key: string]: any;
}

interface IOptions {
    label: string | number;
    value: string | number;
}

interface IChildTree {
    title: string;
    key: string;
}
export interface ITreeData {
    title: string;
    key: string;
    children: IChildTree[];
}

export interface IFormField {
    title: string;
    name: string;
    type: FormFieldType;
    options?: IOptions[];
    settings?: {
        disabledIfEmpty?: string;
    };
    treeData?: ITreeData[];
}

interface IProps {
    edit?: IFormikValues;
    onSubmit: (
        values: IFormikValues,
        formikHelpers: FormikHelpers<IFormikValues>,
    ) => void;
    formFields: IFormField[];
    children: (setVisible: (state: boolean) => void, values: any) => ReactNode;
    loading?: boolean;
}
export const ModalForm = React.memo((props: IProps) => {
    const { edit } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const checkField = (field: IFormField) => {
        const fields: IField = {
            textField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Input
                        name={field.name}
                        placeholder={field.title}
                        type="text"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        required
                    />
                </FormikAntd.FormItem>
            ),
            numberField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Input
                        name={field.name}
                        placeholder={field.title}
                        type="number"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        required
                    />
                </FormikAntd.FormItem>
            ),
            selectField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Select
                        name={field.name}
                        placeholder={field.title}
                        dropdownMatchSelectWidth={false}
                        allowClear={false}
                    >
                        {(field?.options || []).map(elem => (
                            <FormikAntd.Select.Option
                                key={`modal-form-option-${String(elem?.value)}`}
                                value={String(elem?.value)}
                            >
                                {elem?.label}
                            </FormikAntd.Select.Option>
                        ))}
                    </FormikAntd.Select>
                </FormikAntd.FormItem>
            ),
            checkboxField: (
                <FormikAntd.FormItem name={field.name}>
                    <FormikAntd.Checkbox name={field.name}>
                        {field.title}
                    </FormikAntd.Checkbox>
                </FormikAntd.FormItem>
            ),
            phoneField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <Field name={field.name}>
                        {fieldHelper => (
                            <MaskedInput
                                mask="+7 (111)-111-11-11"
                                pattern="+7 ([0-9]{3})-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                name={field.name}
                                placeholder={field.title}
                                type="tel"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                                {...fieldHelper.field}
                            />
                        )}
                    </Field>
                </FormikAntd.FormItem>
            ),
            passwordField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Input
                        name={field.name}
                        placeholder={field.title}
                        type="password"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </FormikAntd.FormItem>
            ),
            gosNumberField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <Field name={field.name}>
                        {fieldHelper => (
                            <MaskedInput
                                mask="W_111_WW_11RUS"
                                formatCharacters={{
                                    W: {
                                        validate(char) {
                                            // return /\w/.test(char);
                                            return char.match(/\D/g);
                                        },
                                        transform(char) {
                                            return char.toUpperCase();
                                        },
                                    },
                                }}
                                name={field.name}
                                placeholder={field.title}
                                type="tel"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                                {...fieldHelper.field}
                            />
                        )}
                    </Field>
                </FormikAntd.FormItem>
            ),
            treeField: (
                <ModalFormTree
                    name={field.name}
                    treeData={field.treeData || []}
                />
            ),
        };

        return fields[field.type];
    };

    const formFields = useCallback(
        () => props.formFields.map(elem => checkField(elem)),
        [props.formFields],
    );

    const initialValues = useMemo(() => {
        const addValues = props.formFields.map(elem => ({ [elem.name]: "" }));
        return { setVisible, ...(edit ? edit : addValues) };
    }, [edit, props.formFields]);

    return (
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={props.onSubmit}
            >
                {({ values }) => {
                    return (
                        <>
                            <Modal
                                visible={visible}
                                onCancel={() => {
                                    setVisible(false);
                                }}
                                footer={null}
                            >
                                <FormikAntd.Form layout="vertical">
                                    <Title level={4}>
                                        {_.isUndefined(edit)
                                            ? "Добавить"
                                            : "Редактировать"}
                                    </Title>
                                    {formFields()}
                                    <FormikAntd.SubmitButton
                                        loading={props.loading || false}
                                        block={true}
                                    >
                                        Сохранить
                                    </FormikAntd.SubmitButton>
                                </FormikAntd.Form>
                            </Modal>
                            {props.children(setVisible, values)}
                        </>
                    );
                }}
            </Formik>
        </>
    );
});
