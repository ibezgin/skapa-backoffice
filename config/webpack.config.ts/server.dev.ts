import webpack from "webpack";
import WriteFileWebpackPlugin from "write-file-webpack-plugin";
import baseConfig from "./server.base";

const config = {
    ...baseConfig,
    plugins: [
        new WriteFileWebpackPlugin(),
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
    mode: "development",
    performance: {
        hints: false,
    },
};

// eslint-disable-next-line import/no-default-export
export default config;
