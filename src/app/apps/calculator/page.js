"use client"

import Calculator from "./components/calculator";
import TopTabs from "@/app/components/top-tabs";

export default function CalculatorPage() {

    return (
        <TopTabs uuid="calculator" content={{
            "Graphing 1": <Calculator type="graphing" uuid="graphing1" />,
            "Graphing 2": <Calculator type="graphing" uuid="graphing2" />,
            Scientific: <Calculator type="scientific" uuid="scientific" />,
            Basic: <Calculator type="four-function" uuid="basic" />
        }} />
    );
}