"use client"

import Calculator from "./components/calculator";
import TopTabs from "@/app/components/top-tabs";

export default function CalculatorPage() {

    return (
        <TopTabs content={{
            Graphing: <Calculator type="graphing" />,
            Scientific: <Calculator type="scientific" />,
            Basic: <Calculator type="four-function" />
        }} />
    );
}