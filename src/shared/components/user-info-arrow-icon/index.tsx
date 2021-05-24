import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
// import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
// import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
// type IconTypes = AntdIconProps & IconComponentProps;
// export interface IIconProps extends IconTypes {
//     selected?: boolean;
//     isHeader?: boolean;
// }

export const UserInfoArrowIcon = React.memo(() => (
    <Icon
        component={() => (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 14L8 10H16L12 14Z" fill="#0C0F20" />
            </svg>
        )}
    />
));
