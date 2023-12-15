import "bootstrap/dist/css/bootstrap.min.css";

import "./globals.css";
import { Inter } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Generate Password",
  description: "Generate a Strong Password",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
