import "./globals.css";

export const metadata = {
  title: "SanjayOS",
  description: "A mock OS with various websites serving as apps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full">
      <body
        className={`antialiased w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
