import styled from "styled-components";

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

const Header = styled.div`
    display: flex;
    width: 100%;
    padding: 12px 0px 12px;
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

export const SC = {
    Header,
    UserInfo,
};
