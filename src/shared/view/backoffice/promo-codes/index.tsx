import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useMemo } from "react";

export const PromoCodes = React.memo(() => {
    const columns: ColumnsType = useMemo(
        () => [
            { dataIndex: "id", title: "ID" },
            { dataIndex: "name", title: "Имя" },
            { dataIndex: "sale", title: "Скидка" },
            { dataIndex: "createdAt", title: "Дата создания" },
            { dataIndex: "qr", title: "QR" },
            { dataIndex: "adminId", title: "Создатель" },
            { dataIndex: "edit", title: "" },
        ],
        [],
    );

    return (
        <>
            <Table columns={columns} />
        </>
    );
});
