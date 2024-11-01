import "./desmos-dark-theme.css"

export const metadata = {
    title: "Calculator | SanjayOS",
    description: "Desmos-powered calculator app of SanjayOS.",
  };

export default function CalculatorLayout({ children }) {
    return (
        <>
            {children}
            <script src="/js/desmos.js"></script>
        </>
    );
}