import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import StoreProvider from "./store_provider";
import "./globals.css";
import { ThemeSelector } from "@/components";

const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Movimentações Financeiras",
  description: "Gestão e controle de movimentações financeiras",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt">
      <body className={`${montserrat.className} ${roboto.className} antialiased`}>
        <StoreProvider>
          <ThemeSelector />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
