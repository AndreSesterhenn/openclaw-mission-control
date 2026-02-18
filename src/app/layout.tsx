import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Control — Clawdia Dashboard",
  description: "Command center for OpenClaw AI agent system",
};

const navItems = [
  "HOME", "OPS", "AGENTS", "CHAT", "CONTENT", "COMMS", "KNOWLEDGE", "CODE", "ARTIFACTS"
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-gray-950 text-gray-100">
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">Mission Control</h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-8 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className={`py-2 px-1 border-b-2 transition-colors ${
                        item === "HOME"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-400 hover:text-white"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>

        <footer className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 text-xs">
          Mission Control Dashboard — Built for Clawdia © {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
