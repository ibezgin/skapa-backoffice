import { Tag } from "antd";
import React, { useMemo } from "react";
import { ProposalStatus } from "../../service/enums/proposal-status";

interface IProps {
    status: ProposalStatus;
}
export const StatusColorTag = React.memo((props: IProps) => {
    const { status } = props;

    const proposalStatuses = [
        {
            value: ProposalStatus.ACCEPTED,
            label: "Принята",
        },
        {
            value: ProposalStatus.TECHNICAL_INSPECTION,
            label: "Технический осмотр",
        },
        {
            value: ProposalStatus.TECHNICAL_WORKS,
            label: "Технические работы",
        },
        {
            value: ProposalStatus.COMPLETED,
            label: "Завершена",
        },
        {
            value: ProposalStatus.PAY_AND_COMPLITED,
            label: "Оплачена и завершена",
        },
    ];
    const color = useMemo(() => {
        switch (status) {
            case ProposalStatus.ACCEPTED:
                return "volcano";
            case ProposalStatus.TECHNICAL_INSPECTION:
                return "purple";
            case ProposalStatus.TECHNICAL_WORKS:
                return "blue";
            case ProposalStatus.COMPLETED:
                return "magenta";
            case ProposalStatus.PAY_AND_COMPLITED:
                return "green";
        }
    }, [status]);

    return (
        <Tag color={color}>
            {proposalStatuses.find(elem => elem.value === status)?.label}
        </Tag>
    );
});
