"use client";
import Header from "../../components/Header";
export default function Layout({ children }) {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <Header />
        <main className="w-full h-[calc(100vh-80px)]">{children}</main>
      </div>
    </div>
  );
}
