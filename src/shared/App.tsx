// import React, { Suspense } from 'react';
import * as React from "react";
import { Helmet } from "react-helmet-async";
import favicon from "../shared/assets/logo.png";
// import Home from "./view/Home";
// import Page1 from "./view/Page-1";
// import Page2 from "./view/Page-2";
import { RoutesList } from "./routes";

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    return (
        <>
            <Helmet
                link={[
                    {
                        rel: "icon",
                        type: "image/png",
                        href: favicon,
                    },
                ]}
                title={"SKAPA.PROMOCODE"}
            />
            <RoutesList />
        </>
    );
};

// eslint-disable-next-line import/no-default-export
export default App;
