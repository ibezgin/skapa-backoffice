import styled from "styled-components";

export const Wrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin-top: -6px;
    .ant-switch {
        height: 15px;
        min-width: 37px;
        background: rgba(97, 114, 121, 0.5);
        &:after {
            width: 23px;
            height: 23px;
            top: -5px;
            left: -1px;
            background: #f8f8fa;
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.21);
        }
        &.ant-switch-checked {
            background: rgba(249, 100, 6, 0.5);
            &:after {
                background: #f96406;
                left: 100%;
                transform: translateX(-90%);
            }
        }
    }
    .ant-typography {
        vertical-align: middle;
        margin-left: 12px;
    }
`;

export const SC = { Wrapper };
