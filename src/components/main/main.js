import { Suspense, lazy } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loader from "../loader/loader";
import "./main.scss";

const RandomAdviceLazyComponent = lazy(() =>
    import("../randomAdviceLazyComponent/randomAdviceLazyComponent")
);
const SearchAdviceFormLazyComponent = lazy(() =>
    import("../searchAdviceFormLazyComponent/searchAdviceFormLazyComponent")
);

const Main = () => {
    return (
        <main className="main">
            <Tabs>
                <TabList>
                    <Tab>Random advice</Tab>
                    <Tab>Search Advice</Tab>
                </TabList>

                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <RandomAdviceLazyComponent />
                    </Suspense>
                </TabPanel>
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <SearchAdviceFormLazyComponent />
                    </Suspense>
                </TabPanel>
            </Tabs>
        </main>
    );
};

export default Main;
