
import { useEffect, useRef } from "react";
import { getCustomState, setCustomState } from "@/app/globals";

const colors = {
    "BLUE": "#2d70b3",
    "RED": "#c74440",
    "GREEN": "#388c46",
    "SANJAY_ORANGE": "#f09819",
    "SANJAY_PURPLE": "#a134eb",
    "SANJAY_TEAL": "#1bc49d",
    "SANJAY_PINK": "#e861d8",
    "SANJAY_BROWN": "#9c4600",
    "SANJAY_BLACK": "#111111"
};

export default function Calculator({ type="graphing", uuid="" }) {
    const calculatorElem = useRef(null);

    useEffect(() => {
        const calculator = type == "graphing" ? Desmos.GraphingCalculator(calculatorElem.current, { colors })
            : (type == "scientific" ? Desmos.ScientificCalculator(calculatorElem.current) : Desmos.FourFunctionCalculator(calculatorElem.current));
        const state = getCustomState("sos_calculator_" + uuid);
        if (state) calculator.setState(state, { remapColors: true });

        // Locally save state of Desmos calculator
        const onUnload = () => {
            if (!calculator.getState()) return;
            setCustomState("sos_calculator_" + uuid, calculator.getState());
        };
        window.addEventListener("beforeunload", onUnload);

        // Set calculator type on body element
        calculatorElem.current.parentElement.classList.add(`calculator-${uuid}`);

        return () => {
            onUnload();

            calculator?.destroy();
            (calculatorElem.current ?? {}).innerHTML = "";
            window.removeEventListener("beforeunload", onUnload);
            calculatorElem.current?.parentElement.classList.remove(`calculator-${uuid}`);
        };
    });

    return (
        <div ref={calculatorElem} className="w-full h-full"></div>
    );
}