import type { Metadata } from "next";
import "./globals.css";
import "./prism.css";
import "./scrollbar.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "MyCodeSnips",
  description: "Store your favourite code snippets",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background max-md:p-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main className="max-w-5xl mx-auto h-screen flex flex-col">
              <Navbar />

              <div className="flex-grow mt-2 overflow-auto">{children}</div>
            </main>
            {/* <Footer /> */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
