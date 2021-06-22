import { createGlobalStyle, css } from "styled-components";
import styledNormalize from "styled-normalize";

const globalStylesCss = css`
    ${styledNormalize};
    html,
    body,
    #app {
        height: 100%;
    }
    #app > div {
        height: 100%;
    }

    body {
        .select-without-tag-pointer-events .ant-select-selector {
            cursor: pointer;
            span {
                pointer-events: none;
            }
        }
        .ant-input,
        .ant-btn {
            border-radius: 4px;
        }
        .ant-btn-lg {
            line-height: 1;
            height: auto;
            font-size: 18px;
            padding-top: 8px;
            padding-bottom: 12px;
            border-radius: 10px;
        }
        .ant-select.ant-select-lg {
            .ant-select-selector {
                border-radius: 10px;
            }
        }
        .ant-modal-header {
            border-bottom: none;
        }
        .ant-modal-footer {
            border-top: none;
        }
        .ant-table-summary {
            background: #0c0f20;
            box-shadow: 0px 1px 0px #f1f1f1;
            color: #fff;
        }
        .tree-transfer {
            .ant-transfer-list {
                background-color: #fff;
                border: none;
            }
            .ant-transfer-list-body-customize-wrapper {
                overflow: auto;
                height: 100%;
            }
        }
        .tox-notifications-container {
            display: none;
        }
    }

    a:not([href]) {
        cursor: pointer;
    }

    .green {
        color: #4bca81;
    }
    .red {
        color: #f24579;
    }

    .plus,
    .minus {
        font-size: getRemByPixel(14);
        font-weight: 900;
    }
    .plus {
        color: #4bca81;
        &:after {
            content: "+";
        }
    }
    .minus {
        color: #f24579;
        &:after {
            content: "-";
        }
    }

    .select-has-settings.select-has-settings {
        color: #fff;
        background-color: #f96406;
        &:hover {
            color: rgba(0, 0, 0, 0.65);
        }
        &.ant-select-item-option-active {
            color: rgba(0, 0, 0, 0.5);
        }
    }

    .ball {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background: #000;
        display: inline-block;
        &.white {
            background: white;
        }
        &.green {
            background: green;
        }
        &.red {
            background: red;
        }
        &.blue {
            background: blue;
        }
        &.yellow {
            background: yellow;
        }
        &.black {
            background: black;
        }
        &.pink {
            background: pink;
        }
        &.orange {
            background: orange;
        }
        &.baige {
            background: beige;
        }
    }

    #app {
        .site-layout {
            overflow: hidden;
        }
        .ant-layout {
            background: #f8f8fa;
        }
        .ant-layout-header {
            background-color: transparent;
            height: auto;
            line-height: initial;
        }
        .ant-table-thead {
            background: rgb(229 229 229 / 0.4);
        }
        .ant-table-thead > tr > th {
            background: transparent;
            color: #617279;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            line-height: 14px;
            vertical-align: top;
        }
        .ant-spin-blur {
            clear: inherit;
            overflow: inherit;
        }
        .ant-table-tbody > tr > td {
            color: #0c0f20;
        }
        tr.ant-table-expanded-row > td {
            background: transparent;
        }
        .ant-table-row {
            &:nth-child(even) {
                background: rgb(229 229 229 / 0.2);
            }
        }
        .ant-table-tbody > tr.ant-table-row:hover > td {
            background: rgba(249, 100, 6, 0.05);
        }
        .upload-preview {
            display: flex;
            align-items: center;
            .anticon {
                margin: 0 8px;
                cursor: pointer;
            }
            a {
                display: flex;
                align-items: center;
                margin: 14px 0;
                img {
                    width: 60px;
                    height: 48px;
                    object-fit: cover;
                    margin-right: 12px;
                }
                span {
                    width: 320px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .ant-table.ant-table-small
            .ant-table-tbody
            .ant-table-wrapper:only-child
            .ant-table {
            margin-left: 42px;
            margin-right: 36px;
        }
        .table-strong-row {
            color: #0c0f20;
            font-weight: 500;
        }
        .table-row-ellipsis {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .vertical-table-group-name {
            height: 0;
            padding: 0;
            position: relative;
            .vertical-table-group-name-text {
                position: absolute;
                top: 96px;
                left: 50%;
                z-index: 5;
                background: #e9e9ed;
                border-radius: 3px;
                color: #617279;
                letter-spacing: 0.36em;
                text-transform: uppercase;
                font-size: 8px;
                white-space: nowrap;
                width: 78px;
                overflow: hidden;
                text-overflow: ellipsis;
                transform: translate(-48px, 0);
                padding: 0 5px;
            }
            .vertical-table-group-name-border {
                position: absolute;
                top: 0;
                left: -8px;
                width: 100%;
                height: 105px;
                border-left: 1px solid #f0f0f0;
                border-right: 1px solid #f0f0f0;
            }
        }
        th.vertical-table-header {
            vertical-align: bottom;
            div {
                width: 30px;
                writing-mode: vertical-rl;
                transform: rotate(180deg);
                span {
                    white-space: nowrap;
                    overflow: hidden;
                    height: 92px;
                    display: inline-block;
                    text-overflow: ellipsis;
                    padding-top: 10px;
                }
            }
        }
        .vertical-table-header-column {
            padding: 6px 2px;
        }
        .ant-progress {
            position: relative;
            padding-top: 10px;
        }
        .ant-progress-outer {
            padding: 0;
        }
        .ant-progress-text {
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            margin: 0;
        }
        .ant-pagination.mini {
            display: flex;
            justify-content: flex-end;
            li {
                &:nth-child(1) {
                    order: 2;
                }
                &:nth-child(2) {
                    order: 1;
                }
                &:nth-child(3) {
                    order: 3;
                }
            }
            input {
                background: transparent;
                border: 0;
                text-align: end;
                font-size: 15px;
                vertical-align: bottom;
                margin-right: 0px;
            }
        }
        .ant-tabs-tab-prev.ant-tabs-tab-arrow-show {
            background: rgb(248, 248, 250);
            background: linear-gradient(
                90deg,
                rgba(248, 248, 250, 1) 0%,
                rgba(229, 229, 229, 1) 100%
            );
        }
        .ant-tabs-tab-next.ant-tabs-tab-arrow-show {
            right: 0px;
            background: rgb(229, 229, 229);
            background: linear-gradient(
                90deg,
                rgba(229, 229, 229, 1) 0%,
                rgba(248, 248, 250, 1) 100%
            );
        }
        .ant-picker-range-separator {
            display: none;
        }
        .ant-table-expanded-row {
            table {
                background: rgb(229 229 229 / 0.2);
            }
        }
    }
    .ant-tooltip.ant-tooltip {
        z-index: 10;
    }
    .icon-path {
        fill: #617279;
    }
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .logo {
        height: 32px;
        margin: 0px;
        align-content: center;
        position: relative;
        text-align: center;
        margin: 10px;
        border-bottom: 5px solid black;
        color: #fff;
    }

    .logo svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 25px;
        height: 25px;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }

    .ant-layout {
        height: 100vh;
    }

    .tox-notifications-container {
        visibility: hidden;
    }
`;
export const GlobalStyles = createGlobalStyle`${globalStylesCss};` as any;
