import { Suspense, useState } from "react";
import { Center, CircularLoader } from "@dhis2/ui";
import Navigation from "./components/Navigation.jsx";
import Inspect from "./pages/Inspect.jsx";
import Planner from "./pages/Planner.jsx";
import Analytics from "./pages/Analytics.jsx";

import "./styles/App.css";
import "./styles/planner.css";
import "./styles/analytics.css";

const TABS = {
  INSPECT: "inspect",
  PLANNER: "planner",
  ANALYTICS: "analytics",
};

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.INSPECT);

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onChangeTab={setActiveTab} TABS={TABS} />

      <Suspense fallback={<Center><CircularLoader /></Center>}>
        {activeTab === TABS.INSPECT && <Inspect />}
        {activeTab === TABS.PLANNER && <Planner />}
        {activeTab === TABS.ANALYTICS && <Analytics />}
      </Suspense>
    </div>
  );
}
