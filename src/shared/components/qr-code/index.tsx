import QRCode from "qrcode.react";
import React from "react";
import skapaLogo from "../../assets/logo.jpg";
interface IProps {
    value: string;
    id?: string;
    size?: number;
}
export const QrCode = React.memo((props: IProps) => {
    return (
        <QRCode
            value={props.value || ""}
            level="H"
            imageSettings={{ src: skapaLogo, height: 50, width: 50 }}
            renderAs="canvas"
            id={props.id}
            size={props.size}
        />
    );
});
