import styled, { css } from "styled-components";

const Wrapper = styled.div<{ mode?: "white" }>`
    ${props =>
        props.mode === "white"
            ? css`
                  background: #fff;
              `
            : css`
                  background: #e5e6e7;
              `};
    position: relative;
    .ant-spin-nested-loading,
    .ant-spin-container {
        position: static;
    }
    .ant-form {
        width: calc(100% - 210px);
        position: relative;
        z-index: 5;
        padding: 12px;
        min-height: 72px;
    }
    .ant-table-pagination.ant-pagination {
        width: 210px;
        margin: 0;
        text-align: end;
        margin-top: 24px;
        padding-right: 20px;
        position: absolute;
        top: 0;
        right: 0;
    }
    .form-item-switch {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .ant-form-item-label {
            > label {
                cursor: pointer;
            }
            margin-left: 14px;
        }
    }
    .ant-form-inline .ant-form-item {
        margin: 8px;
    }
    .ant-select.ant-select,
    .ant-input {
        width: 140px;
    }
    .ant-table {
        .ant-picker {
            padding: 0;
        }
        td.ant-table-cell.ant-table-cell {
            padding: 2px 4px 4px 4px;
        }
        tr.ant-table-expanded-row > td.ant-table-cell {
            padding: 8px 8px;
        }
    }
`;

const Details = styled.div`
    cursor: pointer;
`;

export const SC = { Wrapper, Details };
