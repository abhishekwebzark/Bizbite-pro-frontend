import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "BizBiteNow",
  description: "Digital platform for local food sellers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}