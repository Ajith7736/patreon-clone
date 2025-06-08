
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sessionwrapper from "@/components/Sessionwrapper";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patreon",
  description: "This is a Patreon clone with Next.js and Tailwind css",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sessionwrapper>
          <Navbar />
          <div><Toaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{
              top: 60,
              right: 20
            }}
          /></div>
          {children}
        </Sessionwrapper>
      </body>
    </html>
  );
}
