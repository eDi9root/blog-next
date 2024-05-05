import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import LeftBar from "@/components/Left/LeftBar";
import RightBar from "@/components/Right/RightBar";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Sleft from "@/components/Sleft/Sleft";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://edi9root-blog.vercel.app/"),

  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['apple-touch-icon.png']
  },

	title: {
		template: "%s | edi9root blog",
		default: "edi9root blog",
	},
	authors: {
		name: "JunseokOh",
	},

	description:
		"Own Space for writing down thoughts, and sharing information",
	openGraph: {
		title: "Personal Blog",
		description:
			"Own Space for writing down thoughts, and sharing information",
		url: "https://edi9root-blog.vercel.app/",
		siteName: "edi9root blog",
		images: "",
		type: "website",
	},
	keywords: ["Edi9root", "JunseokOh", "Personal Blog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <div className="max-w-[100rem] mx-auto">
                  <div className="hidden w-full mt-4 mb-[-20px] max-md:flex justify-center">
                    <Sleft />
                  </div>
                <div className="gap-10 flex md:mt-5 flex-col md:flex-row">

                  {children}
                  <RightBar />
                </div>
              </div>              
            </main>
            <Toaster />
            
          </ThemeProvider>
          <SessionProvider />
      </body>
    </html>
  );
}
