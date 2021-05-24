import * as FormikAntd from "formik-antd";
import React from "react";

export const FilterAssignedToMe = React.memo(() => {
    return (
        <FormikAntd.Checkbox name="assignedToMe">
            Назначенные на меня
        </FormikAntd.Checkbox>
    );
});
