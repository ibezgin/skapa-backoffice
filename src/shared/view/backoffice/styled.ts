import styled from "styled-components";

const MenuIcon = styled.div`
    cursor: pointer;
    margin: 0 auto;
`;

export const MenuIcons = styled.div`
    a {
        color: #0c0f20;
        display: block;
    }
    .main-icon-bg {
        fill: #fff;
    }
    .main-icon-line {
        fill: rgba(12, 15, 35, 0.5);
    }
    .active {
        color: #f96406;
        .main-icon-bg {
            fill: #f96406;
        }
        .main-icon-line {
            fill: #fff;
        }
    }
`;

const Content = styled.div`
    padding: 32px 44px 32px 44px;
`;

export const SC = { MenuIcon, MenuIcons, Content };
