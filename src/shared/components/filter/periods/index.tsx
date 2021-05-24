import React from "react";
import * as FormikAntd from "formik-antd";

export const FilterPeriods = React.memo(() => {
    return (
        <FormikAntd.DatePicker.RangePicker
            name="periods"
            format="YYYY-MM-DD HH:mm:ss"
            allowClear={false}
            showTime={{
                hideDisabledOptions: true,
            }}
        />
    );
});
