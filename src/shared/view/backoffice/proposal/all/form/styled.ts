import styled from "styled-components";

const Wrapper = styled.div<{ middle?: boolean }>`
    .ant-collapse-header {
        background: #e5e6e7;
        border-radius: 4px;
        margin-bottom: 20px;
    }
    .ant-collapse-borderless > .ant-collapse-item {
        border-bottom: none;
    }
    .ant-collapse-content-box.ant-collapse-content-box {
        padding: 0;
        margin-bottom: 20px;
    }
    .ant-typography.ant-typography-secondary {
        font-size: 12px;
    }
`;

const MonitorsTable = styled.div<{ middle?: boolean }>`
    margin-top: 20px;
`;

export const SC = {
    Wrapper,
    MonitorsTable,
};
