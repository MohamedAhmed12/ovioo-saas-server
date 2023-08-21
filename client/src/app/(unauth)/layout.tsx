import BottomWrapper from "@/components/BottomWrapper";
import "@/styles/app/unauth/home.scss"
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "#1 Design Platform To Cover All Your Business Needs - Ovioo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between home-main">
            {children}
            <BottomWrapper  />
        </main>
    );
}