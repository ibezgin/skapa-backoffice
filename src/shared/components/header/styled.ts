import styled from "styled-components";
import { Radio } from "antd";

const UserInfo = styled.div`
    cursor: pointer;
    .ant-typography {
        padding-left: 14px;
    }
    .anticon {
        vertical-align: middle;
        cursor: pointer;
    }
`;

const UserInfoTitle = styled.div`
    font-size: 11px;
    color: #617279;
`;
const UserInfoValue = styled.div`
    font-size: 14px;
    color: #0c0f20;
    display: flex;
    justify-content: space-between;
`;
const UserInfoLogout = styled.div`
    color: #f24579;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
    padding: 24px 44px 32px;
    align-items: center;
    & > :nth-child(1) {
        width: 295px;
        margin-right: 40px;
        flex: none;
        .anticon {
            vertical-align: middle;
        }
        .main-icon-bg {
            fill: #e5e6e7;
        }
        .main-icon-line {
            fill: #0c0f20;
        }
        .ant-typography {
            display: inline-block;
            vertical-align: middle;
            margin-top: 0;
            margin-bottom: 0;
            margin-left: 14px;
            width: 238px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ant-typography-secondary {
            display: block;
            font-size: 11px;
            margin-left: 0;
        }
    }
    & > :nth-child(2) {
        flex: 1;
    }
    & > :nth-child(3) {
        flex: none;
        margin-left: 40px;
    }
`;

const Search = styled.div`
    width: 100%;
    max-width: 420px;
    .ant-input-search {
        border-radius: 10px;
        padding: 7px 11px 8px;
    }
    .ant-input-search,
    .ant-input {
        background: #e9e9ed;
    }
    .ant-input-affix-wrapper {
        border: none;
    }
    .ant-input-affix-wrapper-focused {
        &.ant-input-search {
            background: #fff;
        }
        .ant-input {
            background: #fff;
        }
    }
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused,
    .ant-input-affix-wrapper:hover {
        border: none;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
    }
`;

const CheckboxListRadio = styled(Radio)`
    &.ant-radio-wrapper {
        display: block;
        margin: 10px 0px;
        font-size: 16px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

export const SC = {
    Header,
    Search,
    UserInfo,
    UserInfoTitle,
    UserInfoValue,
    UserInfoLogout,
    CheckboxListRadio,
};
