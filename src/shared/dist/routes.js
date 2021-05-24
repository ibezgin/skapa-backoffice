"use strict";
exports.__esModule = true;
exports.getRoute = void 0;
var routes = {
    home: "/",
    page1: "/page-1",
    page2: "/page-2",
};
exports.getRoute = function (path, params, routesConfig) {
    if (routesConfig === void 0) {
        routesConfig = routes;
    }
    return path.split(".").reduce(function (routeBranch, pathItem) {
        if (routeBranch && routeBranch[pathItem]) {
            var route = routeBranch[pathItem];
            if (typeof route === "string") {
                if (!params || typeof params === "undefined") {
                    return route;
                }
                return Object.entries(params).reduce(function (replaced, _a) {
                    const key = _a[0];
                    const value = _a[1];
                    return replaced.replace(":" + key, String(value));
                }, route);
            }
            return routeBranch[pathItem];
        }
    }, routesConfig);
};
// eslint-disable-next-line import/no-default-export
exports.default = routes;
