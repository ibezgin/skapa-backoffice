import styled, { css } from "styled-components";

export const CardInner = styled.div`
    border: 1px solid #dadce0;
    border-radius: 3px;
    padding: 18px 24px;
`;

export const CardRow = styled.div<{ sub?: boolean }>`
    border-bottom: 1px solid #e5e5e5;
    padding: 12px 0;
    display: flex;
    width: 100%;
    align-items: center;
    ${(props) =>
        props.sub &&
        css`
            margin-left: 55px;
            width: calc(100% - 55px);
            ${CardCell} {
                &:last-child {
                    margin-left: 0px;
                }
            }
        `}
    &:last-child {
        border-bottom: none;
        border-top: 1px solid #e5e5e5;
        margin-top: -1px;
        padding-bottom: 0;
    }
    &:first-child {
        padding-top: 0;
        border-top: none;
    }
`;

export const CardWrapper = styled.div<{ type?: string }>`
    background: #fff;
    padding: 26px;
    margin-bottom: 20px;
    ${(props) =>
        props.type === "compact" &&
        css`
            padding: 0;
            ${CardInner} {
                padding: 10px 16px;
            }
            ${CardRow} {
                padding: 8px 0;
                &:first-child {
                    padding-top: 0;
                }
                &:last-child {
                    padding-bottom: 0;
                }
            }
        `}
`;

export const CardCell = styled.div<{ bigWidth?: boolean }>`
    color: #2d3039;
    font-size: 14px;
    &:last-child {
        margin-left: 55px;
        flex: 2;
    }
    &:first-child {
        margin-left: 0;
        padding-right: 12px;
        flex: none;
        font-size: 14px;
        ${(props) => (props.bigWidth ? "width: 380px;" : "width: 220px;")}
    }
    .ant-input,
    .ant-select,
    .ant-btn {
        width: 190px;
    }
    .ant-upload {
        margin-right: 12px;
        .ant-btn {
            font-weight: 500;
            text-transform: uppercase;
            color: #f96406;
        }
    }
    .ant-upload-list {
        display: none;
    }
    .card-button-large {
        width: 250px;
    }
    .input-small {
        width: 90px;
    }
`;

export const CardDesc = styled.div`
    font-size: 12px;
    color: #617279;
`;

export const CardTitle = styled.div<{ sub?: boolean }>`
    font-weight: 500;
    ${(props) =>
        props.sub
            ? css`
                  font-size: 14px;
              `
            : "font-size: 16px;"}
`;

export const CardSave = styled.div`
    margin-top: 20px;
`;
