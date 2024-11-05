import "./prism.css";

export const metadata = {
    title: "Messages | SanjayOS",
    description: "AI-powered messages app of SanjayOS.",
  };

export default function MessagesLayout({ children }) {
    return (
        <>
            {children}
            <script src="/js/prism.js"></script>
        </>
    );
}