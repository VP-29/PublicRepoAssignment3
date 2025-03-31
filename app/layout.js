// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Internet Movies Rental Company",
  description: "Rent the best movies online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        <Navbar />
        <main style={{
          flex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem'
        }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}